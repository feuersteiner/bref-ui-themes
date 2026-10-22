# Contributing to bref-ui-themes

- Communicate concisely. Stay within the requested scope and preserve unrelated work.
- Ask before large, unrequested changes. Never commit, push, publish or deploy without authorization.
- Use native Svelte and CSS. Preserve native semantics, keyboard access and reduced-motion preferences.
- Keep reusable themes and their components under `src/lib/<theme>`, with an `index.ts` exporting `Theme` and themed components.
- Keep site-specific content under `src/routes`. Separate complete site demos from theme demonstration routes.
- Demonstrations must use the same source as the library exports. Keep theme CSS in its component or route layout.
- Keep the shared header mounted during client navigation and verify theme styles do not leak between routes.
- Keep README commands, imports, previews and availability accurate. Mark unfinished themes WIP without broken links.
- Keep `AGENTS.md` and `CONTRIBUTING.md` identical.
