<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	import Base from '../shared/base.svelte';
	import '@fontsource-variable/inter/index.css';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#171715',
		secondary: '#82735e',
		background: '#faf9f6',
		foreground: '#171715',
		muted: '#73716c',
		info: '#465367',
		success: '#526149',
		warning: '#7c642b',
		error: '#8c3f35'
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
		--font-display: 'Didot', 'Bodoni MT', 'Times New Roman', serif;
		--font-accent: var(--font-display);
		--np-label-size: 0.75rem;
		--np-label-tracking: 0.14em;
		--np-caption-size: 0.875rem;
		--np-rule: #d9d5cc;
		--np-paper: #ffffff;
	}
	:global {
		[data-bref-theme='new-paris'] :is(em, [data-accent]) {
			font-family: var(--font-accent);
			font-weight: 400;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-eyebrow] {
			font-size: var(--np-label-size);
			font-weight: 500;
			letter-spacing: var(--np-label-tracking);
			text-transform: uppercase;
		}
		[data-bref-theme='new-paris'] [data-caption] {
			font-size: var(--np-caption-size);
			color: var(--color-muted);
			line-height: 1.5;
		}
		[data-bref-theme='new-paris'] :is(h1, h2, h3) {
			font-family: var(--font-display);
			font-weight: 400;
			letter-spacing: -0.035em;
		}
		/* The second theme attribute keeps overrides above Svelte-scoped controls regardless of import order.
		   Native top-layer content remains a descendant of this wrapper. */
		[data-bref-theme='new-paris'][data-bref-theme]
			:is(.surface, .button[data-rounded], button, [data-checkbox], [data-disabled]) {
			border-radius: 0;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface {
			--surface-soft-strength: 7%;
			--surface-neutral-strength: 0%;
			--surface-border: var(--np-rule);
			--surface-highlight: 0 0 0 transparent;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface-filled {
			--surface-border: var(--surface-color);
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface-soft {
			--surface-border: transparent;
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			.surface:is(.surface-shadow-small, .surface-shadow-medium, .surface-shadow-large) {
			--surface-shadow: 0 12px 36px color-mix(in srgb, var(--color-foreground) 9%, transparent);
		}
		[data-bref-theme='new-paris'][data-bref-theme] .glass.glass.glass {
			background: var(--np-paper);
			box-shadow: var(--surface-shadow);
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .button[data-kind='normal'] {
			font-size: max(0.75rem, calc(var(--internal-font-size) * 0.88));
			font-weight: 500;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			padding-block: 0.4rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			.button:not(:disabled, [aria-disabled='true']):active {
			translate: 0 1px;
		}
		[data-bref-theme='new-paris'][data-bref-theme] :is(input, [data-value]) {
			font-weight: 400;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-size] > input,
		[data-bref-theme='new-paris'][data-bref-theme] button[data-size] [data-value] {
			font-size: 1rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-size='small'] > input,
		[data-bref-theme='new-paris'][data-bref-theme] button[data-size='small'] [data-value] {
			font-size: 0.875rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [data-size='large'] > input,
		[data-bref-theme='new-paris'][data-bref-theme] button[data-size='large'] [data-value] {
			font-size: 1.125rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input) {
			background: var(--np-paper);
			--surface-border: var(--np-rule);
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
		[data-bref-theme='new-paris'][data-bref-theme] [data-checkbox]:has(:disabled:not(:checked)) {
			background: var(--np-rule);
			border-color: var(--np-rule);
		}
		[data-bref-theme='new-paris'][data-bref-theme] div[data-wide][data-color] {
			letter-spacing: 0.06em;
			font-size: 0.8125rem;
			font-weight: 500;
			border-color: transparent;
		}
		[data-bref-theme='new-paris'][data-bref-theme] div[data-wide][data-color].surface-neutral {
			background: var(--color-background);
			border-color: var(--np-rule);
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
		[data-bref-theme='new-paris'][data-bref-theme] [popover] > .surface {
			--surface-shadow: 4px 4px 0 var(--color-foreground);
			border: 1px solid var(--color-foreground);
			filter: none;
		}
		[data-bref-theme='new-paris'][data-bref-theme]
			:is(.button[aria-pressed='true'], [popover] button[aria-pressed='true']),
		[data-bref-theme='new-paris'][data-bref-theme] ul[role] div:has(> input:checked) > .surface,
		[data-bref-theme='new-paris'][data-bref-theme]
			.button[data-variant='neutral']:not(:disabled, [aria-disabled='true']):hover {
			background: var(--color-foreground);
			color: var(--color-background);
			border-color: var(--color-foreground);
			filter: none;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tablist'] {
			--tabs-indicator-height: 3px;
			border-color: var(--np-rule);
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tablist'][data-orientation='vertical'] {
			--tabs-indicator-width: 3px;
			--tabs-indicator-height: auto;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tab'] {
			font-size: var(--np-label-size);
			letter-spacing: 0.08em;
			text-transform: uppercase;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tab'] > span[aria-hidden='true'] {
			font-size: 1.25rem;
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tab'][aria-selected='true'] {
			color: var(--color-foreground);
			background: var(--np-paper);
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tab']:hover:not(:disabled) {
			color: var(--color-foreground);
			background: color-mix(in srgb, var(--color-foreground) 7%, var(--color-background));
		}
		[data-bref-theme='new-paris'][data-bref-theme] [role='tab']:focus-visible {
			outline-offset: -5px;
		}
		[data-bref-theme='new-paris'][data-bref-theme] .button[aria-busy='true'] {
			background: var(--np-paper);
			color: var(--color-foreground);
			border-color: var(--color-foreground);
			box-shadow: inset 2px 0 0 var(--color-primary);
			opacity: 1;
			cursor: progress;
		}
		/* The CLI Spinner's first child is its decorative mark; checkbox marks follow an input. */
		[data-bref-theme='new-paris'][data-bref-theme]
			div:is([role='status'], [aria-hidden='true'])
			> span[aria-hidden='true']:first-child {
			padding: 0;
			mask: none;
			width: 65%;
			height: 65%;
			background: var(--color-primary);
			border: 0;
			border-radius: 0;
			animation: np-print 1s ease-in-out infinite alternate;
		}
		@keyframes np-print {
			to {
				opacity: 0.35;
				transform: scale(0.7);
			}
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
			border: 1px solid var(--np-rule);
		}
		[data-bref-theme='new-paris'][data-bref-theme] dialog::backdrop {
			background: color-mix(in srgb, var(--color-foreground) 30%, transparent);
		}
		[data-bref-theme='new-paris'][data-bref-theme] dialog header h2 {
			font-size: 2rem;
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
			[data-bref-theme='new-paris'][data-bref-theme]
				div:is([role='status'], [aria-hidden='true'])
				> span[aria-hidden='true']:first-child {
				animation: none;
			}
		}
		@media (forced-colors: active) {
			[data-bref-theme='new-paris'][data-bref-theme]
				:is(.surface, .glass.glass.glass, button:has([data-value]), .button[aria-busy='true']) {
				background: Canvas;
				color: CanvasText;
				border-color: CanvasText;
				box-shadow: none;
			}
			[data-bref-theme='new-paris'][data-bref-theme]
				:is(.button[aria-pressed='true'], [popover] button[aria-pressed='true']),
			[data-bref-theme='new-paris'][data-bref-theme] ul[role] div:has(> input:checked) > .surface,
			[data-bref-theme='new-paris'][data-bref-theme]
				.button[data-variant='neutral']:not(:disabled, [aria-disabled='true']):hover {
				background: Highlight;
				color: HighlightText;
			}
			[data-bref-theme='new-paris'][data-bref-theme] [role='tablist'] {
				border-color: ButtonBorder;
			}
			[data-bref-theme='new-paris'][data-bref-theme] [role='tab'][aria-selected='true'],
			[data-bref-theme='new-paris'][data-bref-theme] [role='tab']:hover:not(:disabled) {
				color: HighlightText;
				background: Highlight;
			}
			[data-bref-theme='new-paris'][data-bref-theme]
				div:is([role='status'], [aria-hidden='true'])
				> span[aria-hidden='true']:first-child {
				background: Highlight;
			}
			[data-bref-theme='new-paris'][data-bref-theme] :focus-visible:not(input),
			[data-bref-theme='new-paris'][data-bref-theme] .surface:has(> input:focus-visible) {
				outline-color: Highlight;
			}
		}
	}
</style>
