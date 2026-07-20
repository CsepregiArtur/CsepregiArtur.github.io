# SMT Assembly Line Monitoring & Verification

## Real-Time Production Quality Assurance System

**Industry:** Electronics Manufacturing (SMT Assembly)  
**Role:** Solution Architect & Developer  
**Status:** Production-Ready

---

## Executive Summary

A real-time SMT (Surface Mount Technology) assembly line monitoring and verification system that continuously validates that running machine programs match master engineering specifications. The system monitors five production lines — each containing multiple sequential stations (solder paste printer, pick-and-place mounters, reflow oven, optical inspection) — and provides an Andon-light dashboard with multi-channel alerting.

The system replaces manual program verification with automated, continuous validation. When a mismatch is detected — wrong stencil, wrong thermal profile, wrong pick-and-place recipe — alerts are dispatched immediately through email, webhook (Slack/Teams), file shares, and browser notifications.

---

## Business Challenge

SMT assembly lines consist of multiple sequential stations, each running specific engineering programs. These programs MUST match the master datasheet for the product being built. Without automated verification:

- **Manual Inspection** — Operators manually check program names across machines, creating risk of human error
- **Delayed Detection** — Mismatches (wrong stencil, wrong thermal profile, wrong component recipe) cause defects caught only AFTER boards are built
- **Scrap & Rework** — Each undetected mismatch creates scrap boards, rework costs, and line downtime
- **No Real-Time Visibility** — Supervisors lack immediate awareness of station health across multiple lines

---

## Solution

A comprehensive monitoring system that:

1. **Polls Production Machines** — Continuously reads XML telemetry files from SMT machines (printers, mounters, ovens, AOI stations) via network shares
2. **Validates Against Master Data** — Compares running programs against engineering specifications from the master datasheet system
3. **Provides Andon-Light Dashboard** — GREEN/AMBER/RED status per station with real-time WebSocket updates
4. **Dispatches Multi-Channel Alerts** — Email, Slack/Teams webhook, network file shares, browser push notifications, and audio alarms
5. **Tracks Production KPIs** — Idle time, cycle time, changeover efficiency, bottleneck analysis
6. **Operates Autonomously** — Weekend mode auto-sleep, crash recovery with state persistence, watchdog thread monitoring

---

## Key Features

- **5-Line Simultaneous Monitoring** — Independent configurations per production line
- **Multi-Station Validation**:

  | Station | Validation | Failure Mode |
  |---------|-----------|--------------|
  | Solder Paste Printer | Program name + Stencil ID match | Program/Stencil mismatch |
  | Pick-and-Place (×3) | Production order barcode match | Wrong production order |
  | Reflow Oven | Thermal profile match | Wrong temperature profile |
  | AOI Inspection | Substring prefix + format match | Inspection program mismatch |

- **Andon Light System** — GREEN (<15 min idle), AMBER (>15 min), RED (>30 min) per station
- **Weekend Mode** — Auto-pauses monitoring on weekends after inactivity, resumes Monday morning
- **Crash Recovery** — Runtime state persisted every ~90 seconds, restored on restart
- **Watchdog Monitor** — Thread health monitoring with auto-restart of crashed components
- **Changeover Tracker** — Tracks program changes and board counts since changeover
- **Efficiency Analytics** — Per-station efficiency, bottleneck detection, Pareto defect analysis
- **CSV Export** — Validation and telemetry reports for compliance and analysis
- **Simulation Mode** — Built-in XML telemetry generator for offline testing and demonstrations

---

## Business Impact

| Metric | Impact |
|--------|--------|
| Defect Prevention | Real-time mismatch detection prevents scrap before it occurs |
| Quality Assurance | Continuous automated validation replaces manual spot-checks |
| Response Time | Multi-channel alerts notify supervisors within seconds of issues |
| Operational Visibility | Single dashboard shows health of all 5 lines and all stations |
| Downtime Reduction | Changeover tracking and idle time monitoring reveal optimization opportunities |

---

## Technology Stack

`Python` · `Flask` · `Socket.IO` · `React 18` · `TypeScript` · `TailwindCSS` · `C#/.NET` · `PyInstaller` · `Web Audio API`

---

## Architecture

```
SMT Machines → XML Telemetry → SMB Network Share → File Poller (3s)
                                                       ↓
Datenblatt Manager ← .NET Bridge Service ← Validation Engine ← Orchestrator
                                                       ↓
                                              Flask API + WebSocket
                                                       ↓
                        ┌──────────────┬───────────────┬────────────────┐
                        ↓              ↓               ↓                ↓
                   React Dashboard  Email Alerts  Webhook Alerts  File Alerts
                   (Andon Lights)   (SMTP)       (Slack/Teams)   (JSON/LOG)
```

---

> **Note:** This is the public portfolio version. All machine identifiers, network paths, production line names, and facility-specific information have been anonymized. The architecture and validation logic represent real manufacturing solutions.

---

[View Details](./EXECUTIVE_SUMMARY.md) · [Business Case](./BUSINESS_CASE.md) · [Architecture](./ARCHITECTURE.md) · [Implementation](./IMPLEMENTATION.md) · [Results](./RESULTS.md) · [Tech Stack](./TECH_STACK.md)
