# Migration verification

Verified on 2026-10-12. The reset commit is `5f2e8ca`; the following migration commit contains the scaffold, migrated demos and base Bref showcase. Human visual approval remains separate from automated validation.

## Provenance

| Source branch               | Revision  | Extracted content                                                       |
| --------------------------- | --------- | ----------------------------------------------------------------------- |
| `feat/relay-demo`           | `d6f6474` | Latest Relay site, shared shell/navigation, canonical component sources |
| `feat/forma-demo`           | `ac08815` | Forma-owned site files and photographic assets                          |
| `feat/elsewhere-demo`       | `a2e7f9d` | Elsewhere-owned site files                                              |
| `docs/live-demos`           | `774237f` | Reusable catalog descriptions and demo card structure only              |
| `fix/checkbox-motion`       | `63e2011` | Local checkmark motion and reduced-motion behavior                      |
| `feat/dialog-header-motion` | `0510350` | Keyed title/icon entrance transitions and reduced-motion behavior       |

Extraction used Git objects into temporary directories, without switching or editing the original repository. Its branch remains `feat/relay-demo` at `d6f6474`, with a clean workspace. All 16 photographic assets are byte-identical to their demo branches. The two behavior-fix components match their source revisions after CLI type import rewriting.

Bref 2.1.3's registry loader, dependency planner and installation pipeline copied the selected canonical sources into `src/lib/components`. The installation preview contained new files only. Necessary local dependencies remain there; unused default Theme companions were removed because implemented themes use Bref's public palette-aware Theme. Runtime controls use relative imports; package type imports stay on `bref-ui/types`.

## Validation

- `bun run check`: zero errors or warnings, including browser tests and preview tooling.
- `bun run lint`: formatting and ESLint pass without warnings.
- `bun run build`: static site and `svelte-package` library builds pass; publint reports no issues.
- `bun run test`: 30 passing tests in Chromium at desktop 1440×960 and mobile 390×664 CSS pixels (iPhone 13 emulation).
- Showcase: base `bref-ui` components/default Theme/styles and the original Bref logo; theme isolation returns to the default Bref palette.
- Rendered review: homepage, all sites, all theme demonstrations and Relay/Forma dialogs inspected; additional overflow checks at 320 pixels. Original photos, responsive arrangements, controls and native full-screen mobile dialogs are preserved.
- Browser coverage: seven routes, catalog links and WIP non-availability, lazy photos, skip-link focus, task completion/creation, modal tabbing/Escape/focus restoration, furniture dialogs/cart/checkout/header updates, audit validation/completion/review/stop, keyboard selection and reduced motion.
- Theme isolation: document reload verified with a window sentinel; Relay → Forma → Elsewhere → showcase → Relay demonstration restores the expected palette each time.
- `bun pm pack`: local npm tarball inspected. Four public entry points (`.`, `./relay`, `./forma`, `./elsewhere`) resolve to included JS/declaration files. No routes, site data, photos, catalog previews, tests, lockfiles or development tooling are included.
- Clean SvelteKit 3 consumer: installed the tarball through npm, resolved all namespace/subpath exports, checked types, built SSR/static output and exercised packaged dialog/checkbox behavior with no browser or asset errors.
- Documentation: `AGENTS.md` equals `CONTRIBUTING.md`; commands and local routes match the scaffold. README/catalog previews are real browser captures. `git diff --check` passes.

## Limits

- Liquid Glass and Minimalist Blocky remain WIP; no exports or demonstration routes exist.
- Relay, Forma and Elsewhere use light mode; VS Code uses dark mode. Themes use global Bref tokens/reset styles. One theme per document is supported; consumers must reload when switching themes.
- Demo state is temporary. Forma makes no purchase or payment; Elsewhere uses sample findings and fetches no website.
- Browser automation used Chromium, including mobile emulation; Safari, Firefox, real devices and screen-reader testing remain unverified.
- Rendered inspection is agent verification; human visual approval remains pending. No independent reviewer approval is claimed.
- The migration is delivered to the themes repository under user authorization. No npm publication or deployment was performed. Local tarballs, logs and review screenshots stay ignored under `verification-artifacts`; only catalog preview assets belong to site source.

## VS Code addition

- `bref-ui-themes/vscode` and the root `VSCode` namespace expose the same 14 components. `/themes/vscode` uses these library sources.
- Check, lint, library packaging/publint, default site build and the `/bref-ui-themes` Pages build pass. The expanded suite passes 38 desktop/mobile Chromium tests, including native selection, validation, tag removal, seeking, overlay focus/return, reduced motion, high contrast and theme reloads.
- The tarball contains VS Code JS/declarations and reusable source; site assets stay excluded. A fresh Vite/Svelte consumer passes type checks, production build, namespace/export identity checks and rendered dialog/popover/input interactions.
- Desktop, mobile and dialog previews are actual production browser captures. Latest main showcase/deployment changes are incorporated.
