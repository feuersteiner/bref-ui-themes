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
		primary: '#b73321',
		secondary: '#555a37',
		background: '#f4f0e9',
		foreground: '#242522',
		muted: '#68665e',
		info: '#325c78',
		success: '#3d6548',
		warning: '#805a19',
		error: '#a52832'
	}}
>
	<ThemeModeToggle mode="light" />
	<Base />
	<div data-bref-theme="new-paris">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='new-paris']) {
		display: contents;
		--font-text: 'Inter Variable', sans-serif;
		--font-display: 'Syne Variable', sans-serif;
		--np-rule: #d2cec4;
		--np-paper: #fcfaf5;
	}
	:global {
		[data-bref-theme='new-paris'] :is(h1, h2, h3) {
			font-family: var(--font-display);
			font-weight: 600;
			letter-spacing: -0.04em;
		}
		/* The second theme attribute keeps overrides above Svelte-scoped controls regardless of import order.
		   Native top-layer content remains a descendant of this wrapper. */
		[data-bref-theme='new-paris'][data-bref-theme]
			:is(.surface, .button[data-rounded], button, [data-checkbox], [data-disabled]) {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface {
			--surface-soft-strength: 10%;
			--surface-neutral-strength: 0%;
			--surface-border: var(--np-rule);
			--surface-highlight: 0 0 0 transparent;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface-filled {
			--surface-border: var(--surface-color);
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface-soft {
			--surface-border: color-mix(in srgb, var(--surface-color) 22%, var(--np-rule));
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			.surface:is(.surface-shadow-small, .surface-shadow-medium, .surface-shadow-large) {
			--surface-shadow: 5px 5px 0 color-mix(in srgb, var(--color-foreground) 14%, transparent);
		}
		[data-bref-theme='new-paris'][data-bref-theme] .glass.glass.glass {
			background: var(--glass-paint);
			box-shadow: var(--surface-shadow);
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .button {
			font-size: calc(var(--internal-font-size) * 0.88);
			font-weight: 600;
			letter-spacing: 0.015em;
			padding-block: 0.4rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			.button:not(:disabled, [aria-disabled='true']):active {
			translate: 0 1px;
		}
		[data-bref-theme='new-paris'][data-bref-theme] :is(input, [data-value]) {
			font-weight: 400;
			font-size: 0.875rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input) {
			background: var(--np-paper);
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-checkbox] {
			--internal-border: var(--color-muted);
			--internal-strength-light: 0%;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-checkbox]:has(:checked) {
			--internal-border: var(--color-primary);
			--internal-strength-light: 100%;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-checkbox]:has([aria-invalid='true']) {
			--internal-border: var(--color-error);
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-wide][data-color] {
			letter-spacing: 0.035em;
			font-size: 0.8125rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] ul[role] > li > div {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-value] {
			line-height: 1.4;
		}
		[data-bref-theme='new-paris'][data-bref-theme] button:has([data-value]) {
			background: var(--np-paper);
		}
		[data-bref-theme='new-paris'][data-bref-theme] [popover] button[aria-pressed='true'] {
			background: var(--color-foreground);
			color: var(--color-background);
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			[popover]
			button[aria-pressed='true']
			[data-check] {
			color: inherit;
		}
		[data-bref-theme='new-paris'][data-bref-theme] progress,
		[data-bref-theme='new-paris'][data-bref-theme] [data-unknown='true']::after {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] progress::-webkit-progress-value {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] progress::-moz-progress-bar {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-seekable] > span {
			border-radius: 0;
			box-shadow: none;
		}
		[data-bref-theme='new-paris'][data-bref-theme] dialog > [data-surface] {
			background: var(--np-paper);
			border: 1px solid var(--color-foreground);
		}
		[data-bref-theme='new-paris'][data-bref-theme] dialog::backdrop {
			background: color-mix(in srgb, var(--color-foreground) 30%, transparent);
		}
		[data-bref-theme='new-paris'][data-bref-theme] dialog header {
			padding-bottom: 1.5rem;
			border-bottom: 1px solid var(--np-rule);
		}
		[data-bref-theme='new-paris'][data-bref-theme] :focus-visible:not(input),
		[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input:focus-visible) {
			outline: 2px solid var(--color-primary);
			outline-offset: 4px;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input[aria-invalid='true']) {
			--surface-border: var(--color-error);
			outline-color: var(--color-error);
		}
		@media (prefers-reduced-motion: reduce) {
			[data-bref-theme='new-paris'][data-bref-theme] .button:active {
				translate: none;
			}
		}
		@media (forced-colors: active) {
			[data-bref-theme='new-paris'][data-bref-theme]
				:is(.surface, .glass.glass.glass, button:has([data-value])) {
				background: Canvas;
				color: CanvasText;
				border-color: CanvasText;
				box-shadow: none;
			}
			[data-bref-theme='new-paris'][data-bref-theme] [popover] button[aria-pressed='true'] {
				background: Highlight;
				color: HighlightText;
			}
			[data-bref-theme='new-paris'][data-bref-theme] :focus-visible:not(input),
			[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input:focus-visible) {
				outline-color: Highlight;
			}
		}
	}
</style>
