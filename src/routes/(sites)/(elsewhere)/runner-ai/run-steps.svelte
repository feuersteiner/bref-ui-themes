<script lang="ts">
	import { Icon } from '#lib/elsewhere/index.js';
	import { samples } from './marketing-assessment.js';
	import { nodeStatus, type Run } from './run-state.svelte.js';
	let {
		run,
		selectedIndex,
		onSelect
	}: { run: Run; selectedIndex: number; onSelect: (index: number) => void } = $props();
	const labels = { done: 'Done', running: 'Running', queued: 'Queued', cancelled: 'Cancelled' };
</script>

<ol aria-label="Run steps" style={`--node-count: ${run.nodes.length}`}>
	{#each run.nodes as node, index (node.name)}
		{@const state = nodeStatus(run, index)}
		<li data-state={state} aria-current={state === 'running' ? 'step' : undefined}>
			<button
				type="button"
				data-node
				aria-pressed={selectedIndex === index}
				aria-controls="node-inspector"
				aria-label={`${node.name}, ${labels[state]}, ${node.progress}%`}
				onclick={() => onSelect(index)}
			>
				<span data-top>
					<span data-icon aria-hidden="true">
						<span data-visible={state === 'queued' || state === 'running'}
							><Icon name={samples[run.workflow].insights[node.insightIndex].icon} /></span
						>
						<span data-visible={state === 'done'}><Icon name="check" /></span>
						<span data-visible={state === 'cancelled'}><Icon name="close" /></span>
					</span>
					<span data-step-number>Step {index + 1}</span>
				</span>
				<span data-name>{node.name}</span>
				<span data-purpose>{node.purpose}</span>
				<span data-status aria-label={labels[state]}>
					{#each Object.entries(labels) as [value, label] (value)}
						<span data-visible={state === value} aria-hidden="true">{label}</span>
					{/each}
				</span>
				<span data-progress>
					<progress value={node.progress} max="100" aria-label={`${node.name} progress`}
					></progress><span>{node.progress}%</span>
				</span>
			</button>
		</li>
	{/each}
</ol>

<style>
	ol {
		--workflow-gap: 28px;
		display: grid;
		grid-template-columns: repeat(var(--node-count), minmax(0, 1fr));
		gap: var(--workflow-gap);
		width: 100%;
		max-width: calc(var(--node-count) * 188px + (var(--node-count) - 1) * var(--workflow-gap));
		list-style: none;
		margin: 32px auto;
		padding: 0;
	}
	li {
		--node-accent: var(--color-muted);
		--node-line: color-mix(in srgb, var(--color-primary) 30%, var(--run-surface));
		position: relative;
		min-width: 0;
	}
	li:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 100%;
		width: var(--workflow-gap);
		border-top: 1px solid var(--node-line);
		transition: border-color 240ms ease;
	}
	[data-state='running'] {
		--node-accent: var(--color-primary);
	}
	[data-state='done'] {
		--node-accent: var(--color-success);
		--node-line: color-mix(in srgb, var(--color-success) 50%, var(--run-surface));
	}
	button {
		position: relative;
		display: grid;
		grid-template-rows: 30px 36px 48px 16px 16px;
		align-content: start;
		gap: 7px;
		width: 100%;
		min-height: 208px;
		padding: 16px;
		border: 1px solid var(--run-line);
		border-radius: 16px;
		background: var(--run-surface);
		color: var(--color-foreground);
		text-align: left;
		font: inherit;
		cursor: pointer;
		box-shadow: 0 3px 5px color-mix(in srgb, var(--color-foreground) 3%, transparent);
		transition:
			border-color 240ms ease,
			box-shadow 240ms ease;
	}
	button[aria-pressed='true'] {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 8%, transparent);
	}
	button:hover {
		border-color: var(--color-primary);
	}
	button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 5px;
	}
	button::before,
	button::after {
		content: '';
		position: absolute;
		top: calc(50% - 4px);
		width: 8px;
		height: 8px;
		border: 1px solid var(--node-line);
		border-radius: 50%;
		background: var(--run-surface);
		transition: border-color 240ms ease;
	}
	button::before {
		left: -5px;
	}
	button::after {
		right: -5px;
	}
	li:first-child button::before,
	li:last-child button::after {
		display: none;
	}
	[data-top] {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}
	[data-icon] {
		display: grid;
		place-items: center;
		color: var(--node-accent);
		font-size: 28px;
		transition: color 240ms ease;
	}
	[data-icon] > span,
	[data-status] > span {
		grid-area: 1 / 1;
		opacity: 0;
		transition:
			opacity 220ms ease,
			transform 220ms ease;
	}
	[data-icon] > span {
		display: flex;
		transform: scale(0.8);
	}
	[data-icon] > [data-visible='true'],
	[data-status] > [data-visible='true'] {
		opacity: 1;
		transform: scale(1);
	}
	[data-step-number] {
		color: var(--color-muted);
		font-size: 10px;
	}
	[data-name] {
		font-size: 13px;
		line-height: 18px;
		font-weight: 600;
		overflow-wrap: anywhere;
	}
	[data-purpose] {
		color: var(--color-muted);
		font-size: 11px;
		line-height: 16px;
		overflow-wrap: anywhere;
	}
	[data-status] {
		display: grid;
		font-size: 11px;
		color: var(--node-accent);
		transition: color 240ms ease;
	}
	[data-progress] {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	[data-progress] > span {
		width: 5ch;
		flex-shrink: 0;
		text-align: right;
		font-size: 10px;
		color: var(--color-muted);
		font-variant-numeric: tabular-nums;
	}
	progress {
		appearance: none;
		display: block;
		min-width: 0;
		width: 100%;
		height: 3px;
		border: 0;
		border-radius: 3px;
		overflow: hidden;
		background: var(--run-rule);
		color: var(--node-accent);
	}
	progress::-webkit-progress-bar {
		background: var(--run-rule);
	}
	progress::-webkit-progress-value {
		background: var(--node-accent);
		transition:
			width 280ms linear,
			background-color 240ms ease;
	}
	progress::-moz-progress-bar {
		background: var(--node-accent);
		transition: background-color 240ms ease;
	}
	@container (max-width: 540px) {
		ol {
			--workflow-gap: 36px;
			grid-template-columns: minmax(0, 1fr);
			max-width: 220px;
			margin-block: 24px;
		}
		button {
			grid-template-rows: 30px 20px 32px 16px 16px;
			min-height: 184px;
		}
		li:not(:last-child)::after {
			top: 100%;
			left: 50%;
			width: 0;
			height: var(--workflow-gap);
			border-top: 0;
			border-left: 1px solid var(--node-line);
		}
		button::before,
		button::after {
			left: calc(50% - 4px);
			right: auto;
		}
		button::before {
			top: -5px;
		}
		button::after {
			top: auto;
			bottom: -5px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		li::after,
		button,
		button::before,
		button::after,
		[data-icon],
		[data-icon] > span,
		[data-status],
		[data-status] > span,
		progress::-webkit-progress-value,
		progress::-moz-progress-bar {
			transition: none;
		}
	}
	@media (forced-colors: active) {
		li[data-state] {
			--node-accent: CanvasText;
			--node-line: CanvasText;
		}
		button {
			border-color: CanvasText;
		}
		button[aria-pressed='true'] {
			border-color: Highlight;
			outline: 1px solid Highlight;
			outline-offset: -3px;
		}
		button:focus-visible {
			outline: 2px solid Highlight;
			outline-offset: 5px;
		}
		progress {
			color: Highlight;
			background: Canvas;
		}
	}
</style>
