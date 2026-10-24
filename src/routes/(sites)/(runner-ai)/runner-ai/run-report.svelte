<script lang="ts">
	import { Button, Icon } from 'bref-ui';
	import { samples } from './marketing-assessment.js';
	import type { Run } from './run-state.svelte.js';
	let {
		run,
		onApply,
		onInspect
	}: { run: Run; onApply: (index: number) => void; onInspect: (index: number) => void } = $props();
	const sample = $derived(samples[run.workflow]);
	const insights = $derived(
		run.nodes.map((node) => ({
			insight: sample.insights[node.insightIndex],
			index: node.insightIndex
		}))
	);
	const remaining = $derived(
		insights.filter(({ insight }) => !run.applied.includes(insight.field)).length
	);
</script>

<article aria-label="Marketing assessment" data-report>
	<header>
		<div>
			<p data-eyebrow><Icon name="fact_check" /> Copy assessment</p>
			<h3 tabindex="-1">{sample.reportTitle}</h3>
		</div>
		<p data-count>
			{remaining ? `${remaining} edit${remaining === 1 ? '' : 's'} to review` : 'All edits applied'}
		</p>
	</header>
	<div data-assessment-layout>
		<section data-copy aria-label="Campaign draft">
			<p data-label>Sample campaign · {run.applied.length ? 'Edited draft' : 'Original draft'}</p>
			<h4>{run.copy.headline}</h4>
			<p data-body>{run.copy.body}</p>
			<p data-cta><Icon name="arrow_forward" /> {run.copy.cta}</p>
			<details>
				<summary>Campaign brief</summary>
				<p><strong>Audience</strong> {sample.audience}</p>
				<p>{sample.context}</p>
			</details>
			<p data-feedback role="status">
				{run.feedback || 'Suggested edits update this local draft.'}
			</p>
		</section>
		<section data-insights aria-label="Assessment insights and actions">
			<h4 data-label>Insights & suggested edits</h4>
			{#each insights as { insight, index } (insight.field)}
				{@const applied = run.applied.includes(insight.field)}
				<section data-insight data-applied={applied}>
					<span data-icon><Icon name={applied ? 'check_circle' : insight.icon} /></span>
					<div>
						<h5>
							{insight.title}
							{#if applied}<span data-applied-label>Applied</span>{/if}
						</h5>
						<p>{insight.rationale}</p>
						<blockquote>{insight.rewrite}</blockquote>
						<div data-actions>
							<Button
								label={applied ? 'Undo edit' : 'Apply edit'}
								aria-label={`${applied ? 'Undo' : 'Apply'} ${insight.title.toLowerCase()} edit`}
								size="x-small"
								variant={applied ? 'neutral' : 'filled'}
								color="primary"
								onClick={() => onApply(index)}
							/><Button
								label="Inspect copy"
								aria-label={`Inspect ${insight.title.toLowerCase()} copy`}
								size="x-small"
								variant="neutral"
								onClick={() => onInspect(index)}
							/>
						</div>
					</div>
				</section>
			{/each}
		</section>
	</div>
</article>

<style>
	article {
		container-type: inline-size;
		overflow-wrap: anywhere;
	}
	[data-copy],
	[data-insights] {
		min-width: 0;
	}
	header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 24px;
	}
	[data-eyebrow] {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 10px;
		color: var(--color-success);
		font-size: 11px;
		font-weight: 500;
	}
	h3 {
		margin: 0;
		font-size: clamp(21px, 2vw, 26px);
		line-height: 1.3;
		font-weight: 550;
		letter-spacing: -0.7px;
	}
	[data-count] {
		margin: 0;
		flex-shrink: 0;
		color: var(--color-muted);
		font-size: 11px;
	}
	[data-assessment-layout] {
		display: grid;
		grid-template-columns: minmax(220px, 0.85fr) minmax(0, 1.3fr);
		gap: 48px;
	}
	[data-label] {
		margin: 0 0 16px;
		color: var(--color-muted);
		font-size: 11px;
		font-weight: 500;
	}
	[data-copy] {
		position: static;
		align-self: start;
	}
	[data-copy] h4 {
		margin: 0;
		max-width: 340px;
		font-size: 21px;
		line-height: 1.45;
		font-weight: 550;
		letter-spacing: -0.4px;
	}
	[data-body] {
		margin: 14px 0;
		color: var(--color-muted);
		font-size: 13px;
		line-height: 1.8;
	}
	[data-cta] {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 20px 0;
		color: var(--color-primary);
		font-size: 12px;
		font-weight: 550;
	}
	details {
		margin-top: 28px;
		color: var(--color-muted);
		font-size: 11px;
		line-height: 1.7;
	}
	summary {
		cursor: pointer;
		padding-block: 6px;
	}
	details p {
		margin: 8px 0;
	}
	strong {
		display: block;
		color: var(--color-foreground);
		font-weight: 500;
	}
	[data-feedback] {
		margin: 20px 0 0;
		min-height: 32px;
		color: var(--color-muted);
		font-size: 11px;
		line-height: 1.7;
	}
	[data-insight] {
		display: grid;
		grid-template-columns: 20px minmax(0, 1fr);
		gap: 12px;
		margin-bottom: 30px;
	}
	[data-icon] {
		color: var(--color-primary);
		font-size: 18px;
	}
	h5 {
		margin: 0 0 8px;
		font-size: 13px;
		font-weight: 600;
		line-height: 1.5;
	}
	[data-applied-label] {
		margin-left: 8px;
		color: var(--color-success);
		font-size: 10px;
		font-weight: 500;
	}
	[data-insight] p {
		margin: 0;
		color: var(--color-muted);
		font-size: 12px;
		line-height: 1.8;
	}
	blockquote {
		margin: 12px 0;
		padding-left: 12px;
		border-left: 2px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
		font-size: 12px;
		line-height: 1.8;
	}
	[data-actions] {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	h3:focus-visible,
	summary:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}
	@container (max-width: 620px) {
		[data-copy] {
			position: static;
		}
		[data-assessment-layout] {
			grid-template-columns: minmax(0, 1fr);
			gap: 30px;
		}
		header {
			align-items: start;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
