# Technology Stack — Manufacturing Operations Dashboard

## Core Technologies

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Backend Framework** | Flask | 3.0.0 | REST API server |
| **WSGI Server** | Waitress | 2.1.2 | Production HTTP server |
| **Database** | SQLite3 | — | Local data storage (WAL mode) |
| **Frontend** | Vanilla JavaScript | ES6+ | Single-page dashboard |
| **Charts** | ApexCharts.js | — | Interactive data visualization |
| **Build/Distribution** | PyInstaller | — | Single-file executable packaging |
| **Language** | Python | 3.x | All backend logic |

---

## Frontend Architecture

The dashboard is a **single HTML file** with embedded CSS and JavaScript — no framework, no build step, no npm.

### Key Design Decisions

1. **No Framework** — Vanilla JS was chosen for zero dependencies, fast loading, and simplicity. The dashboard's requirements (API calls, DOM manipulation, chart rendering) are well-served by vanilla JS + ApexCharts.

2. **Local ApexCharts** — The chart library is bundled locally (not loaded from CDN) for offline operation and faster loading.

3. **Offline-Ready** — The entire application runs on localhost. No internet connection is required for operation — only for license validation.

4. **10 Specialized Tabs** — Each tab is a self-contained view with its own API calls and rendering logic, allowing independent development and maintenance.

### Tab Architecture

```
dashboard.html
├── Tab 1: Overview       → /api/kpi, /api/status
├── Tab 2: Planning       → /api/planning/summary, /api/orders
├── Tab 3: Time           → /api/production-time
├── Tab 4: Stations       → /api/workstations
├── Tab 5: Platforms      → /api/platforms
├── Tab 6: Materials      → /api/materials
├── Tab 7: Changes        → /api/changes
├── Tab 8: Snapshots      → /api/snapshots
├── Tab 9: Heatmap        → /api/heatmap
└── Tab 10: Export        → /api/export/*.csv
```

---

## Backend Architecture

### API Design Principles

- **RESTful JSON API** — All endpoints return JSON with consistent structure
- **Global Filters** — Text search, workstation, platform, status, date range filters applied server-side via query parameters
- **Stateless** — No user sessions; all state is in the database
- **Background Services** — Separate threads for import scheduler and database backup

### Key Backend Modules

| Module | Purpose |
|--------|---------|
| `dashboard_server.py` | Flask app, route definitions, server startup |
| `import_to_sqlite.py` | CSV parsing, data import, snapshot creation, change detection |
| `client_sdk/` | License validation, hardware binding, offline support |
| `db_repair.py` | Database integrity checking and repair |
| `onedrive.py` | Cloud storage path detection |

---

## Data Flow

```
CSV File (ERP Export)
    ↓
import_to_sqlite.py
    ├── Parse CSV (platform mapping, column normalization)
    ├── Create snapshot (timestamped)
    ├── Compare with previous snapshot
    ├── Detect changes (9 types)
    └── Write to SQLite
        ↓
dashboard_server.py (Flask)
    ├── Query SQLite with filters
    ├── Calculate production times
    └── Return JSON
        ↓
dashboard.html (Browser)
    ├── Fetch API data
    ├── Render ApexCharts
    ├── Populate tables
    └── Handle user interactions
```

---

## Database Design

- **Storage Engine:** SQLite with WAL (Write-Ahead Logging) mode for concurrent read access
- **Synchronous Mode:** NORMAL (balanced performance and safety)
- **Foreign Keys:** Enabled for referential integrity
- **Indices:** Created on frequently filtered columns (workstation, platform, snapshot_id)

---

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Startup time | <3 seconds |
| API response (filtered) | <500ms typical |
| Dashboard load | <2 seconds |
| Snapshot import | ~1-2 seconds per 1000 orders |
| Memory usage | ~80-120 MB (Python + SQLite) |
| Database size growth | ~2-5 MB per 1000 orders |

---

## Distribution

The application is distributed as a single-file Windows executable (built with PyInstaller) or as a Python package. The executable bundles:
- Python runtime
- All dependencies (Flask, Waitress, etc.)
- License validation SDK
- Frontend assets

No installation required — download and run.
