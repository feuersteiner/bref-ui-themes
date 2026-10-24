# Bref-ui themes

Reusable Svelte 5 themes and complete site demos, part of
[Bref-ui](https://github.com/feuersteiner/bref-ui). Each theme combines a palette,
fonts and component styling with native Svelte and CSS.

[![npm](https://img.shields.io/npm/v/bref-ui-themes?logo=npm)](https://www.npmjs.com/package/bref-ui-themes)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/JpgQRTUsVS)
[![MIT license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[Explore the showcase](https://feuersteiner.github.io/bref-ui-themes/) ·
[Bref-ui documentation](https://feuersteiner.github.io/bref-ui/)

## Get started

### Install the package

In an existing Svelte 5.57.1+ project, install the themes and their Bref-ui peer dependency:

```sh
npm install bref-ui-themes bref-ui
```

Then use a theme and its components in a `.svelte` file:

```svelte
<script lang="ts">
	import { Theme, Button } from 'bref-ui-themes/relay';
</script>

<Theme>
	<Button label="Create project" variant="filled" color="primary" />
</Theme>
```

Render one theme at the application root. The initial themes use light mode and
load document-wide palette tokens, reset styles and fonts. Mount one active theme at a time and clean up its global styles when switching. The showcase keeps its shared header mounted during client navigation. Fonts are package dependencies.

### Explore the gallery

Use Bun 1.3.4 or newer and Node 24:

```sh
git clone https://github.com/feuersteiner/bref-ui-themes.git
cd bref-ui-themes
bun install
bun run dev
```

Open the URL printed in the terminal. The gallery links to complete demo sites and
component demonstrations that import the same library exports available on npm.

## Available themes

| Theme     | Demo                                                                   | Components                                                                            |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Relay     | [Todo](https://feuersteiner.github.io/bref-ui-themes/todo)             | [Theme demonstration](https://feuersteiner.github.io/bref-ui-themes/themes/relay)     |
| Forma     | [House Shop](https://feuersteiner.github.io/bref-ui-themes/house-shop) | [Theme demonstration](https://feuersteiner.github.io/bref-ui-themes/themes/forma)     |
| Elsewhere | [RunnerAI](https://feuersteiner.github.io/bref-ui-themes/runner-ai)    | [Theme demonstration](https://feuersteiner.github.io/bref-ui-themes/themes/elsewhere) |

Todo includes projects, status tabs, search, completion and task editing. House Shop
includes category filters, sorting, product dialogs, a cart and simulated checkout.
RunnerAI assesses sample marketing copy through Setup, Run and Results, with connected workflow nodes, a node inspector and suggested edits that update a local draft. Execution is local and deterministic, with no external AI service.

![Relay rendered demo](static/previews/relay.jpg)
![Forma rendered demo](static/previews/forma.jpg)

VS Code, Liquid Glass and Minimalist Blocky remain planned. They have no package
exports or demo routes.

## Library imports

Choose a theme entry to import its `Theme` and components:

```ts
import { Theme, Button } from 'bref-ui-themes/relay';
// Or: import { Theme, Button } from 'bref-ui-themes/forma';
// Or: import { Theme, Button } from 'bref-ui-themes/elsewhere';
```

The package root also exports the `Relay`, `Forma` and `Elsewhere` namespaces.
Each theme exports `Theme`, `Button`, `Checkbox`, `Dialog`, `Icon`, `Pill`,
`PillChoiceGroup`, `PillGroup`, `Popover`, `Progress`, `Select`, `Spinner`, `Surface`,
`Tabs` and `TextInput`.

Current source requires Bref-ui `^2.2.3`. Tabs accepts `size="small" | "medium" | "large"` and horizontal `width="fit" | "fill"`; demo navigation uses small Tabs.

`Theme` accepts an optional `children` snippet. Controls retain their Bref-ui props,
native attributes and applicable bindings; shared types come from `bref-ui/types`.
The theme entry points include reusable styling and controls. Complete site layouts,
content and demo assets stay outside the published library.

## Local package and checks

```sh
bun run check
bun run lint
bun run build
npm pack --ignore-scripts
```

`build` produces both the static showcase in `build` and the library in `dist`,
including package validation. Use `bun run build:site` or `bun run package` to build
each separately. Packing creates `bref-ui-themes-<version>.tgz` without publishing.

The GitHub Pages workflow deploys the showcase on pushes to `main`. To reproduce
its project-path build locally:

```sh
BASE_PATH=/bref-ui-themes bun run build:site
BASE_PATH=/bref-ui-themes bun run preview
```

## Documentation and source

Use the [Bref-ui documentation](https://feuersteiner.github.io/bref-ui/) for the base
components and the theme demonstrations above for themed examples.

- [Theme entries](src/lib): each `src/lib/<theme>/index.ts` exports `Theme` and controls.
- [Component sources](src/lib/components): copied Bref-ui controls with shared types
  imported from `bref-ui/types`.
- [Shared styles](src/lib/shared): reusable theme styling.
- [Demo sites](<src/routes/(sites)>): complete sites and their shared demo shell.
- [Theme demonstrations](<src/routes/(themes)>): examples of each public theme entry.

See [verification.md](verification.md) for validation notes and remaining limitations.

## Community and contributing

For questions and examples, join [Discord](https://discord.gg/JpgQRTUsVS) and use the
`bref-ui` channel. Report theme bugs and suggest features through
[GitHub Issues](https://github.com/feuersteiner/bref-ui-themes/issues).

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines. Base components
and the component CLI are maintained in [bref-ui](https://github.com/feuersteiner/bref-ui).

## License

[MIT](LICENSE).
