# Architecture — Automated MES Inventory Data Extraction

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CONFIGURATION                                 │
│                                                                       │
│  config.json (deep-merge with defaults)                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ {                                                              │   │
│  │   "mes": { "host": "...", "user_bc": "...", ... },           │   │
│  │   "locations": ["LOC001", "LOC002", ...],                    │   │
│  │   "export": { "type": "batches", "sort": "FIFO", ... },     │   │
│  │   "performance": { "max_workers": 10, ... }                  │   │
│  │ }                                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    INITIALIZATION                                     │
│                                                                       │
│  1. Load config.json + deep-merge with defaults                      │
│  2. Initialize .NET runtime (pythonnet clr)                          │
│  3. Load MES API DLL (ZollnerGroup.MES.WS.Toolbox.dll)              │
│  4. Create MesApiShared singleton (thread-safe)                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION                                     │
│                                                                       │
│  Single Login Optimization (v5.0+):                                  │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ MesApiShared.login(host, user_bc, equipment_bc, ...)          │   │
│  │                                                                │   │
│  │ • Authenticates ONCE                                           │   │
│  │ • Returns shared session object                               │   │
│  │ • Session reused across ALL location queries                  │   │
│  │ • Thread-safe for parallel access                             │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  Previous approach (v1.0-v4.0): Login → query → logout per location │
│  Current approach (v5.0+):    Login once → parallel queries → logout │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                PARALLEL DATA EXTRACTION                               │
│                                                                       │
│  SingleSessionProcessor with ThreadPoolExecutor:                     │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ ThreadPoolExecutor(max_workers=10)                            │    │
│  │                                                               │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       ┌──────────┐│    │
│  │  │Location 1│  │Location 2│  │Location 3│  ...  │Location N││    │
│  │  │          │  │          │  │          │       │          ││    │
│  │  │get_      │  │get_      │  │get_      │       │get_      ││    │
│  │  │setuped_  │  │setuped_  │  │setuped_  │       │setuped_  ││    │
│  │  │batches() │  │batches() │  │batches() │       │batches() ││    │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘       └────┬─────┘│    │
│  └───────┼─────────────┼─────────────┼─────────────────┼──────┘    │
│          │             │             │                 │            │
│          └─────────────┴─────────────┴─────────────────┘            │
│                              │                                       │
│                    3 retries per location                            │
│                    Configurable delay between retries                │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DATA PROCESSING                                    │
│                                                                       │
│  MesDataProcessor:                                                    │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ For each location response:                                    │   │
│  │                                                                │   │
│  │ 1. Parse MES API response (List<Serial>)                       │   │
│  │ 2. Extract 19 required columns:                                │   │
│  │    • SAP Number (formatted XXXXXXX-XX)                        │   │
│  │    • Material Description                                      │   │
│  │    • Batch ID                                                   │   │
│  │    • Storage Box                                                │   │
│  │    • Storage Index                                              │   │
│  │    • Quantity                                                   │   │
│  │    • Unit of Measure                                            │   │
│  │    • Expiration Date                                            │   │
│  │    • Arrival Date                                               │   │
│  │    • Status                                                     │   │
│  │    • Location                                                   │   │
│  │    • [plus 8 more metadata columns]                            │   │
│  │ 3. Normalize to dict format                                    │   │
│  │ 4. Filter by status (default: "available" only)                │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SORTING                                            │
│                                                                       │
│  ┌──────────────────────────┐  ┌──────────────────────────┐        │
│  │ FIFO                      │  │ FEFO                      │        │
│  │                           │  │                           │        │
│  │ Sort by:                  │  │ Sort by:                  │        │
│  │ 1. Storage Box            │  │ 1. Storage Box            │        │
│  │ 2. Storage Index          │  │ 2. Expiration Date        │        │
│  │                           │  │                           │        │
│  │ Use case:                 │  │ Use case:                 │        │
│  │ Standard inventory        │  │ Time-sensitive materials  │        │
│  │ rotation                  │  │ (moisture-sensitive,      │        │
│  │                           │  │ limited shelf life)       │        │
│  └──────────────────────────┘  └──────────────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EXCEL EXPORT                                       │
│                                                                       │
│  Dual-Engine Architecture:                                           │
│                                                                       │
│  ┌─────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ Primary: xlsxwriter         │  │ Fallback: pandas             │  │
│  │                             │  │                              │  │
│  │ • Formatting control        │  │ • Data validation            │  │
│  │ • Column widths             │  │ • Type inference             │  │
│  │ • Header styling            │  │ • Large dataset handling     │  │
│  │ • Auto-filter               │  │ • Memory efficient           │  │
│  └─────────────────────────────┘  └──────────────────────────────┘  │
│                                                                       │
│  CSV Fallback:                                                        │
│  • Triggered on file permission errors                               │
│  • Same 19-column schema                                             │
│  • Timestamped filename for traceability                             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    OUTPUT & LOGOUT                                    │
│                                                                       │
│  1. Write Excel file: inventory_batches_FIFO_[timestamp].xlsx        │
│  2. Logout from MES: MesApiShared.logout()                          │
│  3. Print summary: records processed, timing, errors                 │
│  4. Exit with status code (0 = success, 1 = errors)                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

### 1. Single-Session Optimization (v5.0)

| Aspect | Before (v4.0) | After (v5.0+) |
|--------|--------------|---------------|
| Authentication | Login per location | Login once |
| Connection overhead | N × (login + logout) | 1 × (login + logout) |
| Session management | Independent | Shared, thread-safe |
| Performance | Sequential bottleneck | Parallel processing |

### 2. Python ↔ .NET Interop

Python's `pythonnet` (clr) bridges to the .NET MES API DLL. This was chosen because:
- The MES API is a proprietary .NET library with no Python equivalent
- `pythonnet` provides seamless access to .NET objects from Python
- No need to reimplement the MES communication protocol

### 3. Dual Export Engine

Two independent Excel engines serve different purposes:
- **xlsxwriter**: Primary engine with precise formatting control and smaller file sizes
- **pandas**: Fallback engine with automatic type inference and better handling of edge cases

CSV fallback ensures the tool never fails completely due to Excel file permission issues.

### 4. Deep-Merge Configuration

Configuration uses deep-merge logic: user-provided `config.json` values override defaults while preserving unspecified defaults. This means users only configure what they need to change.

---

## Performance Architecture

```
SingleSessionProcessor
│
├── max_workers: 10 (configurable)
├── retries: 3 per location
├── retry_delay: configurable seconds
│
└── Performance metrics (per run):
    ├── Total records processed
    ├── Processing time (seconds)
    ├── Records per second
    ├── Per-location timing breakdown
    └── Error count per location
```
