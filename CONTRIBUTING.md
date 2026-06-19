# Contributing

Thank you for helping improve *The Establishment*.

## Before You Start

- Search existing issues before opening a new one.
- Use the bug or feature issue form when possible.
- Keep changes focused on one behavior or concern.
- For substantial rule or gameplay changes, open an issue before implementation.

## Local Development

1. Fork and clone the repository.
2. Create a branch from `master`.
3. Start the local server:

   ```bash
   python3 -m http.server 4173
   ```

4. Open `http://localhost:4173/webgame/`.

The application uses plain HTML, CSS, and JavaScript and has no build step.

## Code Guidelines

- Follow the existing code style.
- Keep gameplay rules and UI state changes easy to trace.
- Preserve responsive behavior.
- Avoid unrelated refactors in focused changes.
- Do not commit `.DS_Store` files or generated temporary files.

## Validation

Before submitting a pull request:

```bash
node --check webgame/app.js
git diff --check
```

Manually test the affected setup or gameplay flow in a browser.

## Pull Requests

- Describe what changed and why.
- Link related issues.
- Include clear manual test steps.
- Add screenshots for visible interface changes.
- Confirm that card assets and game rules still load from `__docs__/`.

By contributing, you agree that your contributions are licensed under the
repository's MIT License.
