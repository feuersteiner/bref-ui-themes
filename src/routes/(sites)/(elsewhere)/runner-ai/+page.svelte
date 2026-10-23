<script lang="ts">
	import { onMount, tick, untrack } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { Button, Dialog, Icon } from '#lib/elsewhere/index.js';
	import { createRuns, workflows } from './run-state.svelte.js';
	import RunOutput from './run-output.svelte';
	import RunChat from './run-chat.svelte';

	const workspace = createRuns();
	const desktop = new MediaQuery('(min-width: 761px)', true);
	let run = $derived(workspace.selected);
	let newRunOpen = $state(false);
	let workflow = $state(0);
	let prompt = $state<string>(workflows[0].prompt);
	let mobileView = $state('workflow');
	let workspaceElement: HTMLElement;
	const active = $derived(run.status === 'running' || run.status === 'queued');
	const labels = {
		queued: 'Queued',
		running: 'Running',
		completed: 'Completed',
		cancelled: 'Cancelled'
	};

	$effect(() => {
		if (run.status !== 'completed') return;
		untrack(() => {
			const restoreFocus =
				!desktop.current &&
				workspaceElement?.querySelector(
					mobileView === 'chat' ? '[data-chat-view] :focus' : '[data-sidebar] :focus'
				);
			mobileView = 'workflow';
			if (restoreFocus)
				tick().then(() => workspaceElement.querySelector<HTMLElement>('[data-report] h3')?.focus());
		});
	});

	onMount(() => {
		workspace.start();
		return () => workspace.stop();
	});

	function createRun() {
		if (workspace.create(workflow, prompt)) {
			newRunOpen = false;
			mobileView = 'workflow';
		}
	}
</script>

<svelte:head>
	<title>RunnerAI — Agent workspace</title>
	<meta
		name="description"
		content="A simulated agent workspace with step-by-step progress, reports and conversation."
	/>
</svelte:head>

<main
	id="demo-content"
	tabindex="-1"
	data-run-workspace
	data-view={mobileView}
	bind:this={workspaceElement}
