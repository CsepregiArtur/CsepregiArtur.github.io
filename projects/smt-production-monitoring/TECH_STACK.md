# Technology Stack — SMT Line Monitoring & Verification

## Core Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend Framework** | Flask | REST API server |
| **Real-Time** | Flask-SocketIO | WebSocket communication |
| **Frontend** | React 18 + TypeScript | Modern UI with type safety |
| **Build Tool** | Vite | Fast frontend development |
| **CSS Framework** | TailwindCSS | Utility-first styling |
| **Icons** | Lucide Icons | Clean, consistent icon set |
| **Bridge Service** | C# .NET 9 (x86) | Legacy 32-bit DLL integration |
| **Packaging** | PyInstaller | Single-file Windows executable |
| **Audio** | Web Audio API | Synthesized alarm sounds |

---

## Frontend Architecture

### Component Tree

```
App.tsx
├── Header
│   ├── Line selector (5 lines)
│   └── Connection status
├── EkraCard
│   ├── Printer status (Andon light)
│   ├── Program name display
│   ├── Stencil ID display
│   └── Idle time counter
├── SiplaceHub
│   ├── SX1 Status Card
│   │   ├── Barcode display
│   │   └── Changeover tracker
│   ├── SX2 Status Card
│   │   ├── Barcode display
│   │   └── Changeover tracker
│   └── SX3 Status Card
│       ├── Barcode display
│       └── Changeover tracker
├── OvenAoiHub
│   ├── Oven Status Card
│   │   ├── Thermal profile display
│   │   └── Temperature status
│   └── AOI Status Card
│       ├── Inspection program display
│       └── Evaluation lights
├── SupervisorDashboard
│   ├── Multi-line overview grid
│   ├── Out-of-Order management
│   └── One-pager mode toggle
├── NotificationCenter
│   ├── Alert rule configuration
│   ├── Channel management
│   ├── Test dispatch button
│   └── Alert history ledger
├── EfficiencyDashboard
│   ├── Per-station efficiency charts
│   ├── Bottleneck analysis
│   └── Pareto defect aggregation
├── ExportReportSection
│   └── CSV export configuration
├── ControlSimulator
│   └── Scenario injection UI
├── LogTerminal
│   └── Live console log viewer
├── HookUnitTestSuite
│   └── 5-cohort verification tests
├── ChangeoverStatusPanel
│   └── Changeover progress tracker
├── WatcherStatus
│   ├── Folder health dots
│   └── Weekend mode badge
└── ProcessStatusIndicators
    └── Process flow indicators
```

---

## WebSocket Communication

```
Client (Browser)                          Server (Flask + SocketIO)
     │                                          │
     ├── connect ──────────────────────────────→│
     │                                          ├── Join line-specific room
     │←── connected ───────────────────────────┤
     │                                          │
     │   [Server pushes on state change]        │
     │←── line_state_update ───────────────────┤
     │←── watchdog_status ─────────────────────┤
     │←── weekend_mode_change ─────────────────┤
     │←── notification_event ──────────────────┤
     │←── log_entry ───────────────────────────┤
     │                                          │
     │   [Client sends on user action]          │
     ├── set_line ─────────────────────────────→│
     ├── force_scenario ───────────────────────→│
     ├── toggle_out_of_order ─────────────────→│
     └── update_andon_limit ───────────────────→│
```

---

## Validation Engine Architecture

The validation engine is the core business logic — it is implemented in both:

1. **Python** (`backend/validation_engine.py`): Server-side validation, the source of truth
2. **TypeScript** (`src/hooks/useSmtValidation.ts`): Client-side mirror for instant UI feedback

### Validation Rules per Station

| Station | Rule | Failure Condition |
|---------|------|-------------------|
| EKRA | Program match | Program name ≠ master datasheet value |
| EKRA | Stencil match | Stencil ID ≠ expected stencil |
| SIPLACE SX1 | Order barcode match | Barcode ≠ expected production order |
| SIPLACE SX2 | Order barcode match | Barcode ≠ expected production order |
| SIPLACE SX3 | Order barcode match | Barcode ≠ expected production order |
| RHEM | Profile match | Thermal profile ≠ expected profile |
| AOI | Program prefix match | Program prefix ≠ expected prefix |
| AOI | Last-char match | Last character ≠ expected variant |

### Andon Color Algorithm

```
function compute_andon_color(station_data, idle_minutes):
    if validation_failed(station_data):
        return RED

    if idle_minutes >= 30:
        return RED

    if idle_minutes >= 15:
        return AMBER

    return GREEN
```

---

## .NET Bridge Architecture

```
Python 64-bit Process              .NET 9 x86 Process (port 5001)
┌─────────────────────┐           ┌──────────────────────────────┐
│ file_parsers.py     │           │ DatenblattBridgeService.exe  │
│                     │  HTTP     │                              │
│ Datenblattbridge ───┼──────────→│ POST /api/process-order      │
│ (HTTP client)       │           │                              │
│                     │←──────────│ {                            │
│                     │  JSON     │   "program_name": "...",     │
│                     │           │   "stencil_id": "...",       │
│                     │           │   "thermal_profile": "...",  │
│                     │           │   "aoi_program": "..."       │
│                     │           │ }                            │
│                     │           │                              │
│                     │           │ ┌──────────────────────────┐ │
│                     │           │ │ Datenblattbridge.dll     │ │
│                     │           │ │ (Legacy 32-bit DLL)      │ │
│                     │           │ │ → DatenblattManager      │ │
│                     │           │ │ → SAP Datasheet Queries  │ │
│                     │           │ └──────────────────────────┘ │
└─────────────────────┘           └──────────────────────────────┘
```

**Why a Bridge Service?**
- The master datasheet system (DatenblattManager) exposes a 32-bit .NET DLL
- Python is 64-bit and cannot directly load 32-bit DLLs
- The bridge service is a small C# .NET 9 application compiled as x86
- It runs independently on port 5001, accepting HTTP requests from the Python backend
- This architecture avoids modifying the legacy system
