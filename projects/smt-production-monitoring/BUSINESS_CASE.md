# Business Case — SMT Line Monitoring & Verification

## 1. Situation Analysis

### The Problem

Surface Mount Technology (SMT) assembly lines consist of 5-6 sequential machines:
1. **Solder Paste Printer** — Applies solder paste through a stencil
2. **Pick-and-Place Mounter SX1** — Places small components (resistors, capacitors)
3. **Pick-and-Place Mounter SX2** — Places medium components (ICs, connectors)
4. **Pick-and-Place Mounter SX3** — Places large/odd-form components
5. **Reflow Oven** — Melts solder to create permanent connections
6. **AOI Inspection** — Optical inspection of assembled boards

Each machine runs specific engineering programs that MUST match the master datasheet for the product. Mismatches cause:

| Station | Mismatch | Consequence |
|---------|----------|-------------|
| Printer | Wrong stencil | Incorrect solder paste deposition → shorts or opens |
| Pick-and-Place | Wrong component recipe | Wrong/missing components → functional failure |
| Reflow Oven | Wrong thermal profile | Cold joints or component damage |
| AOI | Wrong inspection program | Missed defects or false rejects |

### The Current State (Before Solution)

- Operators manually check program names against paper or spreadsheet references
- Verification occurs only at shift start or changeover — not continuously
- Mismatches detected only when defective boards appear at inspection or test
- Defect detection delay: hours (from assembly to test)
- No real-time visibility for supervisors across multiple lines

### The Business Cost of Mismatches

- **Scrap Cost** — Defective boards must be scrapped or reworked
- **Rework Labor** — Manual rework of defective boards
- **Production Delay** — Line stoppage while issue is investigated
- **Material Waste** — Components and PCBs wasted
- **Customer Risk** — Defects reaching customers if not caught

---

## 2. Business Objectives

| Objective | Target |
|-----------|--------|
| Eliminate program mismatch defects | Zero defects from program/recipe mismatches |
| Reduce detection delay | From hours to seconds |
| Provide real-time line visibility | Dashboard showing all 5 lines, all stations |
| Enable proactive response | Alerts before defective boards are produced |
| Reduce manual verification effort | Eliminate manual program checks |

---

## 3. Solution Approach

### Phase 1 — Data Collection (v1.0)
- Poll machine telemetry files from network shares
- Parse XML telemetry data (EKRA, SIPLACE, RHEM, AOI)
- Bridge to legacy datasheet management system

### Phase 2 — Validation & Dashboard (v2.0)
- Validation engine with 4 check types
- Andon-light dashboard (GREEN/AMBER/RED)
- Real-time WebSocket updates

### Phase 3 — Alerting & Resilience (v3.0+)
- 5-channel notification system
- Watchdog monitoring with auto-restart
- Weekend mode for autonomous operation
- Crash recovery with state persistence
- Simulation mode for demonstrations

---

## 4. Business Results

### Quantitative Impact

| Metric | Before | After |
|--------|--------|-------|
| Verification method | Manual, periodic | Automated, continuous |
| Detection delay | Hours | Seconds |
| Lines covered | 1 at a time (manual) | 5 simultaneously |
| Idle visibility | None | Per-station idle time tracking |
| Alert channels | None (verbal) | 5 automated channels |

### Qualitative Impact

- **Quality Assurance** — Continuous verification provides confidence in production quality
- **Supervisor Effectiveness** — Single dashboard replaces walking the floor for status checks
- **Faster Response** — Immediate alerts enable supervisor intervention before defects occur
- **Data-Driven Improvement** — Idle time and changeover analytics reveal optimization opportunities

---

## 5. Investment & ROI

### Development Investment
- 6+ months of iterative development
- Integration with legacy datasheet management system via .NET bridge
- Comprehensive testing with simulation mode

### Return on Investment
- Scrap reduction: each prevented mismatch saves boards, components, and labor
- Rework reduction: fewer defective boards requiring manual rework
- Visibility improvement: better resource allocation through idle time data
- Quality confidence: reduced risk of customer quality issues

---

## 6. Key Design Decisions

1. **Network Share Polling** — Chosen over direct machine API integration to avoid modifying production machine configurations
2. **Andon Light Model** — Simple GREEN/AMBER/RED per station; universally understood without training
3. **Weekend Mode** — Automatic sleep on weekends prevents unnecessary network traffic
4. **Watchdog Architecture** — Thread health monitoring ensures system reliability without human intervention
5. **Simulation Mode** — Built-in telemetry generator enables testing, training, and demonstrations without production machines
