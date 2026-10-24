<script lang="ts">
	import { Button } from 'bref-ui';
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

<div data-grid-cart-action>
	<Button
		label={atLimit ? 'In cart' : success ? 'Added' : 'Add to cart'}
		icon={{ name: 'shopping_cart' }}
		size="small"
		variant="neutral"
		disabled={atLimit}
		onClick={add}
		aria-label={atLimit
			? `${name}, ${finish}: limit of 99 in cart reached`
			: `Add ${name}, ${finish} to cart${quantity ? `; ${quantity} in cart` : ''}`}
	/>
	{#if quantity}<span aria-hidden="true">({quantity})</span>{/if}
</div>

<style>
	[data-grid-cart-action] {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	span {
		font-size: 12px;
		font-variant-numeric: tabular-nums;
	}
</style>
