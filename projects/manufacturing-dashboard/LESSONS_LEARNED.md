# Lessons Learned — Manufacturing Operations Dashboard

## Technical Lessons

### 1. Snapshot Architecture Was the Right Decision

Choosing to create timestamped snapshots instead of overwriting data proved invaluable. It enabled:
- Historical analysis and trend identification
- Change tracking between any two planning states
- Audit capability with complete data lineage
- Rollback capability if import errors occurred

This pattern is now my default approach for any system that receives periodic data updates.

### 2. SQLite Was Sufficient — and Better Than Expected

For a single-machine, locally-deployed dashboard serving 5-10 concurrent users, SQLite with WAL mode performed excellently. The decision to avoid PostgreSQL/MySQL eliminated:
- Database server installation and configuration
- Connection management complexity
- IT infrastructure dependencies

The trade-off was acceptable because the workload is read-heavy with infrequent writes (imports).

### 3. Vanilla JS Was Liberating

Choosing no frontend framework (no React, no Vue, no Angular) simplified:
- Development — no build step, no transpilation
- Maintenance — plain JavaScript, readable by anyone
- Distribution — single HTML file, no npm, no node_modules

The trade-off is that the codebase requires more discipline to keep organized. For a dashboard of this complexity, vanilla JS was the right call.

### 4. ApexCharts Was the Right Chart Library

Requirements were: interactive, server-side data, no CDN dependency, no framework requirement. ApexCharts met all of these with a clean API and good documentation.

### 5. Change Detection Is Harder Than It Looks

Comparing two snapshots to detect "what changed" seems straightforward until you encounter:
- Orders that appear in both snapshots but with different field values
- Orders that move between workstations and also change sequence
- Orders that are removed and re-added with different quantities
- Orders with identical descriptions but different internal IDs

The 9-type categorization emerged iteratively as edge cases were discovered.

---

## Process Lessons

### 6. Start with the Database Schema

The most important design decision was the database schema. Getting it right early (snapshots → production_plan → platforms_master → change_tracking) made everything else easier.

### 7. Build the API Before the UI

Developing the REST API first, with manual testing via browser/curl, allowed the backend to stabilize before the frontend was built. The API contract became the interface between data and presentation.

### 8. Filters Must Be Server-Side

Early versions filtered data in the browser. As the dataset grew, this became too slow. Moving all filtering to SQL queries was the single biggest performance improvement.

### 9. User Feedback Drives Features

The most valuable features (change tracking, heatmap, export) were not in the original design. They emerged from conversations with operators and managers about what would help them most.

---

## Business Lessons

### 10. Solve a Real Problem

The dashboard succeeded because it solved a real, daily pain point: "What do I build next?" and "What changed since yesterday?" Technology for technology's sake would have been ignored.

### 11. Self-Service Wins

Making the dashboard web-accessible (no installation, no login) meant anyone could use it. This drove adoption faster than any training program could have.

### 12. Visibility Creates Accountability

When everyone can see the same data, communication improves naturally. The dashboard became the shared reference point for production discussions.

### 13. Automate the Boring Parts

The import scheduler turned a manual "download CSV, run script" workflow into a background process. This small automation had outsized impact on reliability — data was always current.

---

## What I Would Do Differently

1. **Add User Authentication Earlier** — While the dashboard was internal-only, user-specific views and preferences would have added value
2. **More Aggressive Data Validation** — Early versions trusted input CSV format too much; validation should be strict from day one
3. **Structured Logging** — Debugging production issues was harder without structured logs; would implement from the start next time
4. **Automated Testing** — Relied too much on manual testing; API-level integration tests would have caught regressions earlier
5. **Configuration as Code** — Runtime configuration was spread across environment variables and hardcoded defaults; a proper config system would improve maintainability

---

## Patterns Worth Reusing

These patterns proved successful and will be used in future projects:

1. **Snapshot-based data versioning** — For any system with periodic data imports
2. **Server-side filtering** — All data operations in SQL, not JavaScript
3. **Self-contained distribution** — Single executable, zero dependencies
4. **API-first development** — Stable backend before complex frontend
5. **Iterative feature development** — Ship basics, then enhance based on feedback
