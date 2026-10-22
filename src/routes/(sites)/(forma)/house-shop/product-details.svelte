<script lang="ts">
	import { asset } from '$app/paths';
	import { untrack } from 'svelte';
	import { Dialog, Select } from '#lib/forma/index.js';
	import AddToCart from './add-to-cart.svelte';
	import { money } from './products.js';
	import type { Product, CartItem } from './products.js';
	let {
		product,
		open = $bindable(false),
		onAdd,
		items
	}: {
		product: Product;
		open?: boolean;
		onAdd: (product: Product, finish: string) => boolean;
		items: CartItem[];
	} = $props();
	let finish = $state<string | string[]>(untrack(() => product.finishes[0]));
	const quantity = $derived(
		items.find((item) => item.product.id === product.id && item.finish === String(finish))
			?.quantity ?? 0
	);
</script>

<Dialog
	bind:open
	header={{
		title: product.name,
		description: money(product.price)
	}}
	size="medium"
>
	<div data-product-detail={product.id}>
		<img src={asset(product.image)} alt={product.alt} width="400" height="450" />
		<div data-form>
			<p>{product.description}</p>
			{#if product.finishes.length > 1}
				<label for="product-finish">
					Finish<Select
						id="product-finish"
						bind:value={finish}
						items={product.finishes.map((name) => ({ id: name, label: name }))}
					/>
				</label>
			{:else}<p data-muted>Finish: {product.finishes[0]}</p>{/if}

			{#key String(finish)}
				<AddToCart
					name={product.name}
					finish={String(finish)}
					{quantity}
					onAdd={() => onAdd(product, String(finish))}
				/>
			{/key}
		</div>
	</div>
</Dialog>
