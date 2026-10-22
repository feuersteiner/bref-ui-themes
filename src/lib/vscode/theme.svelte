<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme, ThemeModeToggle } from 'bref-ui';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		primary: '#3794ff',
		secondary: '#c586c0',
		background: '#1e1e1e',
		foreground: '#cccccc',
		muted: '#a0a0a0',
		info: '#9cdcfe',
		success: '#89d185',
		warning: '#cca700',
		error: '#f48771'
	}}
>
	<ThemeModeToggle mode="dark" />
	<div data-bref-theme="vscode">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='vscode']) {
		display: contents;
		--vscode-panel: #252526;
		--vscode-input: #3c3c3c;
		--vscode-border: #454545;
		--vscode-accent: #0078d4;
		--vscode-font-mono: Menlo, Monaco, Consolas, 'Droid Sans Mono', 'Courier New', monospace;
	}
	:global(:root body:has([data-bref-theme='vscode'])) {
		font:
			400 13px / 1.5 'Segoe UI',
			system-ui,
			sans-serif;
		font-synthesis: none;
	}
	:global {
		:root [data-bref-theme='vscode'] :where(button, input, select) {
			font: inherit;
		}
		:root [data-bref-theme='vscode'] :where(h1, h2, h3) {
			font-weight: 500;
		}
		:root [data-bref-theme='vscode'] :where(a) {
			color: var(--color-primary);
		}
		:root [data-bref-theme='vscode'] :focus-visible {
			outline-color: var(--color-primary);
			outline-offset: 2px;
		}
		:root [data-bref-theme='vscode'] .surface {
			--surface-border: var(--vscode-border);
			--surface-soft-strength: 14%;
		}
		:root [data-bref-theme='vscode'] .surface-primary.surface-filled {
			--surface-fill: var(--vscode-accent);
			--surface-content: #ffffff;
		}
		:root [data-bref-theme='vscode'] .button.surface-neutral {
			--surface-fill: #3a3d41;
			--surface-border: transparent;
			--surface-content: #cccccc;
			--surface-neutral-content: #cccccc;
		}
		:root [data-bref-theme='vscode'] dialog footer .button.surface-foreground.surface-filled {
			--surface-fill: var(--vscode-accent);
			--surface-content: #ffffff;
		}
		:root [data-bref-theme='vscode'] div.surface-secondary.surface-filled[data-size][data-wide] {
			--surface-fill: color-mix(in srgb, var(--color-secondary) 24%, var(--vscode-panel));
			--surface-content: #e3c4e1;
		}
		:root [data-bref-theme='vscode'] [role='tablist'] {
			--tabs-indicator-block-start: 0;
			border-color: var(--vscode-border);
			background: var(--vscode-panel);
		}
		:root [data-bref-theme='vscode'] [role='tab'] {
			min-height: 35px;
			padding: 8px 12px;
			border-inline-end: 1px solid var(--vscode-border);
			color: #a0a0a0;
			font-size: 13px;
			font-weight: 400;
		}
		:root [data-bref-theme='vscode'] [role='tab'] > i {
			background: var(--vscode-accent);
		}
		:root [data-bref-theme='vscode'] [role='tab'][aria-selected='true'] {
			background: var(--color-background);
			color: #ffffff;
		}
		:root [data-bref-theme='vscode'] [role='tab']:hover:not(:disabled) {
			background: #2d2d2d;
			color: #ffffff;
		}
		:root [data-bref-theme='vscode'] [role='tab']:focus-visible {
			outline: 1px solid var(--color-primary);
			outline-offset: -3px;
		}
		:root [data-bref-theme='vscode'] [role='tab']:disabled {
			color: var(--color-muted);
			opacity: 0.45;
		}
		:root [data-bref-theme='vscode'] [role='tab'][data-size='fill'] {
			flex-basis: 0;
			justify-content: center;
			padding-inline: 8px;
		}
		:root [data-bref-theme='vscode'] [role='tablist'][data-orientation='vertical'] {
			--tabs-indicator-inline-start: 0;
		}
		:root [data-bref-theme='vscode'] [role='tab'][data-orientation='vertical'] {
			border-inline-end: 0;
			border-block-end: 1px solid var(--vscode-border);
		}
		:root [data-bref-theme='vscode'] .button {
			border-radius: 2px;
			--internal-font-size: 0.8125rem;
			--internal-padding: 1rem;
		}
		:root [data-bref-theme='vscode'] .button[data-size='medium'] {
			--internal-height: 32px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='small'] {
			--internal-height: 28px;
			--internal-padding: 0.75rem;
		}
		:root [data-bref-theme='vscode'] .button[data-size='x-small'] {
			--internal-height: 24px;
			--internal-padding: 0.625rem;
		}
		:root [data-bref-theme='vscode'] .button[data-size='large'] {
			--internal-height: 40px;
			--internal-padding: 1.25rem;
		}
		:root [data-bref-theme='vscode'] .button[data-size='x-large'] {
			--internal-height: 48px;
			--internal-padding: 1.5rem;
		}
		:root [data-bref-theme='vscode'] .button[data-rounded] {
			border-radius: 50%;
		}
		:root [data-bref-theme='vscode'] div.surface:has(> input:not([type='range'])) {
			border-radius: 2px;
			background: var(--vscode-input);
			--internal-height: 32px;
			--internal-padding: 0.625rem;
		}
		:root [data-bref-theme='vscode'] div.surface[data-size='small']:has(> input) {
			--internal-height: 28px;
		}
		:root [data-bref-theme='vscode'] div.surface[data-size='large']:has(> input) {
			--internal-height: 40px;
		}
		:root [data-bref-theme='vscode'] .surface > input {
			font-size: 13px;
			font-weight: 400;
		}
		:root [data-bref-theme='vscode'] div.surface:has(> input[aria-invalid='true']) {
			border-color: var(--color-error);
		}
		:root [data-bref-theme='vscode'] button[aria-expanded]:has(> .surface > [data-chevron]) {
			border-radius: 2px;
			background: var(--vscode-input);
		}
		:root
			[data-bref-theme='vscode']
			button[aria-expanded]:has(> .surface > [data-chevron])
			> .surface {
			border-radius: 2px;
		}
		:root [data-bref-theme='vscode'] button[aria-expanded] > .surface > [data-value] {
			font-size: 13px;
			font-weight: 400;
		}
		:root [data-bref-theme='vscode'] [popover] button {
			border-radius: 2px;
		}
		:root [data-bref-theme='vscode'] [popover] > .surface,
		:root [data-bref-theme='vscode'] dialog[open] > .surface {
			border-radius: 3px;
			background: var(--vscode-panel);
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
		:root [data-bref-theme='vscode'] [popover] > .surface {
			box-shadow: 0 0 8px 2px #0000005c;
		}
		:root [data-bref-theme='vscode'] dialog[open] > .surface {
			border: 1px solid var(--vscode-border);
			box-shadow: 0 12px 36px #0008;
		}
		:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop {
			background: #0008;
			-webkit-backdrop-filter: none;
			backdrop-filter: none;
		}
		:root [data-bref-theme='vscode'] dialog header {
			padding: 16px 20px 0;
		}
		:root [data-bref-theme='vscode'] dialog header h2 {
			font-size: 18px;
		}
		:root [data-bref-theme='vscode'] dialog [data-content] {
			padding: 16px 20px;
		}
		:root [data-bref-theme='vscode'] dialog footer {
			padding: 0 20px 16px;
		}
		:root [data-bref-theme='vscode'] [data-checkbox] {
			border-radius: 2px;
		}
		:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked) {
			background: var(--vscode-accent);
			color: white;
		}
		:root [data-bref-theme='vscode'] div.surface[data-variant][data-color]:not(.button) {
			border-radius: 3px;
		}
		:root [data-bref-theme='vscode'] [role='radiogroup'] > li > div,
		:root [data-bref-theme='vscode'] [role='group'] > li > div {
			border-radius: 3px;
		}
		:root [data-bref-theme='vscode'] [data-seekable] progress {
			border-radius: 0;
		}
		:root [data-bref-theme='vscode'] [data-seekable='true'] > input + span {
			width: 10px;
			height: 18px;
			border: 0;
			border-radius: 0;
			background: var(--progress-fill);
			box-shadow: none;
		}
		@media (pointer: coarse) {
			:root [data-bref-theme='vscode'] [role='tab'] {
				min-height: 44px;
			}
			:root [data-bref-theme='vscode'] .button {
				--internal-target: 44px;
			}
			:root [data-bref-theme='vscode'] button[aria-expanded]:has(> .surface > [data-chevron]),
			:root [data-bref-theme='vscode'] div.surface:has(> input) {
				min-height: 44px;
			}
		}
		@media (forced-colors: active) {
			:root [data-bref-theme='vscode'] [role='tablist'],
			:root [data-bref-theme='vscode'] [role='tab'],
			:root [data-bref-theme='vscode'] dialog[open] > .surface,
			:root [data-bref-theme='vscode'] [popover] > .surface,
			:root [data-bref-theme='vscode'] .surface,
			:root [data-bref-theme='vscode'] .surface-primary.surface-filled,
			:root [data-bref-theme='vscode'] div.surface:has(> input),
			:root [data-bref-theme='vscode'] button[aria-expanded]:has(> .surface > [data-chevron]),
			:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked) {
				background: Canvas;
				color: CanvasText;
				border-color: ButtonText;
			}
			:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked) {
				background: Highlight;
				color: HighlightText;
			}
			:root [data-bref-theme='vscode'] :focus-visible {
				outline-color: Highlight;
			}
		}
	}
</style>
