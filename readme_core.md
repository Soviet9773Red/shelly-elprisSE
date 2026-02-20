### Instance state codes (n.st)

Each instance maintains a numeric state code (`n.st`) that represents
its current operational status. These codes are not bitmasks - each
value represents a single, exclusive state.

| Code | Meaning |
| ---- | ------- |
| 0 | Config disabled in Setup |
| 1 | Manual command |
| 2 | Price below limit |
| 3 | Price above limit |
| 4 | High-price |
| 5 | Low-price |
| 6 | Price below always-ON limit |
| 7 | Safe mode, no prices |
| 8 | Emergency mode, no time |
| 9 | Manual override active until %s |
| 10 | Hourly override active |
| 11 | Price above always-OFF limit |
| 12 | Logic control lost |
| 13 | ON-time expired |
| 14 | ON-time delay active |
| 15 | Disabled Mon-Fri in Setup |
| 16 | Disabled Sat-Sun in Setup |

> NOTE: These are enum-like values, not bitmasks.