>
	<aside aria-label="Agent runs" data-sidebar>
		<a href="#demo-content" data-brand
			><span><Icon name="smart_toy" /></span>
			<h1>RunnerAI</h1></a
		>
		<Button
			label="New run"
			icon={{ name: 'add' }}
			size="small"
			color="primary"
			variant="soft"
			wide
			onClick={() => (newRunOpen = true)}
			disabled={!workspace.canCreate}
		/>
		<div data-history-heading>
			<h2>Runs</h2>
			<span>{workspace.runs.length}</span>
		</div>
		<nav aria-label="Run history">
			{#each workspace.runs as item (item.id)}
				<button
					type="button"
					aria-current={run.id === item.id ? 'true' : undefined}
					onclick={async () => {
						workspace.select(item.id);
						mobileView = 'workflow';
						if (!desktop.current) {
							await tick();
							workspaceElement.querySelector<HTMLElement>('[data-output]')?.focus();
						}
					}}
				>
					<span data-run-title>{item.title}</span>
					<span data-run-status data-status={item.status}
						><i></i>{labels[item.status]}<span data-run-id>#{String(item.id).padStart(2, '0')}</span
						></span
					>
				</button>
			{/each}
		</nav>
		<p data-simulation>Simulated workspace</p>
	</aside>

	<div data-main>
		<header data-run-header>
			<div>
				<p data-run-kicker>
					Run {String(run.id).padStart(2, '0')} <span> / </span>
					{labels[run.status]}
				</p>
				<h2>{run.title}</h2>
			</div>
			<Button
				label={active ? 'Cancel run' : 'Retry run'}
				icon={{ name: active ? 'stop' : 'replay' }}
				size="small"
				onClick={() => (active ? workspace.cancel(run) : workspace.retry(run))}
			/>
		</header>
		<nav data-mobile-nav aria-label="Workspace views">
			{#each [['runs', 'Runs'], ['workflow', 'Run'], ['chat', 'Chat']] as [value, label] (value)}
				<button
					type="button"
					aria-pressed={mobileView === value}
					onclick={() => (mobileView = value)}>{label}</button
				>
			{/each}
		</nav>
		<div data-work-area>
			<div data-workflow-view>
				{#key run.id}<RunOutput {run} />{/key}
			</div>
			<div data-chat-view>
				{#key run.id}<RunChat
						bind:run
						visible={desktop.current || mobileView === 'chat'}
						onSend={() => workspace.send(run)}
					/>{/key}
			</div>
		</div>
	</div>
	<p role="status" data-visually-hidden>
		Run {run.id}: {labels[run.status]}. {run.step} of {run.nodes.length} steps completed.
	</p>
</main>

<Dialog bind:open={newRunOpen} header={{ title: 'New run' }} size="small">
	<form
		data-new-run
		onsubmit={(event) => {
			event.preventDefault();
			createRun();
		}}
	>
		<label
			>Workflow<select bind:value={workflow} onchange={() => (prompt = workflows[workflow].prompt)}
				>{#each workflows as item, index (item.name)}<option value={index}>{item.name}</option
					>{/each}</select
			></label
		>
		<label
			>What should the agent work on?<textarea
				bind:value={prompt}
				rows="4"
				maxlength="1000"
				required></textarea></label
		>
		<Button
			type="submit"
			label="Create run"
			trailingIcon={{ name: 'arrow_forward' }}
			variant="filled"
			color="primary"
			disabled={!prompt.trim() || !workspace.canCreate}
		/>
	</form>
</Dialog>

<style>
	main {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr);
		min-height: calc(100dvh - 130px);
		max-width: 1600px;
		margin: auto;
	}
	[data-sidebar] {
		display: flex;
		flex-direction: column;
		padding: 30px 18px 20px;
		border-right: 1px solid var(--run-rule);
	}
	[data-brand] {
		display: flex;
		align-items: center;
		gap: 9px;
		margin: 0 8px 32px;
		text-decoration: none;
	}
	[data-brand] > span {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		color: var(--color-primary);
		font-size: 27px;
	}
	h1 {
		margin: 0;
		font:
			650 21px/1.2 'Syne Variable',
			sans-serif;
		letter-spacing: -0.8px;
	}
	[data-history-heading] {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 32px 10px 12px;
		color: var(--color-muted);
		font-size: 11px;
	}
	[data-history-heading] h2 {
		margin: 0;
		font-size: 12px;
		font-weight: 400;
	}
	[data-sidebar] nav {
		display: grid;
		gap: 5px;
		max-height: 520px;
		overflow: auto;
	}
	[data-sidebar] nav button {
		display: block;
		width: 100%;
		border: 0;
		padding: 12px 10px;
		border-radius: 9px;
		text-align: left;
		background: transparent;
		color: var(--color-foreground);
	}
	[data-sidebar] nav button[aria-current='true'] {
		background: var(--run-tint);
	}
	[data-sidebar] nav button:hover {
		background: var(--run-tint);
	}
	[data-run-title] {
		display: block;
		font-size: 13px;
		line-height: 1.5;
	}
	[data-run-status] {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 7px;
		font-size: 11px;
		color: var(--color-muted);
	}
	i {
		width: 5px;
		height: 5px;
		background: var(--run-line);
		border-radius: 50%;
	}
	[data-status='running'] i {
		background: var(--color-primary);
	}
	[data-status='completed'] i {
		background: var(--color-success);
	}
	[data-run-id] {
		margin-left: auto;
		opacity: 0.8;
		font-variant-numeric: tabular-nums;
	}
	[data-simulation] {
		color: var(--color-muted);
		font-size: 11px;
		margin: auto 10px 0;
		padding-top: 40px;
	}
	[data-main] {
		min-width: 0;
	}
	[data-run-header] {
		min-height: 100px;
		padding: 22px 28px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid var(--run-rule);
	}
	[data-run-kicker] {
		margin: 0 0 7px;
		color: var(--color-muted);
		font-size: 11px;
	}
	[data-run-kicker] span {
		padding-inline: 7px;
		opacity: 0.5;
	}
	[data-run-header] h2 {
		margin: 0;
		font-size: clamp(18px, 1.8vw, 24px);
		font-weight: 450;
		letter-spacing: -0.6px;
	}
	[data-work-area] {
		display: grid;
		grid-template-columns: minmax(340px, 1fr) 350px;
		grid-template-rows: minmax(0, 1fr);
		min-height: max(500px, calc(100dvh - 218px));
	}
	[data-workflow-view],
	[data-chat-view] {
		display: grid;
		min-height: 0;
		min-width: 0;
	}
	[data-mobile-nav] {
		display: none;
	}
	[data-new-run] {
		display: grid;
		gap: 22px;
	}
	[data-new-run] label {
		font-size: 13px;
	}
	[data-new-run] select,
	[data-new-run] textarea {
		width: 100%;
		color: var(--color-foreground);
		background: var(--run-surface, white);
		border: 1px solid var(--run-line, #d1ccdf);
		border-radius: 8px;
		padding: 12px;
		font: inherit;
		line-height: 1.6;
	}
	[data-new-run] textarea {
		resize: vertical;
	}
	@media (max-width: 1100px) {
		main {
			grid-template-columns: 180px minmax(0, 1fr);
		}
		[data-sidebar] {
			padding-inline: 12px;
		}
		[data-work-area] {
			grid-template-columns: minmax(310px, 1fr) 310px;
		}
	}
	@media (max-width: 900px) and (min-width: 761px) {
		main {
			grid-template-columns: 155px minmax(0, 1fr);
		}
		[data-work-area] {
			grid-template-columns: minmax(285px, 1fr) 285px;
		}
		[data-brand] {
			gap: 5px;
			margin-inline: 0;
		}
		h1 {
			font-size: 18px;
		}
		[data-run-header] {
			padding-inline: 20px;
		}
	}
	@media (max-width: 760px) {
		main {
			display: flex;
			flex-direction: column;
			min-height: calc(100dvh - 160px);
		}
		[data-sidebar] {
			display: none;
			order: 2;
			border-right: 0;
			padding: 24px;
		}
		[data-run-header] {
			padding: 24px 18px 20px;
			min-height: 100px;
		}
		[data-run-header] h2 {
			font-size: 20px;
		}
		[data-run-header] :global(button) {
			flex-shrink: 0;
		}
		[data-mobile-nav] {
			display: flex;
			gap: 12px;
			border-bottom: 1px solid var(--run-rule);
			padding-inline: 18px;
		}
		[data-mobile-nav] button {
			flex: 1;
			min-height: 44px;
			background: transparent;
			color: var(--color-muted);
			border: 0;
			border-bottom: 2px solid transparent;
			font-size: 13px;
		}
		[data-mobile-nav] button[aria-pressed='true'] {
			color: var(--color-primary);
			border-bottom-color: var(--color-primary);
		}
		[data-work-area] {
			display: block;
			height: auto;
			min-height: 0;
		}
		[data-view='workflow'] [data-chat-view],
		[data-view='chat'] [data-workflow-view],
		[data-view='runs'] [data-work-area] {
			display: none;
		}
		[data-view='runs'] [data-sidebar] {
			display: flex;
			min-height: 480px;
		}
		[data-simulation] {
			padding-top: 28px;
		}
	}
</style>
