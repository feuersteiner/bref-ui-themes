<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#174779',
		secondary: '#623f73',
		background: '#f3f7fc',
		foreground: '#162c46',
		muted: '#435971',
		success: '#17634f',
		info: '#1d567a',
		warning: '#80500b',
		error: '#9f2447'
	}}
>
	<ThemeModeToggle mode="light" />
	<Base />
	<div data-bref-theme="glassy">{@render children?.()}</div>
</BrefTheme>

<style>
	:global {
		[data-bref-theme='glassy'] {
			display: contents;
			--font-display: 'Inter Variable', sans-serif;
		}
		body:has([data-bref-theme='glassy']) {
			background:
				radial-gradient(ellipse at 4% 4%, #c7ddf7, transparent 52%),
				radial-gradient(ellipse at 100% 40%, #d8ceef, transparent 48%),
				radial-gradient(ellipse at 35% 100%, #cae9e4, transparent 55%), #edf3fa;
			background-attachment: fixed;
		}
		[data-bref-theme='glassy'] .surface {
			--surface-neutral-strength: 3%;
			--surface-soft-strength: 9%;
			--glassy-paint: color-mix(in srgb, var(--surface-tint) var(--surface-strength), #ffffff);
			--glassy-opacity: 66%;
			--surface-border: color-mix(in srgb, var(--surface-tint) 24%, #ffffff);
			--surface-highlight: inset 0 1px 0 #ffffff, inset 0 -1px 0 #ffffff66;
			--surface-shadow: 0 3px 12px #253f6510;
			--glassy-ink: var(--surface-color);
		}
		[data-bref-theme='glassy'] .surface-soft {
			--glassy-opacity: 78%;
		}
		[data-bref-theme='glassy'] .surface-filled {
			--glassy-paint: var(--surface-fill);
			--glassy-opacity: 96%;
			--glassy-ink: #ffffff;
			--surface-highlight: inset 0 1px 0 #ffffff55;
		}
		[data-bref-theme='glassy'] .surface-background {
			--glassy-ink: var(--color-foreground);
		}
		[data-bref-theme='glassy'] .surface-background.surface-filled {
			--surface-highlight: inset 0 1px 0 #ffffff;
		}
		/* Match Bref's explicit glass specificity, including top-layer surfaces. */
		[data-bref-theme='glassy'] :is(.surface, .glass.glass.glass) {
			background: var(--glassy-paint, #f3f7fc);
			color: var(--glassy-ink, var(--color-foreground));
			box-shadow: var(--surface-highlight), var(--surface-shadow);
		}
		[data-bref-theme='glassy'] .surface-shadow-small {
			--surface-shadow: 0 4px 12px #253f6518;
		}
		[data-bref-theme='glassy'] .surface-shadow-medium {
			--surface-shadow: 0 12px 32px -10px #253f6538;
		}
		[data-bref-theme='glassy'] .surface-shadow-large {
			--surface-shadow: 0 24px 64px -16px #253f6550;
		}
		[data-bref-theme='glassy'] .button.button {
			border-radius: 999px;
			font-weight: 500;
		}
		[data-bref-theme='glassy'] .button[aria-pressed='true'] {
			--glassy-paint: color-mix(in srgb, var(--color-primary) 16%, #ffffff);
		}
		[data-bref-theme='glassy'] .surface:has(> input) {
			border-radius: 0.85rem;
		}
		[data-bref-theme='glassy'] :is(input, [data-value]) {
			font-weight: 400;
		}
		[data-bref-theme='glassy'] [data-checkbox] {
			box-shadow:
				inset 0 1px 0 #ffffff80,
				0 2px 5px #253f6515;
		}
		[data-bref-theme='glassy'] progress {
			box-shadow: inset 0 1px 2px #253f6515;
		}
		[data-bref-theme='glassy'] dialog > [data-surface] {
			border-radius: 1.5rem;
			--glassy-opacity: 94%;
		}
		[data-bref-theme='glassy'] [popover] > [data-surface] {
			--glassy-opacity: 94%;
		}
		[data-bref-theme='glassy'] dialog[data-visible='true']::backdrop {
			background: #253f6533;
			-webkit-backdrop-filter: blur(8px);
			backdrop-filter: blur(8px);
		}
		[data-bref-theme='glassy'] :focus-visible:not(input):not(textarea),
		[data-bref-theme='glassy'] :is(.surface, [data-checkbox]):has(> input:focus-visible) {
			outline: 3px solid var(--color-primary);
			outline-offset: 3px;
		}
		[data-bref-theme='glassy'] .surface:has(> input[aria-invalid='true']) {
			border-color: var(--color-error);
			outline-color: var(--color-error);
		}
		@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
			[data-bref-theme='glassy'] :is(.surface, .glass.glass.glass) {
				background: color-mix(
					in srgb,
					var(--glassy-paint, #f3f7fc) var(--glassy-opacity, 90%),
					transparent
				);
				-webkit-backdrop-filter: blur(22px) saturate(140%);
				backdrop-filter: blur(22px) saturate(140%);
			}
		}
		@media (prefers-reduced-motion: reduce) {
			[data-bref-theme='glassy'] *,
			[data-bref-theme='glassy'] *::before,
			[data-bref-theme='glassy'] *::after {
				transition: none;
				animation: none;
			}
		}
		@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
			[data-bref-theme='glassy'] :is(.surface, .glass.glass.glass) {
				background: var(--glassy-paint, #f3f7fc);
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
		}
		@media (forced-colors: active) {
			body:has([data-bref-theme='glassy']) {
				background: Canvas;
			}
			[data-bref-theme='glassy'] :is(.surface, .glass.glass.glass, [data-checkbox], progress) {
				background: Canvas;
				color: CanvasText;
				border-color: CanvasText;
				box-shadow: none;
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
			[data-bref-theme='glassy'] [data-checkbox]:has(input:checked) {
				background: Highlight;
				color: HighlightText;
			}
			[data-bref-theme='glassy'] :focus-visible:not(input):not(textarea),
			[data-bref-theme='glassy'] :is(.surface, [data-checkbox]):has(> input:focus-visible) {
				outline-color: Highlight;
			}
		}
	}
</style>
