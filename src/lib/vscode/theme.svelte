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
		:root [data-bref-theme='vscode'] .button {
			border-radius: 2px;
			--internal-font-size: 0.8125rem;
			--internal-padding: 0.75rem;
		}
		:root [data-bref-theme='vscode'] .button[data-size='medium'] {
			--internal-height: 32px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='small'] {
			--internal-height: 28px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='x-small'] {
			--internal-height: 24px;
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
		:root [data-bref-theme='vscode'] button[aria-expanded] {
			border-radius: 2px;
			background: var(--vscode-input);
		}
		:root [data-bref-theme='vscode'] button[aria-expanded] > .surface {
			border-radius: 2px;
		}
		:root [data-bref-theme='vscode'] [data-value] {
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
			backdrop-filter: none;
		}
		:root [data-bref-theme='vscode'] dialog[open] > .surface {
			border: 1px solid var(--vscode-border);
			box-shadow: 0 12px 36px #0008;
		}
		:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop {
			background: #0008;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
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
		:root [data-bref-theme='vscode'] [role='status'] {
			color: var(--color-primary);
		}
		@media (pointer: coarse) {
			:root [data-bref-theme='vscode'] .button {
				--internal-target: 44px;
			}
			:root [data-bref-theme='vscode'] button[aria-expanded],
			:root [data-bref-theme='vscode'] div.surface:has(> input) {
				min-height: 44px;
			}
		}
		@media (forced-colors: active) {
			:root [data-bref-theme='vscode'] dialog[open] > .surface,
			:root [data-bref-theme='vscode'] [popover] > .surface,
			:root [data-bref-theme='vscode'] .surface,
			:root [data-bref-theme='vscode'] .surface-primary.surface-filled,
			:root [data-bref-theme='vscode'] div.surface:has(> input),
			:root [data-bref-theme='vscode'] button[aria-expanded],
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
