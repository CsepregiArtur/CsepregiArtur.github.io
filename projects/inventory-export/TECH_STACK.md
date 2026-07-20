# Technology Stack — Automated MES Inventory Data Extraction

## Core Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Language** | Python 3.12 | All business logic |
| **.NET Interop** | pythonnet (clr) | Bridge to .NET MES API DLL |
| **MES API** | Proprietary .NET DLL | Manufacturing Execution System communication |
| **Excel Export (Primary)** | xlsxwriter | Formatted Excel output |
| **Excel Export (Fallback)** | pandas | Robust fallback engine |
| **Parallelism** | concurrent.futures (ThreadPoolExecutor) | Multi-location parallel queries |
| **JSON** | Newtonsoft.Json.dll + Python json | Data serialization |
| **Packaging** | PyInstaller | Single-file executable distribution |
| **Code Signing** | Self-signed certificate | Distribution authenticity |
| **Configuration** | JSON deep-merge | Runtime configuration |
| **Platform** | Windows 10/11, Windows Server 2016+ | Target OS |

---

## Architecture Evolution (v1.0 → v5.5)

| Version | Key Improvement |
|---------|----------------|
| v1.0 | Basic sequential extraction, one location at a time |
| v2.0 | Multi-location support, sequential execution |
| v3.0 | Excel formatting improvements, column standardization |
| v4.0 | Refactored architecture, Manufacturing class |
| v5.0 | **Single-session optimization** — login once, parallel queries |
| v5.1 | Timestamped output filenames, V2 class structure |
| v5.5 | Performance monitoring, debug variant, exact 19-column schema |

---

## Single-Session Architecture (v5.0+)

The key architectural innovation in v5.0:

```
BEFORE (v1.0-v4.0): Sequential with redundant authentication

Location 1: Login → Query → Logout
Location 2: Login → Query → Logout
Location 3: Login → Query → Logout
...
Total: N × (login + query + logout)

AFTER (v5.0+): Single authentication, parallel queries

Login (once)
├── Location 1: Query ─┐
├── Location 2: Query ─┤ Parallel
├── Location 3: Query ─┤ (ThreadPoolExecutor)
├── ...                ─┘
Logout (once)
Total: 1 × login + max(query_times) + 1 × logout
```

---

## Excel Export Schema (19 Columns)

| # | Column | Source |
|---|--------|--------|
| 1 | SAP Number | Formatted from material code (XXXXXXX-XX) |
| 2 | Material Description | MES material master |
| 3 | Batch ID | MES batch identifier |
| 4 | Storage Box | Physical storage location |
| 5 | Storage Index | Position within storage box |
| 6 | Quantity | Available quantity |
| 7 | Unit of Measure | PCS, M, KG, etc. |
| 8 | Expiration Date | Material expiration |
| 9 | Arrival Date | Date received |
| 10 | Status | Available, Reserved, Blocked |
| 11 | Location | Production station |
| 12 | Location Name | Human-readable station name |
| 13 | Last Movement | Date of last inventory transaction |
| 14 | Supplier Batch | Supplier's batch identifier |
| 15 | Manufacturer | Component manufacturer |
| 16 | MPN | Manufacturer Part Number |
| 17 | Storage Type | Storage classification |
| 18 | MSL | Moisture Sensitivity Level |
| 19 | Notes | Additional information |

---

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Records processed (20 locations) | 53,820 |
| Processing time (1 location) | 11.07 seconds |
| Processing time (20 locations) | 11.74 seconds |
| Parallel efficiency | ~95% (20 locations nearly as fast as 1) |
| Excel file size (53K records) | ~3.0 MB |
| Executable size | 31.3 MB |
| Memory usage | ~150-200 MB (Python + .NET runtime) |

The near-identical timing between 1 location and 20 locations demonstrates the effectiveness of the parallel architecture — the overhead is dominated by the slowest single location query.

---

## Code Organization

```
Main Entry (InventoryExport.py)
│
├── ConfigManager — Deep-merge JSON configuration
│
├── MesApiShared — Thread-safe singleton MES client
│   ├── login() — Authenticate once
│   ├── get_setuped_batches(location) — Query location
│   ├── get_setuped_units(location) — Alternative query
│   └── logout() — Clean up
│
├── SingleSessionProcessor — Parallel query orchestrator
│   └── ThreadPoolExecutor(max_workers=N)
│       └── Per location: query → process → collect
│
├── MesDataProcessor — Response normalization
│   └── Extract 19 columns → normalized dict
│
├── ExcelExporter — Dual-engine export
│   ├── Primary: xlsxwriter (formatted)
│   ├── Fallback: pandas (robust)
│   └── Emergency: CSV (permission-safe)
│
└── Main — Orchestration
    ├── Load config
    ├── Initialize .NET
    ├── Login → Process → Sort → Export → Logout
    └── Summary + exit code
```
