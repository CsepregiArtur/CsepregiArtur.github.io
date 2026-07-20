# Manufacturing Operations Dashboard

## Real-Time Production Planning & Monitoring System

**Industry:** High-Mix Electronics Manufacturing  
**Role:** Solution Architect & Developer  
**Status:** Production-Ready

---

## Executive Summary

A comprehensive manufacturing operations dashboard that transforms fragmented production planning data into real-time operational intelligence. The system ingests production schedules from enterprise systems, normalizes and versions them, calculates estimated production times, tracks changes between planning updates, and provides a rich web interface with KPI dashboards, Gantt timelines, heatmaps, and CSV exports.

Built for electronics manufacturing environments running multiple SMT (Surface Mount Technology) assembly lines with complex scheduling requirements across many workstations and product platforms.

---

## Business Challenge

Production planning data was distributed across multiple systems — enterprise ERP exports, spreadsheet-based schedules, and manual tracking logs. Planning updates arrived multiple times per day, but there was no system to:

- Consolidate fragmented data into a single operational view
- Track what changed between planning updates
- Estimate production times based on actual assembly standards
- Provide workstations with clear, real-time priority visibility
- Enable management to see production status at a glance

Operators and managers relied on manual inspection of spreadsheets to understand what to build next, leading to delayed decisions and production inefficiencies.

---

## Solution

Designed and developed a standalone production dashboard system that:

1. **Ingests CSV planning exports** from enterprise systems via automated scheduled imports
2. **Creates versioned snapshots** of every planning update, preserving full history
3. **Maps products to platforms** using a master lookup with assembly time standards
4. **Calculates estimated production times** using TOP/BOTTOM assembly minute standards with fallback logic
5. **Detects 9 types of changes** between consecutive planning snapshots (new orders, removed, rescheduled, quantity changes, etc.)
6. **Provides a rich web dashboard** with 10 specialized views for different operational roles

The system runs as a self-contained application — no external dependencies beyond the planning CSV data source.

---

## Key Features

- **Real-Time KPI Dashboard** — Total orders, active/planned/unplanned, production hours, late orders, completion rates
- **Gantt Timeline View** — Per-workstation production timeline with calculated start/end times
- **Workstation Load Analysis** — Visual load distribution across all workstations
- **Platform Distribution** — Product platform and client breakdown
- **Material Code Analysis** — Component-level production tracking with assembly time estimates
- **Change Tracking** — Automatic detection and visualization of 9 change types between planning snapshots
- **Heatmap View** — Workstation × Day matrix of production intensity
- **CSV Export** — Multiple export formats for further analysis
- **Automated Imports** — Configurable background scheduler for planning data ingestion
- **Database Backup** — Automatic integrity-checked backups

---

## Business Impact

| Metric | Impact |
|--------|--------|
| Decision Speed | Real-time operational decisions replacing manual spreadsheet inspection |
| Production Visibility | Single source of truth across all workstations and shifts |
| Change Awareness | Automatic detection of 9 change types between planning updates |
| Reporting Efficiency | Eliminated manual consolidation of spreadsheets |
| Planning Accuracy | Assembly time standards integrated into scheduling calculations |

---

## Technology Stack

`Python` · `Flask` · `SQLite` · `JavaScript` · `ApexCharts` · `Waitress` · `PyInstaller`

---

## Architecture

```
Enterprise ERP/Planning → CSV Export → Automated Import → SQLite Database
                                                              ↓
Browser Dashboard ← Flask REST API ← Production Plan + Snapshots + Changes
```

---

> **Note:** This is the public portfolio version. All company, customer, and production-specific information has been anonymized. The architecture, business logic, and technical patterns represent real manufacturing solutions developed in production environments.

---

[View Details](./EXECUTIVE_SUMMARY.md) · [Business Case](./BUSINESS_CASE.md) · [Architecture](./ARCHITECTURE.md) · [Implementation](./IMPLEMENTATION.md) · [Results](./RESULTS.md) · [Tech Stack](./TECH_STACK.md)
