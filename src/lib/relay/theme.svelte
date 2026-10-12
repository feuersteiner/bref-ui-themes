<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter';
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
	}
</style>
