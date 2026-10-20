<script lang="ts">
	import { Checkbox, Icon, Pill, Tabs } from '#lib/elsewhere/index.js';
	import { fly } from 'svelte/transition';
	import { findings, type AuditRun } from './audits.js';
	let {
		run,
		motion,
		onReview
	}: {
		run: AuditRun;
		motion: number;
		onReview: (id: string, checked: boolean) => void;
	} = $props();
	let reviewStatus = $state('all');
	const statuses = [
		{ id: 'all', label: 'All findings', icon: 'list_alt' },
		{ id: 'pending', label: 'To review', icon: 'rate_review' },
		{ id: 'reviewed', label: 'Reviewed', icon: 'task_alt' }
	] as const;
	const visible = $derived(
		findings.filter(
			(finding) =>
				reviewStatus === 'all' ||
				run.reviewed.includes(finding.id) === (reviewStatus === 'reviewed')
		)
	);
</script>

<section
	data-agent-results
	aria-labelledby="results-heading"
	in:fly={{ y: motion ? 10 : 0, duration: motion }}
>
	<div data-agent-results-heading>
		<h2 id="results-heading">Three ways to improve the page</h2>
		<span>{run.reviewed.length} of {findings.length} reviewed</span>
	</div>
	<div data-review-tabs>
		<Tabs
			items={statuses}
			bind:value={reviewStatus}
			label="Finding review status"
			size="fill"
			filled
		/>
	</div>
	<div
		role="tabpanel"
		aria-label={statuses.find((item) => item.id === reviewStatus)?.label}
		tabindex="0"
	>
		<ul>
			{#each visible as finding, index (finding.id)}
				<li
					data-reviewed={run.reviewed.includes(finding.id)}
					in:fly={{ y: motion ? 10 : 0, duration: motion, delay: motion ? index * 45 : 0 }}
				>
					<div data-agent-finding-heading>
						<Icon name={finding.icon} />
						<h3>{finding.title}</h3>
						<Checkbox
							aria-label={`Mark reviewed: ${finding.title}`}
							checked={run.reviewed.includes(finding.id)}
							onchange={(event) => onReview(finding.id, event.currentTarget.checked)}
						/>
					</div>
					<Pill label={finding.area} icon={{ name: finding.icon }} size="x-small" />
					<p>{finding.action}</p>
					<details>
						<summary>Sample evidence <Icon name="keyboard_arrow_down" /></summary>
						<p>{finding.evidence}</p>
					</details>
				</li>
			{:else}<li><p data-muted>No findings in this view.</p></li>{/each}
		</ul>
	</div>
</section>

<style>
	[data-review-tabs] {
		min-width: 0;
		margin-top: 20px;
	}
</style>
