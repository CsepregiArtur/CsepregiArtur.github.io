# Technology Stack — HIVE Warehouse Management System

## Core Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend Framework** | FastAPI | High-performance async REST API |
| **Frontend** | React 19 + TypeScript | Modern UI with type safety |
| **Build Tool** | Vite | Fast frontend development/build |
| **CSS Framework** | TailwindCSS | Utility-first styling |
| **Database** | PostgreSQL 15 | Production data storage (3 schemas) |
| **ORM** | SQLAlchemy | Database abstraction layer |
| **Real-Time** | WebSocket (FastAPI native) | Live dashboard updates |
| **ML — Gradient Boosting** | LightGBM | Travel time prediction |
| **ML — Time Series** | Prophet | Demand & KPI forecasting |
| **ML — Ensemble** | scikit-learn (RandomForest, GradientBoosting) | Job duration prediction |
| **ML — Anomaly** | scikit-learn (IsolationForest) | Anomaly detection |
| **Data Processing** | pandas, numpy | Data transformation & analysis |

---

## Database Schema

### Schema: `hive_core` — Operational Data

| Table | Purpose |
|-------|---------|
| `materials` | Electronic component master data |
| `inventory` | Real-time inventory levels by location/batch |
| `storage_locations` | Physical storage positions in lifts |
| `lifts` | Automated storage lift configuration |
| `jobs` | Warehouse picking jobs |
| `system_configuration` | Runtime configuration |
| `audit_log` | Operational audit trail |
| `mes_sync_history` | MES synchronization log |

### Schema: `hive_ml` — Machine Learning

| Table | Purpose |
|-------|---------|
| `model_registry` | Trained model metadata and storage |
| `feature_groups` | ML feature definitions |
| `feature_values` | Feature data for training/inference |

### Schema: `hive_analytics` — KPIs

| Table | Purpose |
|-------|---------|
| `kpi_definitions` | KPI calculation formulas |
| `kpi_observations` | Historical KPI measurements |

---

## ML Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ML PIPELINE                               │
│                                                              │
│  1. Data Collection                                          │
│     ├── Inventory movements from hive_core                   │
│     ├── Job execution history                                │
│     ├── Lift operation logs                                  │
│     └── KPI time series                                      │
│                                                              │
│  2. Feature Engineering (per model)                          │
│     ├── Model A: Travel distance, lift position, time        │
│     ├── Model B: Historical demand, seasonality              │
│     ├── Model C: Job size, item count, distance              │
│     ├── Model D: Transaction patterns, velocity              │
│     ├── Model E: Concurrent jobs, zone occupancy             │
│     ├── Model F: Historical KPI trends                       │
│     └── Model G: Lift cycles, error rates                    │
│                                                              │
│  3. Training (scheduled via ml_worker.py)                    │
│     ├── Train/test split (80/20)                             │
│     ├── Model-specific algorithms                            │
│     ├── Hyperparameter evaluation                            │
│     └── Model persistence to registry                        │
│                                                              │
│  4. Prediction (via predictor_service.py)                    │
│     ├── Load production model from registry                  │
│     ├── Generate predictions                                 │
│     └── Store results for dashboard display                  │
└─────────────────────────────────────────────────────────────┘
```

### 7 ML Models — Details

| Model | Algorithm | Input Features | Output | Refresh |
|-------|-----------|---------------|--------|---------|
| **A** — Travel Time | LightGBM | Distance, lift position, time of day | Estimated seconds | Daily |
| **B** — Demand Forecast | Prophet | Historical usage by material | 7-day forecast | Weekly |
| **C** — Job Duration | RandomForest/GradientBoosting | Job size, items, distance | Estimated minutes | Daily |
| **D** — Anomaly Detection | IsolationForest | Transaction patterns | Anomaly score | Hourly |
| **E** — Zone Congestion | Custom | Concurrent jobs per zone | Congestion index | Real-time |
| **F** — KPI Forecasting | Prophet | KPI time series | 30-day trend | Weekly |
| **G** — Lift Maintenance | Custom | Cycles, errors, age | Maintenance score | Daily |

---

## Frontend Architecture

### Component Tree

```
App.tsx
├── Header
│   ├── System status indicator
│   └── Navigation
├── RealTimeKPIs
│   ├── Orders KPI Card
│   ├── Jobs KPI Card
│   ├── Lifts KPI Card
│   ├── Inventory KPI Card
│   ├── Accuracy KPI Card
│   └── Cycle Time KPI Card
├── WarehouseMap (SVG)
│   ├── Receiving Zone
│   ├── Storage Zone ("The Comb")
│   ├── Shipping Zone
│   └── Live Lift Positions
├── AlertPanel
│   ├── Critical (🛑)
│   ├── Warning (⚠️)
│   └── Info (ℹ️)
├── RecentImports
│   └── Import activity feed
└── Footer
```

### WebSocket Data Flow

```
FastAPI Backend                     React Frontend
     │                                    │
     ├── /ws/dashboard ──────────────→ useWebSocket hook
     │                                    │
     │  Every KPI change:                 ├── Update KPI cards
     │  {                                 ├── Update warehouse map
     │    "type": "kpi_update",           ├── Add alert if needed
     │    "data": {...}                   └── Update import feed
     │  }
     │
     │  Every inventory change:
     │  {
     │    "type": "inventory_update",
     │    "data": {...}
     │  }
```

---

## Integration Architecture

### MES Connector

```
MES System → XML Export → mes_client.py
                              ├── Parse XML (component_BC, LOCATIONSNAME, BARCODE, etc.)
                              ├── Validate data integrity
                              ├── Map to hive_core schema
                              └── Upsert into PostgreSQL
```

### Job Creation Pipeline

```
Siplace Pro → Setup XML → SetupProcessor → Setup List
                                                  │
SAP → BOM CSV → BOMProcessor → BOM List ─────────┤
                                                  │
                                                  ▼
                                        JobCreator.pipeline()
                                        ├── Match setup items to BOM
                                        ├── Resolve storage locations
                                        ├── Optimize pick route
                                        └── Generate pick list
                                              │
                            ┌─────────────────┼─────────────────┐
                            ↓                 ↓                 ↓
                          JSON              CSV              Excel
```

### Hanel Lift Integration (Planned)

```
Hanel Lift Controller → FTP Server → hanel_client.py
                                        ├── Parse lift status
                                        ├── Send retrieve commands
                                        └── Update inventory positions
```
