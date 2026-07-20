# Architecture — SMT Line Monitoring & Verification

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PRODUCTION FLOOR                                 │
│                                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  EKRA    │  │ SIPLACE  │  │ SIPLACE  │  │ SIPLACE  │  │  RHEM    │  │
│  │ Printer  │  │   SX1    │  │   SX2    │  │   SX3    │  │  Oven    │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │             │             │             │          │
│  ┌────┴─────────────┴─────────────┴─────────────┴─────────────┴─────┐   │
│  │                       AOI Inspection                              │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  All machines write XML telemetry files to SMB network share             │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         NETWORK SHARE                                      │
│                                                                            │
│  XML telemetry files from all 5 lines × 6 stations = 30 data sources     │
│  Files detected by pattern: *0000*.xml (excluding response/copycontent)  │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                        POLLING & ORCHESTRATION                             │
│                                                                            │
│  ┌─────────────────────┐    ┌────────────────────────────────────────┐   │
│  │ SmtFilePoller       │    │ SmtOrchestrator                         │   │
│  │                     │    │                                          │   │
│  │ • Poll interval: 3s │───→│ • Receive file discoveries              │   │
│  │ • Pattern matching  │    │ • Route to station-specific handlers     │   │
│  │ • Deduplication     │    │ • Trigger validation after parsing      │   │
│  │ • Folder health      │    │ • Evaluate Andon light thresholds       │   │
│  └─────────────────────┘    │ • Dispatch notifications if needed      │   │
│                              │ • Update state cache                    │   │
│                              └────────────────────────────────────────┘   │
│                                                                            │
│  ┌─────────────────────┐    ┌────────────────────────────────────────┐   │
│  │ WatchdogMonitor     │    │ WeekendModeController                   │   │
│  │                     │    │                                          │   │
│  │ • Thread health     │    │ • Pause polling on Sat/Sun              │   │
│  │ • Orchestrator      │    │ • Resume Monday 07:00                   │   │
│  │   heartbeat         │    │ • 3-hour inactivity trigger             │   │
│  │ • 7-day incident    │    │ • Per-line independent                  │   │
│  │   log               │    │                                          │   │
│  └─────────────────────┘    └────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                        VALIDATION ENGINE                                   │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ Validation Rules (per station type):                                 │  │
│  │                                                                      │  │
│  │ EKRA Printer:                                                       │  │
│  │   ✓ Program name matches master datasheet                           │  │
│  │   ✓ Stencil ID matches expected stencil                             │  │
│  │                                                                      │  │
│  │ SIPLACE Mounter (SX1/SX2/SX3):                                      │  │
│  │   ✓ Production order barcode matches expected order                 │  │
│  │   ✓ Board barcode format is valid                                   │  │
│  │                                                                      │  │
│  │ RHEM Oven:                                                           │  │
│  │   ✓ Thermal profile name matches expected profile                   │  │
│  │                                                                      │  │
│  │ AOI Inspection:                                                      │  │
│  │   ✓ Inspection program prefix matches                               │  │
│  │   ✓ Last character matches (variant indicator)                      │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  Andon Color Logic:                                                       │
│  • GREEN  — Station idle < 15 minutes + all validations passing          │
│  • AMBER  — Station idle > 15 minutes OR data stale                      │
│  • RED    — Station idle > 30 minutes OR validation failed               │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────────┐
│ DATENBLATT BRIDGE│   │ FLASK API :5000  │   │ NOTIFICATION ROUTER   │
│                  │   │                  │   │                       │
│ .NET 9 x86       │   │ REST + WebSocket │   │ • Email (SMTP)        │
│ HTTP :5001       │   │ 30+ endpoints    │   │ • Webhook (Slack/     │
│                  │   │                  │   │   Teams)              │
│ Legacy 32-bit    │   │ State queries     │   │ • File share (JSON/   │
│ DLL bridge to    │   │ Config management │   │   LOG)               │
│ Datasheet        │   │ Telemetry history │   │ • Browser push        │
│ Manager          │   │ Evaluation data   │   │ • Audio alarm synth   │
└──────────────────┘   └────────┬─────────┘   └──────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND :3000                                  │
│                                                                            │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────────┐ │
│  │ EkraCard   │ │SiplaceHub  │ │OvenAoiHub  │ │ SupervisorDashboard    │ │
│  │            │ │            │ │            │ │                        │ │
│  │ Printer    │ │ SX1 Status │ │ Oven       │ │ All 5 lines at once    │ │
│  │ Status     │ │ SX2 Status │ │ Status     │ │ Out-of-Order mgmt      │ │
│  │ Stencil ID │ │ SX3 Status │ │ AOI Status │ │ One-pager mode         │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────────┘ │
│                                                                            │
│  ┌────────────────────┐ ┌──────────────────┐ ┌────────────────────────┐  │
│  │ NotificationCenter │ │EfficiencyDashboard│ │ ControlSimulator       │  │
│  │                    │ │                  │ │                        │  │
│  │ Alert rule config  │ │ Per-station      │ │ Scenario injection     │  │
│  │ Channel mgmt       │ │ efficiency       │ │ Nominal/mismatch modes │  │
│  │ Test dispatch      │ │ Bottleneck       │ │ Training tool          │  │
│  │ History ledger     │ │ analysis         │ │                        │  │
│  └────────────────────┘ └──────────────────┘ └────────────────────────┘  │
│                                                                            │
│  WebSocket connection: ws://localhost:5000 (auto-reconnect)               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## State Management

