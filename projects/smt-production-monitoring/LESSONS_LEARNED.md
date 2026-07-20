# Lessons Learned — SMT Line Monitoring & Verification

## Technical Lessons

### 1. Network Share Polling Works — But Needs Careful Design

Polling SMB network shares for XML files was chosen to avoid modifying production machine configurations. Key learnings:
- **Deduplication is critical** — Machines may write the same file multiple times
- **Pattern matching must be strict** — `*0000*.xml` with exclusions for `response` and `copycontent`
- **Folder health monitoring** — Network shares can become unavailable; the watchdog must detect this
- **3-second interval** — Fast enough for near-real-time, slow enough to avoid network load

### 2. The Andon Light Model Is Universally Understood

GREEN/AMBER/RED per station requires zero training. Operators and supervisors immediately understand the status. The simplicity of the model is its strength.

### 3. Weekend Mode Was an Unexpected Necessity

Initial versions ran 24/7, generating alerts on weekends when no production was running. Weekend mode (auto-sleep after 3 hours of inactivity on Sat/Sun, resume Monday 07:00) solved this elegantly and was one of the most appreciated features.

### 4. Crash Recovery Must Be Built In From Day One

Production environments are unpredictable. State persistence every ~90 seconds means that a crash loses at most 90 seconds of data. The watchdog monitor auto-restarts crashed threads, making the system self-healing.

### 5. The .NET Bridge Was the Right Architecture

Rather than attempting to reimplement the legacy DLL's functionality in Python, the bridge service pattern (separate .NET x86 process, HTTP communication) was clean, maintainable, and respected the existing system.

---

## Process Lessons

### 6. Build for Autonomy

A monitoring system should require zero human attention to operate. Weekend mode + watchdog + crash recovery + auto-restart = the system runs itself. This was a key design principle that paid off.

### 7. Simulation Mode Enables Everything

The built-in XML telemetry generator enabled:
- Development without access to production machines
- Testing all validation scenarios (mismatches, timeouts, edge cases)
- Demonstrations to stakeholders
- Training for operators

Without simulation mode, development would have been significantly slower.

### 8. Multi-Channel Alerting Prevents Blind Spots

A single notification channel (e.g., email) can fail or be ignored. Five independent channels (email, webhook, file share, browser push, audio) ensure that critical alerts are seen.

### 9. The Dashboard Design Matters

The Andon light dashboard was designed for a supervisor standing on the production floor, glancing at a monitor. Large colored indicators, minimal text, and clear status hierarchy make it glanceable from across the room.

---

## Business Lessons

### 10. Quality Problems Are Expensive

Every program mismatch that creates defective boards costs: scrap material, rework labor, production delay, and customer risk. Automated verification is not a "nice to have" — it directly impacts the bottom line.

### 11. Operators Appreciate Automation That Helps Them

The system was not perceived as "monitoring operators" but as "helping operators catch problems." This framing was important for adoption and trust.

### 12. Visibility Drives Improvement

Once idle time and changeover duration became visible, they became manageable. What gets measured gets improved.

---

## What I Would Do Differently

1. **Database Storage** — In-memory state with JSON persistence works, but a proper time-series database would enable richer analytics
2. **Machine Learning Integration** — Pattern recognition on idle patterns could predict issues before they occur
3. **Mobile Notifications** — A dedicated mobile app for push notifications would complement the browser-based alerts
4. **Multi-Site Architecture** — Designing for multiple factories from the start, not just multiple lines in one facility
