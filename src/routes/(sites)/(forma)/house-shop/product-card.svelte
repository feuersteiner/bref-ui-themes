<script lang="ts">
	import { asset } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Button } from '#lib/forma/index.js';
	import GridCartAction from './grid-cart-action.svelte';
	import { money } from './products.js';
	import type { Product } from './products.js';
	let {
		product,
		onSelect,
		onAdd,
		quantity = 0
	}: {
		product: Product;
		quantity?: number;
		onSelect: (product: Product) => void;
		onAdd: (product: Product, finish: string) => boolean;
	} = $props();
</script>

<article
	data-product={product.id}
	in:fly={{
		y: prefersReducedMotion.current ? 0 : 20,
		duration: prefersReducedMotion.current ? 0 : 420
	}}
>
	<button data-product-image onclick={() => onSelect(product)} aria-label={`View ${product.name}`}>
		<img src={asset(product.image)} alt={product.alt} width="700" height="800" loading="lazy" />
	</button>
	<div data-product-meta>
		<h3>{product.name}</h3>
		<span>{money(product.price)}</span>
	</div>
	<div data-product-actions>
		<Button
			label="Details"
			variant="neutral"
			size="small"
			trailingIcon={{ name: 'arrow_forward' }}
			onClick={() => onSelect(product)}
		/>
		<GridCartAction
			name={product.name}
			finish={product.finishes[0]}
			{quantity}
			onAdd={() => onAdd(product, product.finishes[0])}
		/>
	</div>
</article>

<style>
	[data-product-actions] {
		gap: 12px;
		flex-wrap: wrap;
	}
</style>
