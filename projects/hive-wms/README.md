# HIVE Warehouse Management System

## Intelligent Inventory Management for Electronics Manufacturing

**Industry:** Electronics Manufacturing (SMT/PCB Assembly)  
**Role:** System Architect & Full-Stack Developer  
**Status:** Advanced Prototype (MVP Complete)

---

## Executive Summary

HIVE WMS is a next-generation warehouse management system purpose-built for electronics manufacturing environments. It manages thousands of electronic components stored in automated storage lifts (Hanel), integrates directly with Manufacturing Execution Systems (MES) for real-time inventory visibility, generates optimized pick lists by matching machine setup files against Bills of Materials, and includes a sophisticated 7-model machine learning subsystem for predictive analytics.

The system is named HIVE — a bee-inspired analogy where each component (worker bee) has its place, the warehouse (hive) operates with precision, and the system intelligently orchestrates the flow of materials.

---

## Business Challenge

An electronics manufacturing facility must manage thousands of unique electronic components — resistors, capacitors, ICs, connectors, crystals — stored across multiple automated storage lifts. Traditional inventory management approaches create:

- **Data Silos** — MES inventory data disconnected from physical warehouse operations
- **Inefficient Picking** — No automated route optimization for pick lists
- **Manual Setup Preparation** — Time-consuming manual matching of machine setup files against BOMs
- **Reactive Operations** — No predictive analytics for demand forecasting or maintenance
- **Limited Visibility** — Management lacks real-time understanding of warehouse performance

---

## Solution

HIVE WMS provides a unified platform that:

1. **Synchronizes with MES** — Parses production XML data to maintain real-time inventory accuracy
2. **Manages Storage Lifts** — Monitors 5+ automated Hanel storage/retrieval lifts with live position tracking
3. **Generates Optimized Pick Lists** — Combines Siplace Pro machine setup XML with SAP BOM data to create route-optimized warehouse picking jobs
4. **Delivers ML-Powered Predictions** — 7 specialized machine learning models for demand forecasting, anomaly detection, job duration prediction, and maintenance scheduling
5. **Provides Real-Time Dashboard** — React-based web interface with WebSocket live updates, KPI cards, and SVG warehouse map

---

## Key Features

- **Real-Time Inventory Management** — Track components by part number, batch, location, quantity, quality status, and expiration date
- **MES Integration** — Automated XML parsing and synchronization with enterprise manufacturing systems
- **Optimized Job Creation** — Machine setup → BOM matching → route-optimized pick list generation
- **SVG Warehouse Map** — Visual representation of receiving, storage ("The Comb"), and shipping zones with live lift positions
- **7 ML Models**:

  | Model | Type | Purpose |
  |-------|------|---------|
  | A | LightGBM | Travel Time Prediction |
  | B | Prophet | Kanban Demand Forecasting |
  | C | RandomForest/GradientBoosting | Job Duration Prediction |
  | D | IsolationForest | Anomaly Detection |
  | E | - | Zone Congestion Prediction |
  | F | Prophet | KPI Time Series Forecasting |
  | G | - | Lift Maintenance Prediction |

- **Multi-Output Export** — Pick lists in JSON, CSV, Excel, PDF, and TXT formats
- **Real-Time WebSocket Dashboard** — Live KPI cards, alert panel, recent imports, and warehouse map
- **Embedded Database** — Self-contained PostgreSQL deployment for production environments

---

## Business Impact

| Area | Expected Impact |
|------|----------------|
| Inventory Accuracy | Real-time MES synchronization eliminates data discrepancies |
| Picking Efficiency | Route-optimized pick lists reduce travel time by estimated 30-40% |
| Setup Preparation | Automated BOM-to-setup matching eliminates manual cross-referencing |
| Predictive Maintenance | ML-based lift maintenance prediction reduces unplanned downtime |
| Decision Support | Real-time KPI dashboard enables proactive warehouse management |

---

## Technology Stack

`Python` · `FastAPI` · `React 19` · `TypeScript` · `PostgreSQL` · `SQLAlchemy` · `LightGBM` · `Prophet` · `scikit-learn` · `TailwindCSS` · `WebSocket` · `Vite`

---

## Architecture

```
MES (XML) ──┐
Siplace Pro ─┼──→ HIVE Connectors ──→ FastAPI Backend ──→ PostgreSQL DB
SAP BOM ────┘                              │
Hanel Lifts ───────────────────────────────┤
                                           ↓
                              React Dashboard (WebSocket Live)
                                           │
                              ML Pipeline (7 Models, Scheduled)
```

---

> **Note:** This is the public portfolio version. All company-specific integration details have been anonymized. The architecture, ML models, and business logic represent real manufacturing solutions.

---

[View Details](./EXECUTIVE_SUMMARY.md) · [Business Case](./BUSINESS_CASE.md) · [Architecture](./ARCHITECTURE.md) · [ML System](./TECH_STACK.md) · [Results](./RESULTS.md)
