## Browser Automation

Use `agent-browser` only when seeing or interacting with the rendered page is
necessary for the task.

Use `agent-browser` for:

- Explicit requests to open a page, inspect a page, take a screenshot, or test
  browser interaction.
- Reproducing or debugging a browser-only issue.
- Visual verification when a change affects layout, responsive behavior,
  scrolling, overlays, dialogs, or other UI that cannot be judged confidently
  from code alone.
- Checking accessibility snapshots or interactive element state when that is
  part of the requested outcome.

Do not use `agent-browser` just because a frontend file changed. Prefer static
inspection and local commands such as typecheck, lint, tests, or build for:

- Text, copy, and translation changes.
- Small style changes where the expected result is obvious from CSS.
- Non-interactive component refactors.
- Pure documentation or configuration edits.

Before using `agent-browser`, state briefly what visual or interaction question
it will answer. After using it, close the browser session.
