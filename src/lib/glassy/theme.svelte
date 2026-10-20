<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter/index.css';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#0068d9',
		secondary: '#716282',
		background: '#f5f6f7',
		foreground: '#20262e',
		muted: '#586470',
		success: '#237653',
		info: '#256a94',
		warning: '#8e651e',
		error: '#b33847'
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
			--font-display: -apple-system, BlinkMacSystemFont, 'Inter Variable', sans-serif;
		}
		body:has([data-bref-theme='glassy']) {
			background:
				radial-gradient(ellipse at 8% 12%, #8fabbc66, transparent 58%),
				radial-gradient(ellipse at 95% 65%, #c1b5a466, transparent 56%),
				linear-gradient(135deg, #dbe5eb, #eef0ed 48%, #c7d7df);
			font-family: -apple-system, BlinkMacSystemFont, 'Inter Variable', sans-serif;
		}
		[data-bref-theme='glassy'] .surface {
			--surface-neutral-strength: 0%;
			--surface-soft-strength: 14%;
			--glassy-paint: color-mix(in srgb, var(--surface-tint) var(--surface-strength), #ffffff);
			--glassy-opacity: 40%;
			--surface-border: #ffffff80;
			--surface-highlight: inset 0 1px 0 #ffffff99, inset 0 -1px 0 #24344208;
			--surface-shadow: 0 1px 3px #2434420a;
			--glassy-ink: var(--surface-color);
		}
		[data-bref-theme='glassy'] .surface-soft {
			--glassy-opacity: 56%;
			--surface-border: #ffffff99;
		}
		[data-bref-theme='glassy'] div:has(> input:checked) > .surface-soft {
			--surface-strength: 24%;
			--glassy-opacity: 82%;
			--surface-border: color-mix(in srgb, var(--surface-tint) 28%, transparent);
		}
		[data-bref-theme='glassy'] ul[role='radiogroup'] {
			--pill-group-gap: 2px;
			width: fit-content;
			padding: 4px;
			border-radius: 999px;
			background: #2434420a;
		}
		[data-bref-theme='glassy'] ul[role='radiogroup'] .surface {
			--glassy-paint: #ffffff;
			--glassy-opacity: 0%;
			--glassy-ink: var(--color-muted);
			--surface-border: transparent;
			--surface-highlight: 0 0 0 transparent;
			--surface-shadow: none;
		}
		[data-bref-theme='glassy'] ul[role='radiogroup'] div:has(> input:checked) > .surface {
			--glassy-opacity: 82%;
			--glassy-ink: var(--surface-color);
			--surface-border: #ffffff70;
			--surface-shadow: 0 2px 6px #24344210;
		}
		[data-bref-theme='glassy'] [role='tablist'] {
			gap: 2px;
			padding: 4px;
			border: 1px solid #ffffff80;
			border-radius: 1rem;
			background: #ffffff30;
			box-shadow: inset 0 1px 0 #ffffff66;
			-webkit-backdrop-filter: blur(24px) saturate(125%);
			backdrop-filter: blur(24px) saturate(125%);
		}
		[data-bref-theme='glassy'] [role='tab'] {
			border-radius: 0.75rem;
			color: var(--color-muted);
		}
		[data-bref-theme='glassy'] [role='tab'][aria-selected='true'] {
			background: #ffffffa8;
			color: var(--color-primary);
			box-shadow:
				inset 0 1px 0 #ffffffcc,
				0 2px 6px #24344210;
		}
		[data-bref-theme='glassy'] [role='tab'] > i {
			border-radius: 999px;
		}
		[data-bref-theme='glassy'] [role='tablist'] [role='tab']:focus-visible {
			outline-offset: -4px;
		}
		@media (hover: hover) {
			[data-bref-theme='glassy'] [role='tab']:not(:disabled):hover {
				background: #ffffff80;
				color: var(--color-primary);
			}
		}
		[data-bref-theme='glassy'] .surface-filled {
			--glassy-paint: var(--surface-fill);
			--glassy-opacity: 100%;
			--surface-border: #ffffff22;
			--glassy-ink: #ffffff;
			--surface-highlight: inset 0 1px 0 #ffffff30;
		}
		[data-bref-theme='glassy'] .surface-background {
			--surface-tint: var(--color-foreground);
			--surface-soft-strength: 4%;
			--glassy-ink: var(--color-foreground);
		}
		[data-bref-theme='glassy'] .surface-background.surface-filled {
			--surface-highlight: inset 0 1px 0 #ffffff;
		}
		/* Match Bref's explicit glass specificity, including top-layer surfaces. */
		[data-bref-theme='glassy'] :is(.surface, .glass.glass.glass) {
			background: var(--glassy-paint, #f5f6f7);
			color: var(--glassy-ink, var(--color-foreground));
			box-shadow: var(--surface-highlight), var(--surface-shadow);
		}
		[data-bref-theme='glassy'] [data-surface] {
			--surface-shadow: 0 10px 36px -16px #24344228;
		}
		[data-bref-theme='glassy'] .surface-shadow-small {
			--surface-shadow: 0 4px 12px -4px #24344220;
		}
		[data-bref-theme='glassy'] .surface-shadow-medium {
			--surface-shadow: 0 12px 32px -12px #24344230;
		}
		[data-bref-theme='glassy'] .surface-shadow-large {
			--surface-shadow: 0 24px 64px -20px #24344238;
		}
		[data-bref-theme='glassy'] .button.button {
			border-radius: 999px;
			font-weight: 500;
		}
		[data-bref-theme='glassy'] .button:not(.surface-filled)[aria-pressed='true'] {
			--glassy-paint: color-mix(in srgb, var(--color-primary) 16%, #ffffff);
			--glassy-ink: var(--color-primary);
			--glassy-opacity: 82%;
			--surface-border: color-mix(in srgb, var(--color-primary) 24%, transparent);
		}
		@media (hover: hover) {
			[data-bref-theme='glassy']
				.button.surface-filled:not(:disabled, [aria-disabled='true']):hover {
				--glassy-paint: color-mix(in srgb, var(--surface-color) 88%, #20262e);
				filter: none;
			}
		}
		[data-bref-theme='glassy'] .surface:has(> input) {
			border-radius: 0.85rem;
			--internal-placeholder: #65717c;
			--surface-border: #24344212;
			--surface-shadow: none;
			--glassy-opacity: 52%;
		}
		[data-bref-theme='glassy'] [data-value][data-placeholder] {
			color: #65717c;
		}
		[data-bref-theme='glassy'] :is(input, [data-value]) {
			font-weight: 400;
		}
		[data-bref-theme='glassy'] [data-checkbox] {
			box-shadow:
				inset 0 1px 0 #ffffff55,
				0 1px 2px #24344208;
		}
		[data-bref-theme='glassy'] [data-unknown] {
			--progress-track: color-mix(in srgb, var(--color-foreground) 12%, transparent);
		}
		[data-bref-theme='glassy'] [data-seekable] > .glass {
			--glassy-paint: #ffffff;
			--glassy-opacity: 90%;
			border-width: 2px;
		}
		[data-bref-theme='glassy'] progress {
			box-shadow: none;
		}
		[data-bref-theme='glassy'] [data-seekable]:has(input:disabled) {
			--progress-fill: #a0aeb9;
			filter: none;
		}
		[data-bref-theme='glassy'] dialog > [data-surface] {
			border-radius: 1.5rem;
			--glassy-opacity: 64%;
		}
		[data-bref-theme='glassy'] [popover] > [data-surface] {
			--glassy-opacity: 64%;
		}
		[data-bref-theme='glassy'] dialog footer .button.surface-foreground.surface-filled {
			--surface-color: var(--color-primary);
		}
		@media (max-width: 36rem) {
			[data-bref-theme='glassy'] dialog[open][data-size='full-screen'] {
				inset: 0;
				width: calc(100% - 2rem);
				height: fit-content;
				max-height: calc(100dvh - 2rem);
				margin: auto;
			}
			[data-bref-theme='glassy'] dialog[data-size='full-screen'] > [data-surface] {
				height: auto;
				max-height: calc(100dvh - 2rem);
			}
			[data-bref-theme='glassy'] [popover]:not([data-width='fill']) {
				margin-inline: 1rem;
				max-width: calc(100vw - 2rem);
			}
		}
		[data-bref-theme='glassy'] dialog[data-visible='true']::backdrop {
			background: #24344220;
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
				background:
					linear-gradient(135deg, #ffffff20, transparent 45%, #ffffff08),
					color-mix(in srgb, var(--glassy-paint, #f5f6f7) var(--glassy-opacity, 90%), transparent);
				-webkit-backdrop-filter: blur(32px) saturate(125%);
				backdrop-filter: blur(32px) saturate(125%);
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
				background: var(--glassy-paint, #f5f6f7);
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
		}
		@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
			[data-bref-theme='glassy'] [role='tablist'] {
				background: var(--color-background);
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
			[data-bref-theme='glassy'] [role='tab'][aria-selected='true'] {
				background: #ffffff;
			}
		}
		@media (forced-colors: active) {
			[data-bref-theme='glassy'] [role='tablist'],
			[data-bref-theme='glassy'] [role='tab'] {
				background: Canvas;
				color: CanvasText;
				border-color: CanvasText;
				box-shadow: none;
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
			[data-bref-theme='glassy'] [role='tab'][aria-selected='true'] {
				background: Highlight;
				color: HighlightText;
			}
			[data-bref-theme='glassy'] [role='tab']:disabled {
				color: GrayText;
			}
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
			[data-bref-theme='glassy'] [data-seekable]:has(input:disabled) {
				--progress-fill: GrayText;
			}
			[data-bref-theme='glassy'] :focus-visible:not(input):not(textarea),
			[data-bref-theme='glassy'] :is(.surface, [data-checkbox]):has(> input:focus-visible) {
				outline-color: Highlight;
			}
		}
	}
</style>
