# Basketly Browser Smoke Test

Date: 2026-08-24

The exported web build was served from the generated `dist` directory and opened successfully.

## Verified

- The first route resolved to `/sign-in` and rendered the Basketly first-run screen.
- The optional name field accepted `Alex`.
- Selecting **Open my list** navigated to `/`.
- The list route rendered the `List`, `Plan`, and `Insights` tabs.
- The empty state rendered with `Your list is clear` and a working `Plan an item` button.
- No visible runtime error appeared during the tested flow.

The browser test only covered the first-run and empty-list route. Native simulator/device behavior still requires platform toolchains outside the sandbox.

The planner smoke test also passed: the form accepted `Oats` with quantity `2`, the add action updated the planner totals to one pending item and two units, and the form reset to its defaults after saving.

The completion flow passed: the item moved out of the active list, the counters changed to `0 to shop · 1 done`, and the completed section appeared with controls to restore or delete the item.
