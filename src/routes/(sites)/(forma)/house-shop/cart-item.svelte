<script lang="ts">
	import { asset } from '$app/paths';
	import { prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Button } from '#lib/forma/index.js';
	import { surface } from '#lib/components/theme/surface.js';
	import { money } from './products.js';
	import type { CartItem } from './products.js';
	let {
		item,
		onQuantity,
		onRemove
	}: {
		item: CartItem;
		onQuantity: (key: string, quantity: number) => void;
		onRemove: (key: string) => void;
	} = $props();
	const collapse = (node: HTMLElement) => {
		for (const cell of node.querySelectorAll<HTMLElement>('[data-cart-cell]')) {
			cell.style.setProperty('--cart-cell-height', `${cell.offsetHeight}px`);
		}
		return {
			duration: prefersReducedMotion.current ? 0 : 240,
			easing: cubicOut,
			css: (t: number) => `opacity: ${t}; --cart-row-progress: ${t}; --cart-cell-overflow: hidden;`
		};
	};
</script>

<tr
	data-cart-item
	data-cart-item-key={item.key}
	class={surface({ variant: 'soft', color: 'background' })}
	out:collapse
>
	<td>
		<div data-cart-cell>
			<div data-cart-product>
				<img src={asset(item.product.image)} alt="" width="64" height="80" />
				<div data-cart-item-details>
					<h3>{item.product.name}</h3>
					<p data-muted>{item.finish}</p>
				</div>
			</div>
		</div>
	</td>
	<td data-cart-item-price><div data-cart-cell>{money(item.product.price)}</div></td>
	<td>
		<div data-cart-cell>
			<div data-quantity-stepper role="group" aria-label={`Quantity for ${item.product.name}`}>
				<Button
					icon={{ name: 'remove', label: `Decrease quantity of ${item.product.name}` }}
					variant="neutral"
					size="small"
					onClick={() => onQuantity(item.key, item.quantity - 1)}
				/>
				<span aria-live="polite" aria-atomic="true">{item.quantity}</span>
				<Button
					icon={{ name: 'add', label: `Increase quantity of ${item.product.name}` }}
					variant="neutral"
					size="small"
					disabled={item.quantity >= 99}
					onClick={() => onQuantity(item.key, item.quantity + 1)}
				/>
			</div>
		</div>
	</td>
	<td data-cart-item-subtotal
		><div data-cart-cell><strong>{money(item.product.price * item.quantity)}</strong></div></td
	>
	<td>
		<div data-cart-cell>
			<Button
				data-delete-item
				icon={{ name: 'delete', label: `Remove ${item.product.name} from cart` }}
				color="error"
				variant="neutral"
				size="small"
				onClick={() => onRemove(item.key)}
			/>
		</div>
	</td>
</tr>

<style>
	[data-cart-item] > td {
		padding-block: calc(16px * var(--cart-row-progress, 1));
	}
	[data-cart-cell] {
		max-height: calc(var(--cart-cell-height, 100vh) * var(--cart-row-progress, 1));
		overflow: var(--cart-cell-overflow, visible);
	}
</style>
