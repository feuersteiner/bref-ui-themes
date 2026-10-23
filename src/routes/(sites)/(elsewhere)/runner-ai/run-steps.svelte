<script lang="ts">
	import { Icon } from '#lib/elsewhere/index.js';
	import { nodeStatus, type Run } from './run-state.svelte.js';
	let { run }: { run: Run } = $props();
	const icons = ['travel_explore', 'format_list_bulleted', 'description'] as const;
	const labels = { done: 'Done', running: 'Running', queued: 'Queued', cancelled: 'Cancelled' };
</script>

<ol aria-label="Run steps">
	{#each run.nodes as node, index (node.name)}
		{@const state = nodeStatus(run, index)}
		<li data-state={state}>
			<span data-icon
				><Icon
					name={state === 'done' ? 'check' : state === 'cancelled' ? 'close' : icons[index]}
				/></span
			>
			<div data-step>
				<div data-heading>
					<h3>{node.name}</h3>
					<span>{labels[state]}</span>
				</div>
				{#if state === 'done'}
					<details>
						<summary>View result</summary>
						<p>{node.output}</p>
					</details>
				{:else}
					<p>{node.purpose}</p>
				{/if}
				<div data-progress>
					<progress value={node.progress} max="100" aria-label={`${node.name} progress`}></progress>
					<span>{node.progress}%</span>
				</div>
			</div>
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		display: flex;
		gap: 18px;
		padding-block: 26px;
	}
	li + li {
		border-top: 1px solid var(--run-rule);
	}
	[data-icon] {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		flex-shrink: 0;
		border-radius: 12px;
		background: var(--run-tint);
		color: var(--color-primary);
		font-size: 23px;
	}
	[data-state='queued'] [data-icon],
	[data-state='cancelled'] [data-icon] {
		color: var(--color-muted);
		background: transparent;
	}
	[data-state='done'] [data-icon] {
		color: var(--color-success);
		background: color-mix(in srgb, var(--color-success) 8%, transparent);
	}
	[data-step] {
		flex: 1;
		min-width: 0;
	}
	[data-heading] {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}
	h3 {
		margin: 0;
		font-size: 15px;
		font-weight: 550;
	}
	[data-heading] > span {
		font-size: 12px;
		color: var(--color-muted);
	}
	p {
		margin: 7px 0 0;
		color: var(--color-muted);
		font-size: 13px;
		overflow-wrap: anywhere;
	}
	summary {
		width: fit-content;
		padding-block: 5px;
		color: var(--color-muted);
		cursor: pointer;
		font-size: 12px;
	}
	[data-progress] {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 16px;
	}
	[data-progress] span {
		width: 32px;
		flex-shrink: 0;
		text-align: right;
		font-size: 11px;
		color: var(--color-muted);
		font-variant-numeric: tabular-nums;
	}
	progress {
		appearance: none;
		display: block;
		width: 100%;
		height: 3px;
		border: 0;
		border-radius: 3px;
		overflow: hidden;
		background: var(--run-rule);
		color: var(--color-primary);
	}
	progress::-webkit-progress-bar {
		background: var(--run-rule);
	}
	progress::-webkit-progress-value {
		background: var(--color-primary);
		transition: width 250ms linear;
	}
	progress::-moz-progress-bar {
		background: var(--color-primary);
	}
	[data-state='done'] progress {
		color: var(--color-success);
	}
	[data-state='done'] progress::-webkit-progress-value {
		background: var(--color-success);
	}
	[data-state='done'] progress::-moz-progress-bar {
		background: var(--color-success);
	}
	@media (prefers-reduced-motion: reduce) {
		progress::-webkit-progress-value {
			transition: none;
		}
	}
	@media (max-width: 760px) {
		li {
			gap: 14px;
		}
	}
</style>
