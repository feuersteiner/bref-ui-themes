<script lang="ts">
	import { Button } from 'bref-ui';
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
	<Button
		label={atLimit ? 'Limit reached' : success ? 'Added' : compact ? 'Add' : 'Add to cart'}
		icon={{ name: success || atLimit ? 'check' : 'add' }}
		variant="filled"
		color="primary"
		size={compact ? 'small' : 'medium'}
		onClick={add}
		disabled={atLimit}
		aria-label={atLimit
			? `${name}, ${finish}: limit of 99 in cart reached`
			: `Add ${name}, ${finish} to cart`}
	/>
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
	p {
		display: flex;
		gap: 8px;
		align-items: center;
		color: var(--color-muted);
		font-size: 12px;
	}
	strong {
		font-variant-numeric: tabular-nums;
	}
</style>