### In-Memory State Cache (`SmbStateManager`)

Each production line maintains a state object containing:

```
LineState {
    line_name: string
    stations: {
        ekra:    EkraData   ← Program, stencil, timestamp
        siplace: [SX1, SX2, SX3]  ← Barcode, order
        rhem:    RhemData   ← Thermal profile
        aoi:     AoiData    ← Inspection program
    }
    idle_durations: per-station idle times
    weekend_mode: active/sleeping
    out_of_order: reason
    unit_flow: buffer snapshot
}
```

### Crash Recovery

- State persisted to JSON file every ~90 seconds via `state_snapshot.py`
- On restart, loads last saved state and resumes monitoring
- Processed file list preserved to avoid re-processing

---

## Data Flow (Detailed)

```
1. Machine writes XML telemetry → SMB share

2. SmtFilePoller discovers file (3s interval)
   ├── Pattern: *0000*.xml
   ├── Exclude: *response*, *copycontent*
   └── Deduplicate: skip previously processed files

3. SmtOrchestrator receives file path
   ├── Identify: which line? which station? (from folder path)
   ├── Parse: extract program/barcode/profile from XML
   │   ├── EKRA: program_name, stencil_id
   │   ├── SIPLACE: order_number, board_barcode
   │   ├── RHEM: thermal_profile_name
   │   └── AOI: inspection_program
   └── Store: update state cache

4. ValidationEngine evaluates state
   ├── Compare against master data (via Datenblatt bridge)
   ├── Calculate idle time (last file timestamp → now)
   ├── Determine Andon color (GREEN/AMBER/RED)
   └── Return validation result

5. Orchestrator acts on result
   ├── Update state cache
   ├── If color changed → trigger notifications
   ├── Broadcast via WebSocket → all connected dashboards
   └── Log to diagnosis logger

6. Frontend receives update
   ├── WebSocket event → state update
   ├── Re-render affected station card
   ├── Update Andon light color
   └── If new alert → show in notification panel

7. If weekend mode active:
   ├── Check last activity timestamp
   ├── If > 3 hours idle on weekend → sleep
   └── Resume Monday 07:00 automatically
```

---

## Notification Routing

| Channel | Implementation | Use Case |
|---------|---------------|----------|
| Email | Mock SMTP client | Structured alert with station details |
| Webhook | HTTP POST with rich card | Slack/Teams integration |
| File Share | JSON + LOG files on network share | Audit trail |
| Browser Push | Notification API | Immediate supervisor awareness |
| Audio Alarm | Web Audio API synthesiser | Critical alerts |

---

## Resilience Architecture

```
WatchdogMonitor
├── Folder health check (can we read the network share?)
├── Orchestrator heartbeat (is the main loop running?)
├── Thread health polling (are all threads alive?)
├── Auto-restart of crashed orchestrator
├── 7-day rolling incident log
└── WebSocket status broadcast → frontend WatcherStatus component
```
