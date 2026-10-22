<script lang="ts">
	import { Icon } from '#lib/elsewhere/index.js';
	import { workflows, type Run } from './run-state.svelte.js';
	let { run }: { run: Run } = $props();
	const report = $derived(workflows[run.workflow].report);
</script>

<article aria-label="Run report" data-report>
	<div data-mark><Icon name={report.icon} /></div>
	<p data-eyebrow>Report</p>
	<h3>{report.title}</h3>
	<p data-summary>{report.summary}</p>
	<div data-findings>
		{#each report.findings as finding (finding.title)}
			<section>
				<span data-icon><Icon name={finding.icon} /></span>
				<div>
					<h4>{finding.title}</h4>
					<p>{finding.text}</p>
				</div>
			</section>
		{/each}
	</div>
	<section data-next>
		<span data-icon><Icon name="arrow_forward" /></span>
		<div>
			<h4>Next step</h4>
			<p>{report.next}</p>
		</div>
	</section>
	{#if run.instruction}
		<section data-brief>
			<h4>Brief for this pass</h4>
			<p>{run.instruction}</p>
		</section>
	{/if}
</article>

<style>
	[data-report] {
		padding-top: 8px;
	}
	[data-mark] {
		display: grid;
		place-items: center;
		width: 58px;
		height: 58px;
		border-radius: 18px;
		color: var(--color-primary);
		background: var(--run-tint);
		font-size: 30px;
		margin-bottom: 28px;
	}
	[data-eyebrow] {
		margin: 0 0 10px;
		color: var(--color-muted);
		font-size: 12px;
	}
	h3 {
		margin: 0;
		max-width: 420px;
		font-family: 'Syne Variable', sans-serif;
		font-size: clamp(26px, 2.6vw, 36px);
		line-height: 1.16;
		font-weight: 600;
		letter-spacing: -1px;
	}
	[data-summary] {
		margin: 18px 0 32px;
		max-width: 430px;
		font-size: 15px;
		color: var(--color-muted);
		line-height: 1.75;
	}
	[data-findings] {
		display: grid;
		gap: 26px;
	}
	section {
		display: flex;
		align-items: flex-start;
		gap: 16px;
	}
	[data-icon] {
		color: var(--color-primary);
		font-size: 23px;
		flex-shrink: 0;
	}
	h4 {
		margin: 0 0 5px;
		font-size: 14px;
		font-weight: 550;
	}
	section p {
		margin: 0;
		font-size: 14px;
		color: var(--color-muted);
		line-height: 1.7;
		overflow-wrap: anywhere;
	}
	[data-next] {
		margin-top: 32px;
		padding-top: 26px;
		border-top: 1px solid var(--run-rule);
	}
	[data-brief] {
		display: block;
		margin-top: 28px;
		padding: 18px;
		border-radius: 12px;
		background: var(--run-tint);
	}
	@media (max-width: 760px) {
		[data-mark] {
			margin-bottom: 24px;
		}
		h3 {
			font-size: 30px;
		}
	}
</style>
