# Verification

## Crystal Code separation — 2026-10-22

The modern workbench is a separate theme named `crystal-code`, exported through `bref-ui-themes/crystal-code` and the root `CrystalCode` namespace, with its own `/themes/crystal-code` demonstration and reference. The original `VSCode` namespace, `/vscode` subpath, palette and component gallery remain available. Full-page links keep document-level theme styles isolated.

PR #46 was restored with commit `25e2ceb`; its source tree is byte-identical to `4e99aca`. Check, lint and complete site/library builds pass for that restored tree. The separate Crystal Code PR builds on #46; both themes can coexist after merging it.

Private inherited motion recipes are enabled by Crystal Code only. Existing themes retain their default timing. All 15 component exports remain shared, and no existing public component contracts changed.

Fresh separation checks pass: `bun run check` (zero errors/warnings), `bun run lint`, `bun run build` (site, packaging, publint), and strict publint on the 85-file tarball. The tarball contains both theme entries among six public entry points and excludes routes, references and screenshots. Fresh npm SvelteKit and standalone Svelte/Vite consumers build and render both themes; all 15 root/subpath export identities and distinct Theme identities pass.

Rendered comparison verifies the original #1e1e1e background, 2px controls and opaque overlays alongside Crystal Code's #0c0d10 background, 8px controls and 32px/1px frosted overlays. Full-page navigation changes between them without palette leakage; Crystal Code also renders in light mode. Canonical sources, activation, native Escape and focus return work in both packaged consumers. Screenshots of both themes together and each individually remain outside tracked files. The earlier workbench checks covered the unchanged layout's dark/light matrices, 390px/320px layouts, native interactions and reduced-motion helper branches. Known limits remain: field/panel boundary contrast is 1.10:1; live preference emulation, mobile-overlay interaction, other browsers, real touch devices and screen readers remain unverified. Current screenshot upload is unavailable through the GitHub connector; captures stay outside tracked files.

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

## VS Code 2.2.0 update — 2026-10-21

PR #46 integrates the shared 0.1.0/Bref 2.2.0 baseline and the existing main fixes. All 15 VS Code exports remain available through the subpath and root namespace. Tabs comes from the shared copied source and retains public `bref-ui/types` imports. VS Code uses system UI type and has no bare font-package import requiring the baseline's `/index.css` correction.

The theme adds workbench-gray strips, blue top/side indicators, selected/hover/focus/disabled states, equal-width fill tabs and 44px coarse-pointer targets. The component reference replaces the editor strip with exported Tabs and adds horizontal fit/fill and vertical examples. Bound scope values and checkbox settings persist when switching; panel changes exercise `onChange`. Filled icons and custom indicator transitions retain reduced-motion handling.

Validation:

- `npm run check`: zero errors and warnings. `npm run lint`: formatting and ESLint pass.
- `npm run build:site` and `npm run package -- --pack false`: complete SSR/client/static and library builds pass; publint passes. `BASE_PATH=/bref-ui-themes npm run build:site` also passes.
- `npm pack --ignore-scripts`: the 79-file tarball contains all five public entry points and Tabs source/declarations, with version 0.1.0 and Bref peer range ^2.2.0. Site files, screenshots and test tooling are excluded. Strict publint on the tarball passes.
- A fresh npm-installed SvelteKit consumer checks public types, all 15 VS Code export identities and shared Tabs identity, then builds all four themed routes. Actual development SSR and production static/client renders verify initial HTML, hydration, bound content, `onChange`, keyboard selection, disabled skipping and assets.
- Production Chromium checks cover horizontal/vertical arrows, Home/End, wraparound, disabled skipping, one tab stop per strip, visible focus, Tab into the bound field, independent scope values, persistent settings, fit overflow, equal-width fill, hover, editor-section navigation and Pages catalog/navigation/assets. No browser errors or local asset failures occurred.
- Desktop, 390px and 320px layouts stay within the viewport. Touch emulation verifies 44px tab targets and tap selection. Reduced-motion emulation verifies default CSS and custom indicator completion; forced-colors emulation retains the focus outline.
- Cropped desktop/mobile Tabs renders were inspected and saved outside the repository. The available GitHub connector has no supported image-attachment upload method, so these new captures could not be embedded in the PR. Existing pre-Tabs previews remain historical.
- `git diff --check` and matching AGENTS/CONTRIBUTING checks pass. No test script exists, and removed test tooling was not restored.

