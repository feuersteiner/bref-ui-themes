# Bref-ui themes

Working Svelte demos built with [bref-ui](https://github.com/feuersteiner/bref-ui),
plus a workspace for full CLI-installed component themes.

[Explore the showcase](https://feuersteiner.github.io/bref-ui-themes/) ·
[Bref-ui documentation](https://feuersteiner.github.io/bref-ui/)

## Site palettes

Todo, House Shop and RunnerAI import their controls directly from `bref-ui`.
Relay, Forma and Elsewhere are palette names, not separate component libraries.
Their palette data lives in [src/routes/palettes.ts](src/routes/palettes.ts).

| Palette   | Site demo                                                              | Palette preview                                                             |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Relay     | [Todo](https://feuersteiner.github.io/bref-ui-themes/todo)             | [Relay](https://feuersteiner.github.io/bref-ui-themes/themes/relay)         |
| Forma     | [House Shop](https://feuersteiner.github.io/bref-ui-themes/house-shop) | [Forma](https://feuersteiner.github.io/bref-ui-themes/themes/forma)         |
| Elsewhere | [RunnerAI](https://feuersteiner.github.io/bref-ui-themes/runner-ai)    | [Elsewhere](https://feuersteiner.github.io/bref-ui-themes/themes/elsewhere) |

Todo includes projects, filters, task completion and editing. House Shop includes
product filtering, dialogs, cart quantities and simulated checkout. RunnerAI assesses
sample marketing copy through Setup, Run and Results, with workflow nodes, an
inspector and edits to a local draft. No external AI service is used.

Use the supported Bref palette API in an application:

```svelte
<script lang="ts">
	import { Theme, Button } from 'bref-ui';
</script>

<Theme palette={{ primary: '#375b86', background: '#f3f6fa' }}>
	<Button label="Create project" variant="filled" color="primary" />
</Theme>
```

The showcase keeps one `Theme` and the shared header mounted, changing the palette
with the active route. `bref-ui@2.2.3` writes document-wide palette tokens; multiple
independent palettes cannot be isolated with its public API. The shell's library
controls therefore use the active document palette. No demo-owned root tokens or
component style overrides are used. Layout and application content remain local.

## Package boundary

The former `bref-ui-themes/relay`, `/forma` and `/elsewhere` entries, and the root
`Relay`, `Forma` and `Elsewhere` namespaces, have been removed. Import controls and
`Theme` from `bref-ui` instead, and pass palette data to `Theme`.

Glassy is exported as the root `Glassy` namespace and through `bref-ui-themes/glassy`.
It owns 19 CLI-installed component entries plus the native ThemeModeToggle source,
with scoped styles and the native Bref component APIs. The site demos remain
palette-only. VS Code, New Paris and Crystal Code are developed in separate PRs.

## Glassy

[Try the Glassy gallery](https://feuersteiner.github.io/bref-ui-themes/themes/glassy).
Translucent surfaces, 32px frost and selected-pill treatments are implemented in
[src/lib/glassy](src/lib/glassy), with a fixed light palette scoped to its wrapper.
The gallery imports those same package sources and covers all 20 exports.

```svelte
<script lang="ts">
	import { Theme, Button } from 'bref-ui-themes/glassy';
</script>

<Theme>
	<Button label="Create a layer" variant="filled" color="primary" />
</Theme>
```

Exports: Theme, Icon, Button, Checkbox, TextInput, Surface, Popover, Combobox,
Dialog, Pill, PillGroup, PillChoiceGroup, Progress, Select, Spinner, Switch, Tabs,
TextArea, TreeView and ThemeModeToggle. Native attributes, bindings, snippets and
keyboard behavior follow `bref-ui@2.2.3`. The CLI does not include ThemeModeToggle;
that export retains the canonical native source. ThemeModeToggle controls document
metadata; the Glassy wrapper keeps its fixed light scheme. Font assets are imported
by the theme; component paint and palette tokens stay scoped to the wrapper.

## Development and checks

Use Bun 1.3.4+ and Node 24:

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run lint
bun run build
npm pack --ignore-scripts
```

`build` produces the static showcase in `build` and the package in `dist`, including
publint validation. No test script is defined. Source uses `bref-ui@^2.2.3`.

The Pages workflow deploys on pushes to `main`. To verify its base path locally:

```sh
BASE_PATH=/bref-ui-themes bun run build:site
BASE_PATH=/bref-ui-themes bun run preview
```

## Source

- [Site demos](<src/routes/(sites)>): application content and local layout.
- [Palette previews](<src/routes/(themes)>): canonical Bref controls with each palette.
- [Persistent shell](src/routes/+layout.svelte): one Theme, route palettes and mounted header.
- [Glassy gallery](<src/routes/(themes)/themes/glassy>): full CLI theme components and interactions.
- [Package root](src/lib/index.ts): full-theme exports.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Base components, their API and the CLI are
maintained in [bref-ui](https://github.com/feuersteiner/bref-ui).

Report issues through [GitHub Issues](https://github.com/feuersteiner/bref-ui-themes/issues)
or join [Discord](https://discord.gg/JpgQRTUsVS) and use the `bref-ui` channel.

[MIT](LICENSE).
