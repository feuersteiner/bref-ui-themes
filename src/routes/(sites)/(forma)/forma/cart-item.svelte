<script lang="ts">
	import { asset } from '$app/paths';
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
</script>

<tr
	data-cart-item
	data-cart-item-key={item.key}
	class={surface({ variant: 'soft', color: 'background' })}
>
	<td>
		<div data-cart-product>
			<img src={asset(item.product.image)} alt="" width="64" height="80" />
			<div data-cart-item-details>
				<h3>{item.product.name}</h3>
				<p data-muted>{item.finish}</p>
			</div>
		</div>
	</td>
	<td data-cart-item-price>{money(item.product.price)}</td>
	<td>
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
	</td>
	<td data-cart-item-subtotal><strong>{money(item.product.price * item.quantity)}</strong></td>
	<td>
		<Button
			data-delete-item
			icon={{ name: 'delete', label: `Remove ${item.product.name} from cart` }}
			color="error"
			variant="neutral"
			size="small"
			onClick={() => onRemove(item.key)}
		/>
	</td>
</tr>
