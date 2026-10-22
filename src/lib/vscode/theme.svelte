<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Theme as BrefTheme } from 'bref-ui';
	let { children }: { children?: Snippet } = $props();
</script>

<BrefTheme
	palette={{
		light: {
			primary: '#4e5969',
			secondary: '#765d88',
			background: '#f0f0ee',
			foreground: '#35373c',
			muted: '#6a6d73',
			info: '#4e5969',
			success: '#53674c',
			warning: '#816b46',
			error: '#9e5e55'
		},
		dark: {
			primary: '#8aa7f8',
			secondary: '#bfb4cd',
			background: '#0c0d10',
			foreground: '#d9dade',
			muted: '#9fa1a8',
			info: '#8aa7f8',
			success: '#b3beac',
			warning: '#cbbda8',
			error: '#d4aaa3'
		}
	}}
>
	<div data-bref-theme="vscode">{@render children?.()}</div>
</BrefTheme>

<style>
	:global([data-bref-theme='vscode']) {
		display: contents;
		--vscode-panel: light-dark(#fbfbfa, #141519);
		--vscode-input: light-dark(#f0f0ee, #1c1e24);
		--vscode-well: light-dark(#f5f5f3, #17191e);
		--vscode-border: light-dark(#22252b09, #ffffff0a);
		--vscode-bright: light-dark(#17191c, #f5f5f7);
		--vscode-soft: light-dark(#e7e9ec, #20283a);
		--vscode-on-primary: light-dark(#fff, #0c1426);
		--vscode-overlay: light-dark(rgb(251 251 250 / 76%), rgb(23 25 31 / 78%));
		--vscode-overlay-muted: light-dark(#565a60, #b9bcc4);
		--vscode-veil: light-dark(rgb(240 240 238 / 4%), rgb(0 0 0 / 6%));
		--vscode-pane-shadow:
			0 7px 28px light-dark(#25252508, #00000020), 0 1px 4px light-dark(#25252505, #00000014);
		--vscode-widget-shadow: 0 3px 12px light-dark(#25252506, #00000012);
		--vscode-radius: 8px;
		--vscode-font-mono: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Courier New', monospace;
		--bref-overlay-duration: 100;
		--bref-appearance-duration: 100;
		--bref-appearance-lift: 3;
		--bref-overlay-lift: 4;
		--bref-overlay-scale: 0.99;
	}
	:global(:root body:has([data-bref-theme='vscode'])) {
		font:
			400 13px / 1.5 -apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
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
		:root [data-bref-theme='vscode'] :focus-visible {
			outline: 1px solid var(--color-primary);
			outline-offset: 3px;
		}
		:root [data-bref-theme='vscode'] .surface {
			--surface-hover: 0%;
			--surface-neutral-strength: 0%;
			--surface-soft-strength: 5%;
			--surface-border: transparent;
			--surface-base: var(--vscode-panel);
			--surface-neutral-content: var(--vscode-bright);
			transition: color 100ms ease;
		}
		:root [data-bref-theme='vscode'] .surface:is(:active, [data-surface-pressed='true']) {
			--surface-hover: 0%;
		}
		:root [data-bref-theme='vscode'] .surface-soft {
			--surface-content: var(--surface-color);
		}
		:root [data-bref-theme='vscode'] .button.surface-primary.surface-neutral {
			--surface-content: var(--color-foreground);
		}
		:root [data-bref-theme='vscode'] .surface-primary.surface-soft {
			--surface-fill: var(--vscode-soft);
		}
		:root [data-bref-theme='vscode'] .surface-primary.surface-filled {
			--surface-content: var(--vscode-on-primary);
		}
		:root [data-bref-theme='vscode'] .surface-background {
			--surface-content: var(--color-foreground);
		}
		:root [data-bref-theme='vscode'] .surface-background.surface-neutral {
			--surface-fill: var(--vscode-input);
		}
		:root [data-bref-theme='vscode'] .surface-background.surface-soft {
			--surface-fill: var(--vscode-well);
		}
		:root [data-bref-theme='vscode'] .surface[data-shadow] {
			--surface-shadow: var(--vscode-widget-shadow);
		}
		:root [data-bref-theme='vscode'] .button {
			border-radius: var(--vscode-radius);
			--internal-font-size: 13px;
			--internal-height: 34px;
			--internal-padding: 13px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='x-small'] {
			--internal-height: 24px;
			--internal-padding: 7px;
			--internal-font-size: 11px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='small'] {
			--internal-height: 28px;
			--internal-padding: 10px;
			--internal-font-size: 12px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='large'] {
			--internal-height: 40px;
			--internal-padding: 18px;
		}
		:root [data-bref-theme='vscode'] .button[data-size='x-large'] {
			--internal-height: 46px;
			--internal-padding: 22px;
			--internal-font-size: 14px;
		}
		:root [data-bref-theme='vscode'] .button[data-rounded] {
			border-radius: 50%;
		}
		:root
			[data-bref-theme='vscode']
			.button:is(:hover, :focus-visible, :active, [aria-pressed='true']) {
			filter: none;
		}
		:root [data-bref-theme='vscode'] .button:not(:disabled, [aria-disabled='true']):hover {
			color: var(--vscode-bright);
		}
		:root
			[data-bref-theme='vscode']
			.button.surface-filled:not(:disabled, [aria-disabled='true']):hover {
			color: var(--surface-content);
		}
		:root [data-bref-theme='vscode'] dialog footer .button.surface-foreground.surface-filled {
			--surface-fill: var(--color-primary);
			--surface-content: var(--vscode-on-primary);
		}
		:root [data-bref-theme='vscode'] div.surface:has(> input:not([type='range'])) {
			border-radius: var(--vscode-radius);
			background: var(--vscode-input);
			box-shadow: var(--vscode-widget-shadow);
			--internal-height: 36px;
			--internal-padding: 11px;
			--internal-placeholder: var(--color-muted);
		}
		:root [data-bref-theme='vscode'] div.surface[data-size='small']:has(> input) {
			--internal-height: 28px;
		}
		:root [data-bref-theme='vscode'] div.surface[data-size='large']:has(> input) {
			--internal-height: 40px;
		}
		:root [data-bref-theme='vscode'] .surface > input {
			font-size: 12px;
			font-weight: 400;
		}
		:root [data-bref-theme='vscode'] div.surface:has(> input[aria-invalid='true']) {
			border-color: var(--color-error);
		}
		:root [data-bref-theme='vscode'] button[aria-expanded]:has(> .surface > [data-chevron]) {
			border-radius: var(--vscode-radius);
			background: var(--vscode-input);
			box-shadow: var(--vscode-widget-shadow);
		}
		:root [data-bref-theme='vscode'] button[aria-expanded] > .surface:has(> [data-chevron]) {
			border-radius: var(--vscode-radius);
			background: transparent;
		}
		:root [data-bref-theme='vscode'] button[aria-expanded] > .surface > [data-value] {
			font-size: 12px;
			font-weight: 400;
		}
		:root [data-bref-theme='vscode'] [popover] button:has(> [data-label]) {
			background: transparent;
			color: var(--color-muted);
		}
		:root
			[data-bref-theme='vscode']
			[popover]
			button:has(> [data-label]):is(:hover, [aria-pressed='true']) {
			color: var(--vscode-bright);
		}
		:root [data-bref-theme='vscode'] [role='tablist'] {
			border: 0;
			background: transparent;
			gap: 8px;
		}
		:root [data-bref-theme='vscode'] [role='tab'] {
			min-height: 40px;
			border: 0;
			padding: 8px 12px;
			font-size: 12px;
			font-weight: 400;
			background: transparent;
		}
		:root [data-bref-theme='vscode'] [role='tab']:is(:hover, [aria-selected='true']) {
			background: transparent;
			color: var(--vscode-bright);
		}
		:root [data-bref-theme='vscode'] [role='tab'] > i {
			height: 1px;
		}
		:root [data-bref-theme='vscode'] [role='tab'][data-orientation='vertical'] > i {
			width: 1px;
			height: auto;
		}
		:root [data-bref-theme='vscode'] [role='tab'][data-size='fill'] {
			flex-basis: 0;
			justify-content: center;
		}
		:root [data-bref-theme='vscode'] [data-checkbox] {
			border-radius: 3px;
			background: var(--vscode-input);
		}
		:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked) {
			--internal-border: var(--color-primary);
			background: var(--color-primary);
			color: var(--vscode-on-primary);
		}
		:root [data-bref-theme='vscode'] [data-checkbox]:has(input:hover) {
			--internal-border: color-mix(in srgb, var(--color-foreground) 48%, var(--color-background));
		}
		:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked:hover) {
			--internal-border: var(--color-primary);
		}
		:root [data-bref-theme='vscode'] [data-checkbox]:has(input[aria-invalid='true']) {
			--internal-border: var(--color-error);
		}
		:root [data-bref-theme='vscode'] div.surface[data-color][data-size] {
			border-radius: var(--vscode-radius);
			--pill-choice-hover: 0%;
		}
		:root [data-bref-theme='vscode'] [data-removable] > button {
			background: transparent;
		}
		:root [data-bref-theme='vscode'] [data-removable] > button:hover {
			color: var(--vscode-bright);
		}
		:root [data-bref-theme='vscode'] .surface-filled[data-removable] > button:hover {
			color: var(--surface-content);
		}
		:root [data-bref-theme='vscode'] [data-seekable] progress {
			border-radius: 4px;
		}
		:root [data-bref-theme='vscode'] [data-seekable='true'] > input + span {
			width: 10px;
			height: 10px;
			border: 0;
			background: var(--progress-fill);
			box-shadow: none;
		}
		:root [data-bref-theme='vscode'] [data-seekable='true'] > input:is(:hover, :active) + span {
			transform: translate(var(--internal-thumb-offset, -50%), -50%);
			box-shadow: none;
		}
		:root [data-bref-theme='vscode'] .glass.glass.glass {
			--glass-blur: blur(32px);
			--glass-opacity: 78%;
			box-shadow: var(--vscode-widget-shadow);
		}
		:root [data-bref-theme='vscode'] [popover] {
			--internal-duration: 100ms;
		}
		:root [data-bref-theme='vscode'] [popover] > .surface,
		:root [data-bref-theme='vscode'] dialog > .surface {
			border-radius: 14px;
			background: var(--vscode-panel);
			color: var(--color-foreground);
			--color-muted: var(--vscode-overlay-muted);
			box-shadow:
				0 18px 70px #00000030,
				0 3px 12px #00000014;
		}
		:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop,
		:root [data-bref-theme='vscode'] [popover]::backdrop {
			background: var(--vscode-veil);
			-webkit-backdrop-filter: blur(1px);
			backdrop-filter: blur(1px);
			transition: opacity 100ms ease;
		}
		:root [data-bref-theme='vscode'] dialog header {
			padding: 22px 24px 8px;
		}
		:root [data-bref-theme='vscode'] dialog header h2 {
			font-size: 13px;
		}
		:root [data-bref-theme='vscode'] dialog [data-content] {
			padding: 18px 24px 24px;
		}
		:root [data-bref-theme='vscode'] dialog footer {
			padding: 0 24px 22px;
		}
		:root [data-bref-theme='vscode'] [popover]::backdrop {
			opacity: 0;
			transition:
				opacity 100ms ease,
				display 100ms allow-discrete,
				overlay 100ms allow-discrete;
		}
		:root [data-bref-theme='vscode'] [popover]:popover-open::backdrop {
			opacity: 1;
		}
		@starting-style {
			:root [data-bref-theme='vscode'] [popover]:popover-open::backdrop {
				opacity: 0;
			}
		}
		@supports (backdrop-filter: blur(1px)) {
			:root [data-bref-theme='vscode'] [popover] > .surface,
			:root [data-bref-theme='vscode'] dialog > .surface {
				background: var(--vscode-overlay);
				-webkit-backdrop-filter: blur(32px);
				backdrop-filter: blur(32px);
			}
		}
		@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
			:root [data-bref-theme='vscode'] .glass.glass.glass,
			:root [data-bref-theme='vscode'] [popover] > .surface,
			:root [data-bref-theme='vscode'] dialog > .surface {
				background: var(--vscode-panel);
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
			:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop,
			:root [data-bref-theme='vscode'] [popover]::backdrop {
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
		}
		@media (prefers-reduced-motion: reduce) {
			:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop,
			:root [data-bref-theme='vscode'] [popover]::backdrop {
				transition: none;
			}
			:root [data-bref-theme='vscode'] *,
			:root [data-bref-theme='vscode'] *::before {
				animation: none !important;
				transition: none !important;
			}
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
			:root [data-bref-theme='vscode'] dialog[data-visible]::backdrop,
			:root [data-bref-theme='vscode'] [popover]::backdrop {
				background: Canvas;
				-webkit-backdrop-filter: none;
				backdrop-filter: none;
			}
			:root [data-bref-theme='vscode'] .surface,
			:root [data-bref-theme='vscode'] .glass.glass.glass,
			:root [data-bref-theme='vscode'] dialog > .surface,
			:root [data-bref-theme='vscode'] [popover] > .surface,
			:root [data-bref-theme='vscode'] [data-checkbox] {
				background: Canvas;
				color: CanvasText;
				border-color: ButtonText;
				box-shadow: none;
				backdrop-filter: none;
			}
			:root [data-bref-theme='vscode'] [data-checkbox]:has(input:checked) {
				--internal-border: var(--color-primary);
				background: Highlight;
				color: HighlightText;
			}
			:root [data-bref-theme='vscode'] :focus-visible {
				outline-color: Highlight;
			}
		}
	}
</style>
