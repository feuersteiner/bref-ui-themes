<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter/index.css';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#375b86',
		secondary: '#695985',
		background: '#f3f6fa',
		foreground: '#263346',
		muted: '#59677b',
		success: '#326b58'
	}}
>
	<ThemeModeToggle mode="light" />
	<Base />
	<div data-bref-theme="relay">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='relay']) {
		display: contents;
	}
	:global {
		[data-bref-theme='relay'] .button {
			border-radius: 999px;
		}
		[data-bref-theme='relay'] [role='tablist'] {
			gap: 4px;
			padding: 4px;
			border: 0;
			border-radius: 16px;
			background: color-mix(in srgb, var(--color-primary) 6%, transparent);
		}
		[data-bref-theme='relay'] [role='tab'] {
			border-radius: 12px;
		}
		[data-bref-theme='relay'] [role='tab'][aria-selected='true'] {
			color: var(--color-primary);
			background: color-mix(in srgb, var(--color-background) 90%, white);
		}
	}
</style>
