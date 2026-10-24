<script lang="ts">
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Button, Select, TextArea, Checkbox } from 'bref-ui';
	import { samples, workflows, copyLabels } from './marketing-assessment.js';
	import type { Run, RunConfig } from './run-state.svelte.js';
	let {
		run,
		onConfigure,
		onStart
	}: { run: Run; onConfigure: (config: RunConfig) => void; onStart: () => void } = $props();
	const sampleId = $props.id();
	const sample = $derived(samples[run.config.workflow]);
	const active = $derived(run.status === 'running' || run.status === 'queued');
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable setup needs keyboard access.) -->
<form
	aria-label="Assessment setup"
	tabindex="0"
	in:fly={{
		y: prefersReducedMotion.current ? 0 : 6,
		duration: prefersReducedMotion.current ? 0 : 180
	}}
	onsubmit={(event) => {
		event.preventDefault();
		onStart();
	}}
>
	<header>
		<p>Sample assessment</p>
		<h3>Setup</h3>
		<p>Choose a campaign and the copy to review.</p>
	</header>
	<label for={sampleId}>Sample campaign</label>
	<Select
		id={sampleId}
		items={samples.map((item, index) => ({ id: String(index), label: item.name }))}
		value={String(run.config.workflow)}
		disabled={active}
		onChange={(value) => onConfigure({ ...run.config, workflow: Number(value) })}
	/>
	<div data-brief>
		<p><strong>Audience</strong>{sample.audience}</p>
		<p><strong>Campaign brief</strong>{sample.context}</p>
	</div>
	<label
		>Copy to assess<TextArea
			value={workflows[run.config.workflow].prompt}
			rows={5}
			readonly
			wide
		/></label
	>
	<fieldset disabled={active}>
		<legend>Review scope</legend>
		<p>Select at least one check.</p>
		<div data-options>
			{#each sample.insights as insight (insight.field)}<label
					><Checkbox
						bind:checked={
							() => run.config.scope.includes(insight.field),
							(checked) =>
								onConfigure({
									...run.config,
									scope: checked
										? [...run.config.scope, insight.field]
										: run.config.scope.filter((field) => field !== insight.field)
								})
						}
					/><span>{insight.title}<small>{copyLabels[insight.field]}</small></span></label
				>{/each}
		</div>
	</fieldset>
	<footer>
		<Button
			type="submit"
			label={active ? 'Run in progress' : 'Start assessment'}
			icon={{ name: 'play_arrow', filled: true }}
			variant="filled"
			color="primary"
			size="small"
			disabled={active || !run.config.scope.length}
		/>
		<p>
			{active
				? 'Inputs are locked while this run is queued or running.'
				: 'Uses the supplied sample copy. Starting a new run replaces its previous results.'}
		</p>
	</footer>
</form>

<style>
	form {
		min-width: 0;
		min-height: 0;
		overflow: auto;
		overscroll-behavior: contain;
		scroll-padding: 8px;
		border-radius: var(--run-inner-radius);
		padding: 28px clamp(20px, 4vw, 48px) 36px;
		background: var(--run-surface);
		scrollbar-width: thin;
	}
	header,
	form > label,
	[data-brief],
	fieldset,
	footer {
		max-width: 720px;
		margin-inline: auto;
	}
	header {
		margin-bottom: 28px;
	}
	header p {
		margin: 0 0 10px;
		font-size: 12px;
		color: var(--color-muted);
		line-height: 1.7;
	}
	h3 {
		margin: 0 0 12px;
		font-size: 25px;
		font-weight: 550;
		letter-spacing: -0.6px;
	}
	form > label {
		display: grid;
		gap: 8px;
		margin-bottom: 24px;
		font-size: 12px;
		font-weight: 500;
	}
	form:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: -4px;
	}
	[data-brief] {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		margin-bottom: 24px;
	}
	[data-brief] p {
		margin: 0;
		color: var(--color-muted);
		font-size: 12px;
		line-height: 1.7;
	}
	strong {
		display: block;
		color: var(--color-foreground);
		margin-bottom: 6px;
		font-size: 11px;
		font-weight: 550;
	}
	fieldset {
		padding: 0;
		border: 0;
		margin-bottom: 28px;
	}
	legend {
		padding: 0;
		font-size: 12px;
		font-weight: 550;
	}
	fieldset > p {
		margin: 8px 0 16px;
		font-size: 11px;
		color: var(--color-muted);
	}
	[data-options] {
		display: flex;
		flex-wrap: wrap;
		gap: 20px 28px;
	}
	[data-options] label {
		display: flex;
		align-items: start;
		gap: 8px;
		font-size: 12px;
		cursor: pointer;
	}
	small {
		display: block;
		margin-top: 5px;
		color: var(--color-muted);
		font-size: 10px;
	}
	fieldset:disabled label {
		cursor: default;
		opacity: 0.6;
	}
	footer p {
		max-width: 440px;
		margin: 12px 0 0;
		color: var(--color-muted);
		font-size: 11px;
		line-height: 1.7;
	}
	@media (max-width: 760px) {
		[data-brief] {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
