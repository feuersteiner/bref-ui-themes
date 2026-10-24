<script lang="ts">
	import { Icon } from '#lib/forma/index.js';
	let {
		name,
		finish,
		quantity,
		compact = false,
		onAdd
	}: {
		name: string;
		finish: string;
		quantity: number;
		compact?: boolean;
		onAdd: () => boolean;
	} = $props();
	let sequence = $state(0);
	let added = $state(false);
	let addedQuantity = $state(0);
	const success = $derived(added && quantity === addedQuantity);
	const atLimit = $derived(quantity >= 99);
	$effect(() => {
		if (!sequence) return;
		const timeout = setTimeout(() => (added = false), 1400);
		return () => clearTimeout(timeout);
	});
	const add = () => {
		const next = quantity + 1;
		if (!onAdd()) return;
		addedQuantity = next;
		added = true;
		sequence += 1;
	};
</script>

<div data-add-control data-compact={compact} data-success={success}>
	<button
		type="button"
		onclick={add}
		disabled={atLimit}
		aria-label={atLimit
			? `${name}, ${finish}: limit of 99 in cart reached`
			: `Add ${name}, ${finish} to cart`}
	>
		<span data-label
			>{atLimit ? 'Limit reached' : success ? 'Added' : compact ? 'Add' : 'Add to cart'}</span
		>
		{#key sequence}
			<span data-add-icon data-pulse={success}>
				<Icon name={success || atLimit ? 'check' : 'add'} size="small" />
			</span>
		{/key}
	</button>
	<p role="status" aria-atomic="true">
		<span data-finish>{finish}</span>
		<span aria-hidden="true">·</span>
		<span aria-label={`${name}, ${finish}: ${quantity} in cart`} data-quantity>
			<strong>{quantity}</strong> in cart
		</span>
	</p>
</div>

<style>
	[data-add-control] {
		display: grid;
		gap: 8px;
		min-width: 0;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		min-height: 48px;
		padding: 6px 8px 6px 20px;
		border: 1px solid var(--color-primary);
		border-radius: 999px;
		background: var(--color-primary);
		color: var(--color-background);
		box-shadow: 0 3px 0 color-mix(in srgb, var(--color-primary) 28%, transparent);
		transition:
			transform 140ms ease,
			box-shadow 140ms ease,
			background 180ms ease,
			border-color 180ms ease;
	}
	[data-label] {
		font-size: 13px;
		font-weight: 550;
		white-space: nowrap;
	}
	[data-add-icon] {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		border-radius: 50%;
		background: color-mix(in srgb, currentColor 15%, transparent);
	}
	[data-success='true'] button {
		background: var(--color-success);
		border-color: var(--color-success);
	}
	[data-pulse='true'] {
		animation: confirm 360ms ease-out;
	}
	button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}
	button:active:not(:disabled) {
		transform: translateY(2px) scale(0.98);
		box-shadow: 0 0 0 transparent;
	}
	button:disabled {
		background: var(--color-foreground);
		border-color: var(--color-foreground);
		box-shadow: none;
		cursor: default;
	}
	p {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 6px;
		margin: 0;
		min-height: 18px;
		color: var(--color-muted);
		font-size: 11px;
		line-height: 18px;
	}
	[data-finish] {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	[data-quantity] {
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}
	strong {
		color: var(--color-foreground);
		font-weight: 600;
	}
	[data-compact='true'] {
		width: 158px;
		max-width: 100%;
	}
	[data-compact='true'] button {
		padding-left: 16px;
	}
	@media (hover: hover) {
		button:hover:not(:disabled) {
			transform: translateY(-2px);
			box-shadow: 0 5px 0 color-mix(in srgb, var(--color-primary) 22%, transparent);
		}
		button:hover:active:not(:disabled) {
			transform: translateY(2px) scale(0.98);
			box-shadow: none;
		}
	}
	@keyframes confirm {
		0% {
			transform: scale(0.65) rotate(-20deg);
		}
		60% {
			transform: scale(1.15) rotate(5deg);
		}
		100% {
			transform: scale(1) rotate(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
		button:hover:not(:disabled),
		button:active:not(:disabled),
		button:hover:active:not(:disabled) {
			transform: none;
		}
		[data-pulse='true'] {
			animation: none;
		}
	}
</style>
