# Architecture — HIVE Warehouse Management System

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SYSTEMS                                  │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌────────────────┐   │
│  │ MES (XML)    │  │ Siplace Pro  │  │ SAP BOM  │  │ Hanel Lifts    │   │
│  │ Inventory    │  │ Setup Files  │  │ (CSV)    │  │ (Auto Storage) │   │
│  └──────┬───────┘  └──────┬───────┘  └────┬─────┘  └───────┬────────┘   │
└─────────┼─────────────────┼───────────────┼────────────────┼────────────┘
          │                 │               │                │
          ▼                 ▼               ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    🐝 HIVE CONNECTORS                                     │
│                                                                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ MES Client       │  │ Setup Processor  │  │ Hanel Client     │       │
│  │                  │  │                  │  │                  │       │
│  │ • XML parsing    │  │ • Siplace XML    │  │ • Lift status    │       │
│  │ • Inventory      │  │   parser         │  │   monitoring     │       │
│  │   upsert         │  │ • Material list  │  │ • Retrieve       │       │
│  │ • Batch proc.    │  │   extraction     │  │   commands       │       │
│  │ • Sync logging   │  │                  │  │ • Position       │       │
│  └──────────────────┘  └──────────────────┘  │   tracking       │       │
│                                                └──────────────────┘       │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │ Import/Export Service                                              │   │
│  │ • File drop monitoring  • Format detection  • Batch processing    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    🐝 HIVE QUEEN — FastAPI Backend :8000                  │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ API Layer (api/v1/endpoints/)                                       │ │
│  │                                                                      │ │
│  │ /api/v1/inventory/*    — CRUD operations for inventory              │ │
│  │ /api/v1/ml/*           — ML training, prediction, model registry    │ │
│  │ /api/v1/warehouse/*    — Warehouse learner & analytics              │ │
│  │ /api/v1/jobs/*         — Job creation & management                  │ │
│  │ /api/v1/lifts/*        — Lift status & control                      │ │
│  │ /ws/dashboard          — WebSocket for real-time updates            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Core Services                                                        │ │
│  │                                                                      │ │
│  │ • Startup verification (DB connectivity, file structure, ML system) │ │
│  │ • pgAdmin4 auto-launcher (embedded DB admin)                        │ │
│  │ • CORS middleware                                                    │ │
│  │ • Mock data fallback (for dev without PostgreSQL)                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    🗄️ PostgreSQL 15                                       │
│                                                                           │
│  Database: hive_wms                                                      │
│                                                                           │
│  Schema: hive_core           Schema: hive_ml          Schema: hive_      │
│  ┌──────────────────┐       ┌──────────────────┐     analytics          │
│  │ materials        │       │ model_registry   │     ┌──────────────┐   │
│  │ inventory        │       │ feature_groups   │     │kpi_definitions│   │
│  │ storage_locations│       │ feature_values   │     │kpi_observations│  │
│  │ lifts            │       └──────────────────┘     └──────────────┘   │
│  │ jobs             │                                                    │
│  │ system_config    │                                                    │
│  │ audit_log        │                                                    │
│  │ mes_sync_history │                                                    │
│  └──────────────────┘                                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
┌──────────────────────┐ ┌──────────────────┐ ┌──────────────────────┐
│ 🐝 HIVE WORKERS      │ │ 🐝 ML WORKER     │ │ 🐝 HIVE SCOUTS       │
│                      │ │                  │ │                      │
│ • Job Creator        │ │ • Scheduled      │ │ • Performance        │
│   Pipeline           │ │   training       │ │   Tracker            │
│   Setup→BOM match    │ │ • Predictions    │ │ • Health Check       │
│   Route optimization │ │ • Model refresh  │ │ • Alert Manager      │
│   Multi-format       │ │ • Registry mgmt  │ │ • Incident Log       │
│   output             │ │                  │ │                      │
└──────────────────────┘ └──────────────────┘ └──────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    🎨 HIVE DASHBOARD — React + Vite :5173                 │
│                                                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐    │
│  │RealTimeKPIs│ │WarehouseMap│ │AlertPanel  │ │RecentImports       │    │
│  │            │ │            │ │            │ │                    │    │
│  │ 6 KPI cards│ │ SVG map    │ │ Severity-  │ │ Import activity    │    │
│  │ Hexagon    │ │ Live lift  │ │ coded      │ │ feed with          │    │
│  │ decorations│ │ positions  │ │ alert feed │ │ timestamps         │    │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘    │
│                                                                           │
│  WebSocket: ws://localhost:8000/ws/dashboard (auto-reconnect)            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Job Creation Pipeline Architecture

```
┌─────────────────┐     ┌─────────────────┐
│ Siplace Pro      │     │ SAP BOM         │
│ Setup XML        │     │ CSV Export      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Setup Processor │     │ BOM Processor   │
│                 │     │                 │
│ • Parse setup   │     │ • Parse BOM     │
│ • Extract       │     • • Extract       │
│   material list │     │   material list │
│ • Identify      │     │ • Map to        │
│   quantities    │     │   inventory     │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌─────────────────────┐
         │ Job Creator Pipeline│
         │                     │
         │ 1. Match items      │
         │    Setup ↔ BOM      │
         │                     │
         │ 2. Resolve locations │
         │    Material → Zone  │
         │    → Storage slot   │
         │                     │
         │ 3. Optimize route   │
         │    Minimize travel  │
         │    distance         │
         │                     │
         │ 4. Generate output  │
         │    JSON/CSV/Excel/  │
         │    PDF/TXT          │
         └─────────────────────┘
```

---

## ML Pipeline — Detailed Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    TRAINING CYCLE                             │
│                                                               │
│  ml_worker.py (scheduled)                                     │
│      │                                                        │
│      ├── 1. Check ML config (enabled? which models?)         │
│      │                                                        │
│      ├── 2. Query PostgreSQL for training data               │
│      │    • Inventory movements (Model A, D, E)              │
│      │    • Historical demand (Model B)                       │
│      │    • Job execution logs (Model C)                      │
│      │    • KPI observations (Model F)                        │
│      │    • Lift operation logs (Model G)                     │
│      │                                                        │
│      ├── 3. Feature engineering per model                    │
│      │    • Normalization, encoding, aggregation              │
│      │    • Train/test split (80/20)                         │
│      │                                                        │
│      ├── 4. Train model                                      │
│      │    • Fit algorithm to training data                   │
│      │    • Evaluate on test data                             │
│      │    • Calculate metrics (R², MAE, precision, etc.)     │
│      │                                                        │
│      ├── 5. Persist to registry                              │
│      │    • Serialize model (joblib for sklearn,              │
│      │      native for LightGBM/Prophet)                     │
│      │    • Store in hive_ml.model_registry                   │
│      │    • Tag as production-ready if metrics pass           │
│      │                                                        │
│      └── 6. Log results                                       │
│           • Training metrics                                  │
│           • Model version                                     │
│           • Timestamp                                         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                   PREDICTION CYCLE                            │
│                                                               │
│  HIVEPredictorService                                         │
│      │                                                        │
│      ├── 1. Load production model from registry              │
│      │                                                        │
│      ├── 2. Query latest features from PostgreSQL            │
│      │                                                        │
│      ├── 3. Generate predictions                              │
│      │                                                        │
│      └── 4. Store results → available via API / dashboard    │
└──────────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture (Windows)

```
Windows Server / Windows 10-11
│
├── Embedded PostgreSQL 15.8
│   └── Auto-installed by start_hive.py
│
├── Python Backend (FastAPI :8000)
│   └── Windows Service (via deploy/windows/)
│
├── React Frontend (Vite :5173)
│   └── Windows Service
│
├── ML Worker (background)
│   └── Windows Service
│
├── Import Service (file monitoring)
│   └── Windows Service
│
└── pgAdmin4 (embedded DB admin)
    └── Auto-launched, :5050
```