Bun 1.3.4's launcher fails in this environment with `CouldntReadCurrentDirectory`; npm/direct Node equivalents were used. A successful default `bun run build` is not claimed. Firefox, Safari, real devices and screen readers remain unverified. No npm publication or PR merge was performed.

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

- Liquid Glass and Minimalist Blocky remain WIP; no exports or demonstration routes exist.
- Relay, Forma and Elsewhere use light mode; VS Code uses dark mode. Themes use global Bref tokens/reset styles. One theme per document is supported; consumers must reload when switching themes.
- Demo state is temporary. Forma makes no purchase or payment; Elsewhere uses sample findings and fetches no website.
- Browser automation used Chromium, including mobile emulation; Safari, Firefox, real devices and screen-reader testing remain unverified.
- Rendered inspection is agent verification; human visual approval remains pending. No independent reviewer approval is claimed.
- The migration is delivered to the themes repository under user authorization. No npm publication or deployment was performed. Local tarballs, logs and review screenshots stay ignored under `verification-artifacts`; only catalog preview assets belong to site source.

## VS Code addition

- `bref-ui-themes/vscode` and the root `VSCode` namespace expose the same 15 exports, including shared Tabs. `/themes/vscode` uses these library sources.
- Check, lint, library packaging/publint, default site build and the `/bref-ui-themes` Pages build pass. Browser automation previously covered native selection, validation, tag removal, seeking, overlay focus/return, reduced motion, high contrast and theme reloads. All tests and runner configuration were removed on 2026-10-13 at user request; no tests were run for the review fixes.
- The tarball contains VS Code JS/declarations and reusable source; site assets stay excluded. A fresh Vite/Svelte consumer passes type checks, production build, namespace/export identity checks and rendered dialog/popover/input interactions.
- Desktop, mobile and dialog previews are actual production browser captures. Latest main showcase/deployment changes are incorporated.

## PR #46 review fixes (2026-10-13)

- Added a responsive workbench frame with a 48px activity bar, five-section explorer, editor file strip and blue status bar reflecting activations and language.
- Corrected button proportions/neutral paint/dialog primary, muted filled secondary tags, seek thumb, monospace stack, overlay shadows and production backdrop property order. Select styling now targets its markup; consumer status regions keep their inherited color.
- Demo actions fit their labels; filled surfaces use the accent; the shadow specimen is accurately labelled; trailing space keeps the popover away from the viewport edge.
- All test files, runner configuration and the test command were removed. At that revision, Playwright remained as the browser dependency for preview captures; the later main cleanup has now been integrated and removes that dependency and capture script.
- Validation: type checks, lint, site/library builds, publint, Pages base-path build and clean consumer type/build checks pass. The local tarball includes all VS Code exports. Production Chromium inspection confirms backdrop blur is `none`, dialog primary uses the accent, select/popover shadows render, explorer/language updates work, and widths 1440/390/320 have no horizontal overflow. Previews were refreshed from production.

### Sidebar refinement

- The showcase uses Material Symbols icons, a 240px explorer, 22px nested tree rows, proportional UI filenames, compact folder paths, Open Editors/Outline disclosures, sticky navigation and bottom-anchored settings. Explorer visibility and file search are functional. Library theme exports are unchanged.
- Type/lint checks and site/library packaging pass. Production inspection confirms folder collapse, file search and sidebar toggling, with no horizontal overflow at 1440/390/320px and settings above the mobile status bar. All three VS Code previews were refreshed; no tests were used.
- Compared the sidebar against VS Code’s native interface and Explorer CSS (`explorerviewlet.css` confirms 22px rows). The workbench now uses the existing Material Icons component throughout; the Codicons dependency and attribution asset were removed.
