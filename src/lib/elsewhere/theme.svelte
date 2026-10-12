<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/syne';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#6250aa',
		secondary: '#54697a',
		background: '#f7f7fb',
		foreground: '#292739',
		muted: '#686575',
		success: '#386852'
	}}
>
	<ThemeModeToggle mode="light" />
	<Base />
	<div data-bref-theme="elsewhere">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='elsewhere']) {
		display: contents;
	}
</style>
