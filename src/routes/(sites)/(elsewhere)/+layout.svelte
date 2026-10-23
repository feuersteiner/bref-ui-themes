<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme } from '#lib/elsewhere/index.js';
	let { children }: { children: Snippet } = $props();
</script>

<Theme>
	<div data-elsewhere>{@render children()}</div>
</Theme>

<style>
	[data-elsewhere] {
		--monitor-rule: color-mix(in srgb, var(--color-primary) 14%, transparent);
		--run-rule: #e8e5ef;
		--run-line: #d2cbdc;
		--run-dot: #ded9e8;
		--run-surface: #fff;
		--run-tint: #eeebf5;
		--monitor-surface: rgb(255 255 255 / 82%);
		min-height: calc(100dvh - 119px);
		background: var(--color-background);
		color: var(--color-foreground);
		font:
			400 14px/1.6 'Inter Variable',
			sans-serif;
	}
	:global([data-elsewhere] :focus-visible) {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}
	:global([data-elsewhere] [data-visually-hidden]) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
	@media (max-width: 600px) {
		[data-elsewhere] {
			min-height: calc(100dvh - 160px);
		}
	}
	@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
		[data-elsewhere] {
			--monitor-surface: white;
		}
	}
</style>
