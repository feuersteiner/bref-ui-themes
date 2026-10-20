# bref-ui-themes

Reusable Svelte 5 themes for [bref-ui](https://github.com/feuersteiner/bref-ui), with interactive demos and native CSS. Version 0.1.0 is an unpublished review candidate built on SvelteKit 3 and published Bref 2.2.0.

[Explore the showcase](https://feuersteiner.github.io/bref-ui-themes/) · [Bref documentation](https://feuersteiner.github.io/bref-ui/) · [Join Discord](https://discord.gg/JpgQRTUsVS)

## Local development

Requires Bun 1.3.4 or newer. The scaffold uses Svelte 5, SvelteKit 3, Vite 8 and `svelte-package` 3.

```sh
bun install
bun run dev                     # http://localhost:5173
bun run check
bun run lint
bun run package                 # library → dist; includes publint
bun run build:site              # static showcase → build
bun run build                   # site + library
bun run preview                 # preview the production site
bun pm pack                     # creates a local npm tarball; does not publish
```

The restored GitHub Pages workflow builds `build:site` on pushes to `main`, using the Pages base path and uploading `build`. To reproduce the project-path build locally:

```sh
BASE_PATH=/bref-ui-themes bun run build:site
BASE_PATH=/bref-ui-themes bun run preview # http://localhost:4173/bref-ui-themes/
```

## Showcase and demo sites

Open the [showcase](http://localhost:5173/). The showcase uses base `bref-ui` Theme, Button, Surface, Pill and Icon components, default palette/styles, documentation fonts and the Bref logo. Each card uses an actual browser screenshot and links to the working site. Every demo provides a Showcase link; navigation between themes reloads the document to avoid retaining global CSS.

| Demo          | Implemented interactions                                                                  | Site                                          | Theme demonstration                                         |
| ------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| Tasks         | Project creation/filtering, task status tabs, search, completion and task editing         | [/relay](http://localhost:5173/relay)         | [/themes/relay](http://localhost:5173/themes/relay)         |
| House Shop    | Category tabs, furniture sorting, product dialogs, cart quantities and simulated checkout | [/forma](http://localhost:5173/forma)         | [/themes/forma](http://localhost:5173/themes/forma)         |
| Site Reviewer | URL validation, simulated audit progress, history and finding review tabs                 | [/elsewhere](http://localhost:5173/elsewhere) | [/themes/elsewhere](http://localhost:5173/themes/elsewhere) |

![Tasks rendered demo](static/previews/relay.jpg)
![House Shop rendered demo](static/previews/forma.jpg)
![Site Reviewer rendered demo](static/previews/elsewhere.jpg)

**WIP:** VS Code and Liquid Glass are planned. They have no exports, demonstration routes or availability links.

## New Paris

New Paris is an editorial theme inspired by French couture: black and ivory, square controls, fine system-serif headings and tracked Inter labels. The exported theme includes the same typography, palette and control states as the demonstration. Original generated campaign photography and the editorial page layout belong only to the showcase. The [component demonstration](http://localhost:5173/themes/new-paris) covers all 14 public exports, variants, sizes, keyboard interactions, disabled/loading/error states, native dialogs/popovers and responsive layouts. It is a component showcase; no separate application demo is provided.

![New Paris rendered components](static/previews/new-paris.jpg)

```svelte
<script lang="ts">
	import { Theme, Button } from 'bref-ui-themes/new-paris';
</script>

<Theme>
	<Button label="Bonjour" variant="filled" color="primary" />
</Theme>
```

The theme intentionally gives rounded controls square edges and glass surfaces an opaque paper treatment. Bref bindings, props and native semantics are retained. Theme styles live in `src/lib/new-paris/theme.svelte`; the demonstration imports that same public entry. Headings use `--font-display` (Didot, Bodoni MT and Times New Roman system fallbacks); editorial accents use `--font-accent`; `data-accent`, `data-eyebrow` and `data-caption` apply reusable typography. Label size/tracking and caption size use `--np-label-size`, `--np-label-tracking` and `--np-caption-size`. Light mode, reduced motion and forced colors are supported. Mount one theme per document and reload when changing themes.

## Library imports

Install the local tarball with `bun add ./bref-ui-themes-0.1.0.tgz`. Consumers need Svelte `^5.57.1` and Bref `^2.2.0` (peer dependencies). Fonts used by the themes are package dependencies.

```svelte
<script lang="ts">
	import { Theme, Button } from 'bref-ui-themes/relay';
</script>

<Theme>
	<Button label="Create project" variant="filled" color="primary" />
</Theme>
```

The same API is available from each implemented theme:

```ts
import { Theme, Button } from 'bref-ui-themes/forma';
// Or: import { Theme, Button } from 'bref-ui-themes/elsewhere';
// Or: import { Theme, Button } from 'bref-ui-themes/new-paris';
// Namespace exports: import { Relay, Forma, Elsewhere, NewParis } from 'bref-ui-themes';
```

Each entry exports `Theme`, `Button`, `Checkbox`, `Dialog`, `Icon`, `Pill`, `PillChoiceGroup`, `PillGroup`, `Popover`, `Progress`, `Select`, `Spinner`, `Surface`, `Tabs` and `TextInput`. `Theme` takes an optional `children` snippet. Controls retain Bref's props, native attributes and applicable bindings; their types remain imported from `bref-ui/types`.

### Tabs

`Tabs` uses Bref 2.2.0's readonly item data, required icon names and bindable string value. The consumer renders the selected content:

```svelte
<script lang="ts">
	import { Theme, Tabs } from 'bref-ui-themes/relay';
	import type { TabItemDataProps } from 'bref-ui/types';
	let view = $state('overview');
	const items = [
		{ id: 'overview', label: 'Overview', icon: 'dashboard' },
		{ id: 'activity', label: 'Activity', icon: 'history' },
		{ id: 'reports', label: 'Reports', icon: 'monitoring', disabled: true }
	] as const satisfies readonly TabItemDataProps[];
</script>

<Theme>
	<Tabs {items} bind:value={view} label="Project views" />
	<div role="tabpanel" aria-label={items.find((item) => item.id === view)?.label} tabindex="0">
		{#if view === 'overview'}<p>8 tasks open, 3 completed.</p>
		{:else}<p>The navigation review was completed today.</p>{/if}
	</div>
</Theme>
```

Horizontal tabs accept `size="fit"` (default, scrolls on overflow) or `size="fill"`. Vertical tabs use `orientation="vertical"` without `size`. Optional `onChange`, `filled`, `transitionIn` and `transitionOut` retain the published API. Default indicator motion respects reduced motion; custom transitions should do the same. Arrow keys, Home and End move selection and skip disabled items. At small widths, horizontal tabs show the selected label, and vertical tabs show icons; accessible names remain available. Each theme demonstration includes fit, fill, vertical, disabled and bound-content examples.

These themes provide palettes, fonts, common CSS and component styling. They use light mode and document-global Bref tokens/reset styles; mount one theme per document and use full-page navigation when changing themes. Site-specific layouts and content are separate from the library.

## Source layout

- `src/lib/<theme>/index.ts`: public theme entry; each site's demo and theme demonstration consume it.
- `src/lib/components`: Bref CLI-copied controls and their local dependencies, with `bref-ui/types` imports preserved.
- `src/lib/shared`: common reusable theme styling.
- `src/routes/(sites)`: complete Tasks, House Shop and Site Reviewer sites and the latest shared demo shell.
- `src/routes/(themes)`: demonstrations of implemented public theme exports.
- `src/routes/catalog`: showcase content adapted from the reusable gallery.
- `static/demos`: original photographic assets; `static/previews`: rendered catalog previews. Neither is included in the npm package.

The migration preserves the local checkbox motion/reduced-motion fix and animated dialog title/icon updates. Only demo-owned files were extracted from their source branches; the latest Relay shared shell was kept. See [verification.md](verification.md) for source revisions, validation and remaining limitations.

Tabs was copied from the npm-installed Bref 2.2.0 source using its registry, dependency planner and preview/install pipeline. Existing Icon and Theme dependencies were retained. The preview added only `tabs/tabs.svelte` and `tabs/item.svelte`, with explicit approval for the shared barrel merge; no existing component source was overwritten. Tabs types remain public imports from `bref-ui/types`.
