<script lang="ts">
	let {
		items,
		value = $bindable('all'),
		panelId
	}: {
		items: readonly { id: string; label: string; disabled?: boolean }[];
		value?: string;
		panelId: string;
	} = $props();

	const navigate = (event: KeyboardEvent & { currentTarget: HTMLDivElement }) => {
		const buttons = [
			...event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')
		];
		const index = buttons.indexOf(event.target as HTMLButtonElement);
		if (index < 0) return;
		const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
		let next: number;
		if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = buttons.length - 1;
		else if (event.key === 'ArrowRight')
			next = (index + (rtl ? -1 : 1) + buttons.length) % buttons.length;
		else if (event.key === 'ArrowLeft')
			next = (index + (rtl ? 1 : -1) + buttons.length) % buttons.length;
		else return;
		event.preventDefault();
		buttons[next].focus();
		buttons[next].click();
	};
</script>

<div
	data-status-tabs
	role="tablist"
	aria-label="Task status"
	aria-orientation="horizontal"
	tabindex={-1}
	onkeydown={navigate}
>
	{#each items as item (item.id)}
		<button
			type="button"
			role="tab"
			id={`${panelId}-${item.id}`}
			aria-controls={panelId}
			aria-selected={value === item.id}
			tabindex={value === item.id ? 0 : -1}
			disabled={item.disabled}
			onclick={() => (value = item.id)}
		>
			{item.label}
		</button>
	{/each}
</div>

<style>
	[data-status-tabs][role='tablist'] {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		gap: 4px;
		width: max-content;
		max-width: 100%;
		padding: 4px;
		border: 1px solid color-mix(in srgb, var(--color-primary) 9%, transparent);
		border-radius: 14px;
		background: color-mix(in srgb, var(--color-primary) 5%, var(--color-background));
		box-shadow: inset 0 1px 2px #26334604;
	}
	[data-status-tabs] button[role='tab'] {
		min-width: 0;
		min-height: 44px;
		padding: 0 18px;
		border: 1px solid transparent;
		border-radius: 10px;
		background: transparent;
		color: var(--color-muted);
		font: 500 13px/1.3 var(--font-text);
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color 140ms,
			border-color 140ms,
			box-shadow 140ms,
			color 140ms;
	}
	@media (hover: hover) {
		[data-status-tabs] button[role='tab']:hover:not(:disabled) {
			background: color-mix(in srgb, white 60%, transparent);
			color: var(--color-primary);
		}
	}
	[data-status-tabs] button[role='tab'][aria-selected='true'] {
		border-color: color-mix(in srgb, var(--color-primary) 13%, transparent);
		background: white;
		color: var(--color-primary);
		box-shadow:
			0 1px 3px #26334612,
			0 2px 6px #26334606;
	}
	[data-status-tabs] button[role='tab']:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}
	[data-status-tabs] button[role='tab']:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		box-shadow: none;
	}
	@media (max-width: 440px) {
		[data-status-tabs][role='tablist'] {
			width: 100%;
		}
		[data-status-tabs] button[role='tab'] {
			padding-inline: 10px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-status-tabs] button[role='tab'] {
			transition: none;
		}
	}
	@media (forced-colors: active) {
		[data-status-tabs][role='tablist'] {
			border-color: ButtonBorder;
		}
		[data-status-tabs] button[role='tab'][aria-selected='true'] {
			border-color: Highlight;
			color: Highlight;
		}
	}
</style>
