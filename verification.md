# Verification

## RunnerAI workspace and Bref 2.2.3 — 2026-10-24

- RunnerAI now assesses sample marketing copy. Setup, Run and Results separate configuration, the connected div-based workflow and actionable assessment results. Results stays disabled until completion; retry clears results. Node selection opens a floating inspector. Applying or undoing suggested edits updates the local draft.
- Rounded, padded surfaces separate history, the main area, its header and the inspector. Running history items use a spinner; Retry and Cancel use filled primary buttons, with a filled Cancel icon. Chat source remains available but is not rendered in the workspace.
- History, Setup, workflow, inspector and Results have explicit scroll ownership. The workspace follows the measured shared-header height. Header controls and tabs remain reachable at narrow and short viewport sizes. The duplicate View results button is removed.
- Svelte `in:fly` transitions cover the workspace surfaces and changing views. Reduced-motion guards zero both duration and offset; progress updates do not remount the surfaces or shared header.
- Published Bref 2.2.3 is installed and locked; peer/development requirements and copied Tabs match that version. Demo navigation uses small Tabs. Gallery examples cover small/medium/large sizing and the updated `width` contract. Dependency-worker checks include tarball inspection, clean Svelte/SvelteKit consumers and the Pages base-path build.
- The shared header reads bref/themes with Bref/ui attribution. Homepage copy explains the working demos and reusable design-system foundations.

Final integration checks: `npm run check` reports zero errors/warnings; `npm run lint`, `bun run build` (including packaging/publint) and `git diff --check` pass. Actual Codex browser inspection on the existing port 3000 covered Setup/Run/Results, run states, node selection, edit actions, keyboard reachability, 12-item history and 1440/1280px desktop, short viewports and 390/320px mobile layouts without document overflow or console errors. Captures remain outside Git. No server lifecycle operations were performed.

Limits: local sample simulation; historical catalog previews; runtime preference emulation, other browsers/devices, screen readers and human visual approval remain unverified. Fresh PR image attachment remains unavailable through the current tooling. Earlier verification sections describe previous iterations, including superseded chat and central-report layouts.

## PR #50 hardening — 2026-10-22

Feedback-to-result checklist, verified against the combined PR source:

- [x] Brands/routes: all three direct demo URLs and theme galleries return 200; retired `/relay`, `/forma` and `/elsewhere` return 404. Public theme source, exports, package metadata and dependencies are unchanged from main.
- [x] Shared navigation: production client round trips through all demos and galleries retain the same header controls, dark mode, 119px desktop height and 152px logo offset at 1440px. Each route restores its palette; history and skip-link focus pass. The mobile shop navbar stays below the measured shell with its cart reachable and collection heading clear after anchor scrolling settles.
- [x] Todo: rapid complete/reverse, filtered removal focus and tab Home/End pass at 320px. Duplicate project validation works; exactly four local covers load. A created project retains its chosen Launch icon and Lounge photo, and a new task is assigned to it. State remains temporary within the demo, as documented.
- [x] House Shop: keyboard/repeated detail adds keep the dialog open; detail and grid disable truthfully at 99. Removal resets both views to zero. Removal/decrement-to-empty restores meaningful focus, and checkout produces the correct receipt. Every current product has one finish; finish switching is not an available state and was not claimed as tested.
- [x] RunnerAI: fixed mobile focus loss when completion hides the chat and when backlog selection hides the run list. The automatic central report receives focus when needed, chat drafts survive, and completed chat remains accessible. A compiled-state regression reproduced an older retry jumping ahead of queued runs; retry now joins behind queued work. Compiled checks pass FIFO, per-step progress, cancel, retry/reset, conversation/draft isolation, the 12-run capacity and timer cleanup. Browser retry/cancel and automatic report focus pass.
- [x] Preview truthfulness: the catalog now visibly labels the earlier audit image and gives it accurate alternative text. No replacement screenshot assets were added. Older audit/custom-node and bulky grid-action requests remain superseded; upstream Tabs design remains tracked separately.

Validation: frozen-lockfile dependency installation, `npm run check` (zero errors/warnings), `npm run lint`, `npm run build:site`, `npm run package -- --pack false` (publint), the Pages base-path site build, instruction mirror equality and `git diff --check` pass. Bun's script launcher fails with `CouldntReadCurrentDirectory`, so successful Bun script execution is not claimed for this follow-up. No test script exists; the temporary compiled-state harness adds no project tooling or dependencies. Library source and package metadata are unchanged; clean-consumer and tarball validation were not repeated for these site-only fixes.

Rendered evidence uses this PR's isolated production preview in background Codex browser tabs, at 1440px desktop and 320/390px mobile widths. The existing port 3000 server was untouched. Current report-focus, product-detail, empty-cart, sticky-header and historical-preview crops remain outside Git. GitHub is signed out and the connector has no image-upload tool, so PR screenshot attachment remains unavailable. Preference emulation is unsupported by the available browser controls: reduced-motion, reduced-transparency and forced-colors rendering, other browsers/devices and screen readers remain unverified. Source review is not runtime preference coverage or human visual approval.

## Demo review — 2026-10-22

- Demo brands and routes now match: Todo at `/todo`, House Shop at `/house-shop`, and RunnerAI at `/runner-ai`. Previous demo URLs return 404; public library themes and `/themes/relay`, `/themes/forma`, `/themes/elsewhere` remain unchanged.
- The shared Bref header is owned by the root layout. Client navigation retains its mode and geometry; route palettes reset correctly. Content view transitions respect reduced motion. Scrollbar space is stable, native scrollbars are styled, and the header has restrained elevation.
- Todo has private status tabs, completion/reversal motion and project icon/four-cover selection. Browser checks covered keyboard selection, completion, project creation and dialog focus return.
- House Shop has a sticky Surface-glass navbar, minimal grid cart actions, persistent detail quantities, and animated removal/empty states. Repeated additions and final-item removal were verified, including focus on the empty-state heading.
- RunnerAI uses a simple linear step list with progress per execution, separate run conversations, a queue/backlog and an automatic icon-led central report. Queueing, cancellation, retry/reset, run switching, keyboard submission and mobile completion/report behavior were verified. Retired audit/monitoring and custom-canvas implementations were removed.
- `bun run check`: zero errors or warnings. `bun run lint`, `bun run build` (including packaging/publint), and `BASE_PATH=/bref-ui-themes bun run build:site` pass. Prerendered demo links resolve under the Pages base path. No test script exists.
- Rendered review used the existing development server on port 3000 without creating or restarting a server. Desktop/mobile captures remain outside Git. GitHub image attachment is unavailable because the browser is signed out and the connector has no upload tool. Human visual approval remains separate.
- Limits: deterministic local simulation, historical catalog thumbnails, and no Firefox/Safari, real-device or screen-reader coverage. Reduced-motion/forced-color rules were reviewed in source; runtime preference emulation was unavailable.

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
