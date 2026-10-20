# Verification

## Glassy Tabs — 2026-10-21

Glassy integrates the shared 0.1.0/Bref 2.2.0 baseline and exports the same copied Tabs through `bref-ui-themes/glassy` and the root `Glassy` namespace. Its theme adds translucent strips, selected/hover/disabled/focus states, vertical styling and reduced-transparency/forced-color fallbacks. The existing collection now demonstrates all 15 exports, including horizontal fit/fill and vertical Tabs with independently bound content. Existing pill controls represent choices rather than content tabs and retain their behavior. The canonical Inter `/index.css` import supports clean SSR consumers.

Validated using direct Node/npm equivalents because the installed Bun 1.3.4 script launcher fails with `CouldntReadCurrentDirectory`:

- Svelte sync/check: zero errors or warnings. Prettier and ESLint pass.
- Root SSR/client/static build, Svelte package, npm-backed publint and Pages build with `BASE_PATH=/bref-ui-themes` pass.
- `npm pack --ignore-scripts`: 79-file 0.1.0 tarball contains Glassy, the shared Tabs source/declarations and all five package entries. Strict publint passes on the actual tarball; routes, screenshots and test tooling are absent.
- Clean npm-installed Svelte/Vite consumer: type check, production client build, production SSR build/render, all 15 named/namespace exports and interactive bound content pass.
- Actual browser checks at 1440px, 390px and 320px: horizontal/vertical selection, disabled skipping, Home/End, wraparound, roving Tab focus, visible inset focus, selected/hover states, fill sizing, mobile icon labels, strip scrolling without page overflow and bound content updates pass. Pages navigation/assets and interaction pass without browser errors.
- Cropped desktop/mobile Tabs screenshots are saved outside the repository. GitHub has no connector upload tool and the browser is signed out, so the new images could not be attached to the PR. Existing historical PR images remain identified as such.
- Reduced-motion CSS and the published indicator's media-query handling were checked in the packaged source. Runtime preference emulation, other browsers, real devices and screen readers remain unverified. No test script exists; no test suite was restored.

## Bref 2.2.0 and Tabs — 2026-10-21

The 0.1.0 candidate uses npm-installed `bref-ui@2.2.0`, with `^2.2.0` in both peer and development dependencies and the Bun lockfile. No sibling source was linked.

The published registry/dependency planner and preview/install pipeline copied only the Tabs entry into the existing component layout. Preview: add `tabs/tabs.svelte`, add `tabs/item.svelte`, conflict `index.ts`. The barrel merge was explicitly approved; existing Icon, Theme, checkbox, dialog and other control sources were retained. The two copied files are unchanged from CLI-prepared source and import public types from `bref-ui/types`.

All three public theme entries share Tabs through the component barrel. Theme CSS supplies Relay's soft blue strip, Forma's restrained underline and Elsewhere's violet inset strip. The demonstration route covers horizontal fit/fill, vertical, disabled items, filled icons, custom indicator transitions and consumer-owned bound panels. Live sites use the same themed exports for task status, product category and finding review filters.

Clean-consumer browser verification exposed a development SSR font-loading error. Explicit `/index.css` font imports in the three themes fix Vite's externalization of bare font-package imports without consumer configuration.

Validation:

- `bun install --frozen-lockfile --ignore-scripts`: lockfile and npm dependencies verified. Installed Bref reports 2.2.0.
- `npm run check`: zero errors or warnings. `npm run lint`: Prettier and ESLint pass.
- `npm run build:site`: SSR/client build and static prerender pass. `npm run package -- --pack false`: Svelte package and publint pass.
- `BASE_PATH=/bref-ui-themes npm run build:site`: Pages project-path build passes.
- `npm pack --ignore-scripts`: 0.1.0 tarball inspected; all four public entries and Tabs source/declarations are included. Site routes, photos, tests and development tooling are absent. Strict publint on the actual tarball passes.
- Clean SvelteKit 3 consumer: installed the tarball and Bref 2.2.0 through npm, checked all namespace/subpath exports and public types, built SSR/client/static output, and exercised all three packaged themes in the browser. Bindings, disabled skipping and `onChange` update rendered content.
- Rendered inspection: all three theme demonstrations and live sites at desktop and 320px widths. Horizontal overflow stays within the strip; fill stays within its parent; mobile labels/icons retain accessible names. A showcase grid sizing issue found at 320px was fixed.
- Keyboard inspection: horizontal and vertical arrows, Home/End, wraparound, disabled skipping, one tab stop per controlled strip, visible focus and Tab into the consumer-owned panel. Default and custom indicator transitions render. Live filters produce completed/open tasks, category products, reviewed findings and an empty reviewed view.
- `git diff --check` passes. `AGENTS.md` and `CONTRIBUTING.md` remain identical. No test script exists; the removed test suite was not restored. Tools, consumer files, tarballs and screenshots stay outside the repository.

Limits: Bun 1.3.4's package-script launcher fails here with `CouldntReadCurrentDirectory`, including default publint packing. npm script equivalents, disabled automatic packing and separate tarball inspection provide validation; a successful default `bun run build` is not claimed. Reduced-motion media rules and published indicator handling are preserved; runtime preference emulation, other browsers, real devices, screen readers and human visual approval remain unverified. No npm publication was performed.

## Historical migration verification

Verified on 2026-10-12. The reset commit is `5f2e8ca`; the following migration commit contains the scaffold, migrated demos and base Bref showcase. Human visual approval remains separate from automated validation.

Automated tests and their runner were removed on 2026-10-13. Validation uses checks, lint, builds and rendered inspection; the migration findings below remain historical.

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

- `bun run check`: zero errors or warnings, including preview tooling.
- `bun run lint`: formatting and ESLint pass without warnings.
- `bun run build`: static site and `svelte-package` library builds pass; publint reports no issues.
- Showcase: base `bref-ui` components/default Theme/styles and the original Bref logo; theme isolation returns to the default Bref palette.
- Rendered review: homepage, all sites, all theme demonstrations and Relay/Forma dialogs inspected; additional overflow checks at 320 pixels. Original photos, responsive arrangements, controls and native full-screen mobile dialogs are preserved.
- Browser coverage: seven routes, catalog links and WIP non-availability, lazy photos, skip-link focus, task completion/creation, modal tabbing/Escape/focus restoration, furniture dialogs/cart/checkout/header updates, audit validation/completion/review/stop, keyboard selection and reduced motion.
- Theme isolation: document reload verified with a window sentinel; Relay → Forma → Elsewhere → showcase → Relay demonstration restores the expected palette each time.
- `bun pm pack`: local npm tarball inspected. Four public entry points (`.`, `./relay`, `./forma`, `./elsewhere`) resolve to included JS/declaration files. No routes, site data, photos, catalog previews, tests, lockfiles or development tooling are included.
- Clean SvelteKit 3 consumer: installed the tarball through npm, resolved all namespace/subpath exports, checked types, built SSR/static output and exercised packaged dialog/checkbox behavior with no browser or asset errors.
- Documentation: `AGENTS.md` equals `CONTRIBUTING.md`; commands and local routes match the scaffold. README/catalog previews are real browser captures. `git diff --check` passes.

## Limits

- VS Code, Liquid Glass and Minimalist Blocky remain WIP; no exports or demonstration routes exist.
- Implemented themes are light-only and use global Bref tokens/reset styles. One theme per document is supported; consumers must reload when switching themes.
- Demo state is temporary. Forma makes no purchase or payment; Elsewhere uses sample findings and fetches no website.
- Browser automation used Chromium, including mobile emulation; Safari, Firefox, real devices and screen-reader testing remain unverified.
- Rendered inspection is agent verification; human visual approval remains pending. No independent reviewer approval is claimed.
- The migration is delivered to the themes repository under user authorization. No npm publication or deployment was performed. Local tarballs, logs and review screenshots stay ignored under `verification-artifacts`; only catalog preview assets belong to site source.
