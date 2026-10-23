<script lang="ts">
	import { tick } from 'svelte';
	import { Button, Icon } from '#lib/elsewhere/index.js';
	import type { Run } from './run-state.svelte.js';
	let {
		run = $bindable(),
		visible = true,
		onSend
	}: { run: Run; visible?: boolean; onSend: () => void } = $props();
	let thread: HTMLDivElement;
	$effect(() => {
		const count = run.messages.length;
		const last = run.messages.at(-1)?.id;
		if (visible && count && last)
			tick().then(() => {
				if (thread) thread.scrollTop = thread.scrollHeight;
			});
	});
</script>

<section aria-label="Run conversation" data-chat>
	<header>
		<h2>Conversation</h2>
		<span><Icon name="smart_toy" /> Agent</span>
	</header>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable messages need keyboard access.) -->
	<div data-thread bind:this={thread} role="region" aria-label="Messages" tabindex="0">
		<div role="log" aria-live="polite" aria-relevant="additions">
			{#each run.messages as message (message.id)}
				<article data-role={message.role}>
					<span data-author>{message.role === 'user' ? 'You' : 'RunnerAI'}</span>
					<p>{message.text}</p>
				</article>
			{/each}
		</div>
	</div>
	<form
		onsubmit={(event) => {
			event.preventDefault();
			onSend();
		}}
	>
		<label for="run-message" data-visually-hidden>Message this run</label>
		<textarea
			id="run-message"
			bind:value={run.draft}
			placeholder={run.status === 'completed'
				? 'Ask a question or request a revision…'
				: 'Message this run…'}
			rows="3"
			maxlength="1000"
			onkeydown={(event) => {
				if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
					event.preventDefault();
					if (run.draft.trim()) onSend();
				}
			}}></textarea>
		<div data-compose-footer>
			<Button
				type="submit"
				icon={{ name: 'arrow_upward', label: 'Send message' }}
				size="small"
				variant="filled"
				color="primary"
				rounded
				disabled={!run.draft.trim()}
			/>
		</div>
	</form>
</section>

<style>
	[data-chat] {
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		padding: 24px 24px 18px;
		background: var(--run-surface);
		border-left: 1px solid var(--run-rule);
	}
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	h2 {
		margin: 0;
		font-size: 14px;
	}
	header > span {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--color-muted);
		font-size: 12px;
	}
	[data-thread] {
		flex: 1;
		min-height: 120px;
		height: 0;
		overflow-y: auto;
		margin-block: 26px 20px;
		scrollbar-width: thin;
		overscroll-behavior: contain;
	}
	article {
		margin-bottom: 28px;
	}
	[data-author] {
		color: var(--color-muted);
		font-size: 11px;
		font-weight: 500;
	}
	article p {
		margin: 7px 0 0;
		font-size: 14px;
		white-space: pre-line;
		overflow-wrap: anywhere;
	}
	article[data-role='user'] p {
		background: var(--run-tint);
		border-radius: 12px;
		padding: 12px 14px;
	}
	form {
		border: 1px solid var(--run-line);
		padding: 12px;
		border-radius: 14px;
	}
	form:focus-within {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
	textarea {
		display: block;
		width: 100%;
		min-height: 70px;
		padding: 0;
		resize: vertical;
		max-height: 180px;
		border: 0;
		outline: none;
		color: var(--color-foreground);
		background: transparent;
		font: inherit;
		font-size: 14px;
		line-height: 1.6;
	}
	textarea::placeholder {
		color: var(--color-muted);
		opacity: 1;
	}
	[data-compose-footer] {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 8px;
	}
	@media (max-width: 1100px) {
		[data-chat] {
			padding-inline: 18px;
		}
	}
	@media (max-width: 760px) {
		[data-chat] {
			min-height: 460px;
			height: calc(100dvh - 326px);
			border-left: 0;
		}
		[data-thread] {
			height: 0;
			max-height: none;
		}
	}
</style>
