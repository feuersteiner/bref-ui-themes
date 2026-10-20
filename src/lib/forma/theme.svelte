<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter/index.css';
	import '@fontsource-variable/bricolage-grotesque/index.css';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#252a26',
		secondary: '#775a44',
		background: '#ffffff',
		foreground: '#252a26',
		muted: '#666b65',
		success: '#356747'
	}}
>
	<ThemeModeToggle mode="light" />
	<Base />
	<div data-bref-theme="forma">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='forma']) {
		display: contents;
	}
	:global {
		[data-bref-theme='forma'] {
			--font-display: 'Bricolage Grotesque Variable', sans-serif;
		}
		[data-bref-theme='forma'] [role='tablist'] {
			border-color: color-mix(in srgb, var(--color-foreground) 24%, transparent);
		}
		[data-bref-theme='forma'] [role='tab'] {
			letter-spacing: -0.02em;
		}
		[data-bref-theme='forma'] [role='tab'][aria-selected='true'] {
			font-weight: 600;
			background: color-mix(in srgb, var(--color-secondary) 5%, transparent);
		}
	}
</style>
