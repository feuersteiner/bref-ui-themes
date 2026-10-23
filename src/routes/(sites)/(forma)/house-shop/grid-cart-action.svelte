<script lang="ts">
	import { Icon } from '#lib/forma/index.js';
	let {
		name,
		finish,
		quantity,
		onAdd
	}: {
		name: string;
		finish: string;
		quantity: number;
		onAdd: () => boolean;
	} = $props();
	let sequence = $state(0);
	let addedQuantity = $state(0);
	let added = $state(false);
	const success = $derived(added && quantity === addedQuantity);
	const atLimit = $derived(quantity >= 99);
	$effect(() => {
		if (!sequence) return;
		const timeout = setTimeout(() => (added = false), 1000);
		return () => clearTimeout(timeout);
	});
	const add = () => {
		if (atLimit) return;
		const next = quantity + 1;
		if (!onAdd()) return;
		addedQuantity = next;
		added = true;
		sequence += 1;
	};
</script>

<button
	type="button"
	data-grid-cart-action
	data-success={success}
	disabled={atLimit}
	onclick={add}
	aria-label={atLimit
		? `${name}, ${finish}: limit of 99 in cart reached`
		: `Add ${name}, ${finish} to cart${quantity ? `; ${quantity} in cart` : ''}`}
>
	<Icon name="shopping_cart" size="small" />
	<span>{atLimit ? 'In cart' : 'Add to cart'}</span>
	{#if quantity}<span data-quantity aria-hidden="true">({quantity})</span>{/if}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		min-width: 44px;
		min-height: 44px;
		padding: 8px;
		border: 0;
		border-radius: 4px;
		background: transparent;
		color: var(--color-foreground);
		font: 450 13px/1.4 var(--font-text);
		white-space: nowrap;
		cursor: pointer;
		transition:
			background 140ms ease,
			color 140ms ease,
			transform 100ms ease;
	}
	button[data-success='true'] {
		color: var(--color-success);
	}
	[data-quantity] {
		font-variant-numeric: tabular-nums;
	}
	button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}
	button:active:not(:disabled) {
		background: color-mix(in srgb, var(--color-foreground) 9%, transparent);
		transform: translateY(1px);
	}
	button:disabled {
		color: var(--color-muted);
		cursor: default;
	}
	@media (hover: hover) {
		button:hover:not(:disabled) {
			background: color-mix(in srgb, var(--color-foreground) 5%, transparent);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
		button:active:not(:disabled) {
			transform: none;
		}
	}
</style>
