# Architecture — Manufacturing Operations Dashboard

## System Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                               │
│                                                                    │
│  ┌──────────────────┐     ┌──────────────────┐                    │
│  │ Enterprise ERP    │     │ Production        │                    │
│  │ (CSV Export)      │     │ Planning (CSV)    │                    │
│  └────────┬─────────┘     └────────┬─────────┘                    │
│           │                        │                               │
└───────────┼────────────────────────┼──────────────────────────────┘
            │                        │
            ▼                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                     IMPORT LAYER                                   │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ import_to_sqlite.py                                          │ │
│  │  • CSV parsing & validation                                  │ │
│  │  • Platform mapping (material → platform lookup)             │ │
│  │  • Snapshot creation (timestamped version)                   │ │
│  │  • Change evaluation (compare current vs previous snapshot)  │ │
│  │  • Data normalization & cleaning                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                     DATABASE LAYER                                 │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ SQLite Database (smd_live.db)                               │  │
│  │                                                              │  │
│  │  • snapshots           — Versioned planning states           │  │
│  │  • production_plan     — Current production orders           │  │
│  │  • platforms_master    — Product/platform time standards     │  │
│  │  • change_tracking     — Delta between snapshots (9 types)   │  │
│  │  • evaluation_results  — Audit/verification data             │  │
│  │                                                              │  │
│  │  WAL mode enabled for concurrent read access                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      API LAYER                                     │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Flask + Waitress (dashboard_server.py)                       │  │
│  │                                                              │  │
│  │  REST API Endpoints (20):                                    │  │
│  │                                                              │  │
│  │  /api/kpi              — Aggregate KPI metrics               │  │
│  │  /api/planning/summary — Planning overview                   │  │
│  │  /api/production-time  — Time estimates per order            │  │
│  │  /api/workstations     — Workstation load & status           │  │
│  │  /api/timeline         — Gantt timeline data                 │  │
│  │  /api/timeline-load    — Workstation load timeline           │  │
│  │  /api/materials        — Material code analysis              │  │
│  │  /api/orders           — Order detail & filtering            │  │
│  │  /api/changes          — Change tracking (9 types)           │  │
│  │  /api/snapshots        — Snapshot list & comparison          │  │
│  │  /api/heatmap          — Workstation × Day matrix            │  │
│  │  /api/platforms        — Platform/client distribution        │  │
│  │  /api/filter-options   — Available filter values             │  │
│  │  /api/status           — System health                       │  │
│  │  /api/import-status    — Import job status                   │  │
│  │  /api/import/trigger   — Manual import trigger               │  │
│  │  /api/backup           — Database backup trigger             │  │
│  │  /api/export/*.csv     — CSV data export                     │  │
│  │  /api/evaluation/*     — Audit evaluation data               │  │
│  │                                                              │  │
│  │  Global filters: text search, workstation, platform,          │  │
│  │  status, date range                                          │  │
│  │                                                              │  │
│  │  Background services:                                         │  │
│  │  • Auto-import scheduler (configurable interval)             │  │
│  │  • Database backup (every 2 hours)                           │  │
│  │  • Network discovery (LAN IP auto-detect)                    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                                  │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Single-Page Application (dashboard.html)                     │  │
│  │                                                              │  │
│  │  10 Dashboard Tabs:                                          │  │
│  │                                                              │  │
│  │  1. Overview     — KPI cards, status summary                 │  │
│  │  2. Planning     — Order lists, filters, planning details    │  │
│  │  3. Time         — Production time estimates, TOP/BOTTOM     │  │
│  │  4. Stations     — Workstation load, per-station metrics     │  │
│  │  5. Platforms    — Platform/client distribution charts       │  │
│  │  6. Materials    — Material code analysis                    │  │
│  │  7. Changes      — Change tracking visualization             │  │
│  │  8. Snapshots    — Snapshot history, comparison tools        │  │
│  │  9. Heatmap      — Workstation × Day intensity matrix       │  │
│  │  10. Export      — Multi-format CSV export                   │  │
│  │                                                              │  │
│  │  Technology: Vanilla JS + ApexCharts.js + CSS3                │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Table: `snapshots`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Snapshot ID |
| moment_salvare | TIMESTAMP | When the snapshot was created |
| nota | TEXT | Optional note |

### Table: `production_plan`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Order ID |
| snapshot_id | FK → snapshots | Which snapshot this belongs to |
| workstation | TEXT | Target workstation |
| order_number | TEXT | Production order number |
| material_code | TEXT | Material/SAP code |
| description | TEXT | Order description |
| scheduled_timestamp | TEXT | Scheduled date/time |
| is_active | INTEGER | Currently active (0/1) |
| is_planned | INTEGER | Planned or unplanned (0/1) |
| pp_platform | TEXT | Product platform |
| qty_launched | INTEGER | Quantity launched |
| base_finish_date | TEXT | Base finish date |
| sap_planned_finish | TEXT | SAP planned finish |

### Table: `platforms_master`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Platform ID |
| pp_key | TEXT | Platform key (unique) |
| platform_name | TEXT | Platform/client name |
| min_top | REAL | TOP side assembly minutes |
| min_bottom | REAL | BOTTOM side assembly minutes |
| count_top | INTEGER | TOP side component count |
| count_bottom | INTEGER | BOTTOM side component count |

### Table: `change_tracking`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | Change ID |
| from_snapshot_id | FK | Previous snapshot |
| to_snapshot_id | FK | Current snapshot |
| change_type | TEXT | One of 9 change types |
| workstation | TEXT | Affected workstation |
| order_number | TEXT | Affected order |
| old_value | TEXT | Previous value |
| new_value | TEXT | New value |

---

## Change Tracking System (9 Types)

| # | Change Type | Description |
|---|-------------|-------------|
| 1 | new_order | New order added to plan |
| 2 | removed_order | Order removed from plan |
| 3 | moved_workstation | Order moved to different station |
| 4 | re_sequenced | Order sequence changed |
| 5 | timestamp_changed | Scheduled time changed |
| 6 | status_changed | Active/planned status changed |
| 7 | quantity_changed | Production quantity modified |
| 8 | reduction_changed | Quantity reduction applied |
| 9 | setup_changed | Machine setup configuration changed |

---

## Production Time Estimation

```
Estimated Minutes = MAX(
    SUM(min_top × count_top) / COUNT(count_top),
    SUM(min_bottom × count_bottom) / COUNT(count_bottom),
    0.5  -- fallback minimum
)
```

Uses CTE-based queries against `platforms_master` for standards, with fallback of 0.5 minutes per piece when no standard data exists.

---

## Security & Distribution

- **License System:** JWT (RS256) with RSA public key verification, hardware binding (motherboard serial, CPU ID, MAC address), offline support, floating lease management
- **Distribution:** PyInstaller single-file executable with optional C++ loader for encrypted payloads
- **Access:** Local network only, no internet dependency for operation
