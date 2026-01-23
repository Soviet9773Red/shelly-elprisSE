### Instance state codes (n.st)

Each instance maintains a numeric state code (`n.st`) that represents
its current operational status. These codes are not bitmasks - each
value represents a single, exclusive state.

| Code | Meaning |
| ---- | ------- |
| 0 | Disabled (configuration disabled by user) |
| 1 | Manual ON |
| 2 | Price below limit |
| 3 | Price above limit |
| 4 | Cheapest OFF |
| 5 | Cheapest ON |
| 6 | Forced ON (cheap) |
| 7 | Waiting for price data |
| 8 | Emergency mode |
| 9 | Forced override |
| 10 | Forced hour |
| 11 | Max price exceeded |
| 12 | Command changed |
| 13 | Max minutes reached |
| 14 | Inactive today (schedule restriction) |

> NOTE: These are enum-like values, not bitmasks.
