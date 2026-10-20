<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter/index.css';
	import '@fontsource-variable/syne/index.css';
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
	:global {
		[data-bref-theme='elsewhere'] [role='tablist'] {
			gap: 4px;
			padding: 4px;
			border: 1px solid color-mix(in srgb, var(--color-primary) 14%, transparent);
			border-radius: 14px;
			background: color-mix(in srgb, var(--color-background) 70%, transparent);
		}
		[data-bref-theme='elsewhere'] [role='tab'] {
			border-radius: 10px;
		}
		[data-bref-theme='elsewhere'] [role='tab'][aria-selected='true'] {
			color: var(--color-primary);
			background: color-mix(in srgb, var(--color-primary) 9%, transparent);
		}
	}
</style>
