<style>
	:global {
		html:has([data-bref-theme]),
		[data-bref-theme] :where(main, dialog, [data-scroll], [data-content]) {
			scroll-behavior: smooth;
			scroll-padding-block: 24px;
		}
		@media (prefers-reduced-motion: reduce) {
			html:has([data-bref-theme]),
			[data-bref-theme] :where(main, dialog, [data-scroll], [data-content]) {
				scroll-behavior: auto;
			}
		}
		body:has([data-bref-theme]) {
			font:
				400 14px/1.6 'Inter Variable',
				sans-serif;
			font-synthesis: none;
		}
		[data-bref-theme] h1,
		[data-bref-theme] h2,
		[data-bref-theme] h3 {
			font-weight: 500;
			line-height: 1.15;
		}
		[data-bref-theme] a:not(.surface) {
			color: inherit;
		}
		[data-bref-theme] button,
		[data-bref-theme] input,
		[data-bref-theme] select {
			font: inherit;
		}
		[data-bref-theme] button:not(:disabled),
		[data-bref-theme] summary {
			cursor: pointer;
		}
		[data-bref-theme] :focus-visible:not(input):not(textarea) {
			outline: 2px solid var(--color-primary);
			outline-offset: 4px;
		}
		[data-bref-theme] [role='tab']:focus-visible {
			outline-offset: -4px;
		}
		[data-bref-theme] img {
			display: block;
			max-width: 100%;
		}
		[data-bref-theme] main {
			min-width: 0;
		}
		[data-bref-theme] label {
			display: grid;
			gap: 8px;
		}
		[data-bref-theme] p {
			line-height: 1.7;
		}
		[data-bref-theme] [data-eyebrow] {
			font-size: 11px;
			letter-spacing: 0.13em;
			text-transform: uppercase;
			font-weight: 600;
		}
		[data-bref-theme] [data-muted] {
			color: var(--color-muted);
		}
		[data-bref-theme] [data-actions] {
			display: flex;
			align-items: center;
			gap: 12px;
			flex-wrap: wrap;
		}
		[data-bref-theme] [data-form] {
			display: grid;
			gap: 20px;
		}

		[data-bref-theme] [data-visually-hidden] {
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
	}
</style>
