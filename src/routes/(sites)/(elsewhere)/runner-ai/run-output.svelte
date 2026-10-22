<script lang="ts">
	import type { Run } from './run-state.svelte.js';
	import RunSteps from './run-steps.svelte';
	import RunReport from './run-report.svelte';
	let { run }: { run: Run } = $props();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable work area needs keyboard access.) -->
<section aria-label="Run output" data-output tabindex="0">
	<div data-content>
		{#if run.status === 'completed'}
			<RunReport {run} />
			<details data-completed-steps>
				<summary>{run.nodes.length} steps completed</summary><RunSteps {run} />
			</details>
		{:else}
			<header>
				<p>Workflow</p>
				<h3>
					{run.status === 'queued'
						? 'Waiting to start'
						: run.status === 'cancelled'
							? 'Run cancelled'
							: 'Run in progress'}
				</h3>
			</header>
			<RunSteps {run} />
		{/if}
	</div>
</section>

<style>
	[data-output] {
		min-width: 0;
		min-height: 0;
		overflow-y: auto;
		padding: 42px clamp(24px, 3.5vw, 58px);
	}
	[data-content] {
		width: 100%;
		max-width: 550px;
		margin-inline: auto;
	}
	header {
		margin-block: 12px 24px;
	}
	header p {
		margin: 0 0 12px;
		font-size: 12px;
		color: var(--color-muted);
	}
	h3 {
		margin: 0;
		font-size: 25px;
		line-height: 1.35;
		font-weight: 450;
		letter-spacing: -0.7px;
	}
	[data-completed-steps] {
		margin-top: 34px;
		padding-top: 20px;
		border-top: 1px solid var(--run-rule);
	}
	summary {
		color: var(--color-muted);
		cursor: pointer;
		font-size: 12px;
		padding-block: 5px;
	}
	@media (max-width: 760px) {
		[data-output] {
			padding: 32px 24px 42px;
		}
	}
</style>
