<script lang="ts">
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { Button, Dialog, Icon } from '#lib/forma/index.js';
	import CartItemRow from './cart-item.svelte';
	import { money } from './products.js';
	import type { CartItem } from './products.js';
	let {
		open = $bindable(false),
		items,
		onRemove,
		onQuantity,
		onComplete
	}: {
		open?: boolean;
		items: CartItem[];
		onRemove: (key: string) => void;
		onQuantity: (key: string, quantity: number) => void;
		onComplete: () => void;
	} = $props();
	let stage = $state<'cart' | 'review' | 'complete'>('cart');
	let removal = $state('');
	const announceRemoval = (key: string) => {
		const item = items.find((item) => item.key === key);
		if (item) removal = `${item.product.name}, ${item.finish}, removed from cart.`;
	};
	const removeAndFocus = async (key: string, update: () => void) => {
		const rows = Array.from(content?.querySelectorAll<HTMLElement>('[data-cart-item-key]') ?? []);
		const index = rows.findIndex((row) => row.dataset.cartItemKey === key);
		const row = rows[index];
		const focused = document.activeElement;
		const restoreFocus = !!row?.contains(focused);
		const deleting = focused?.hasAttribute('data-delete-item');
		const neighbour = rows[index + 1] ?? rows[index - 1];
		update();
		await tick();
		if (!restoreFocus || row.isConnected) return;
		const target = neighbour?.querySelector<HTMLButtonElement>(
			deleting ? 'button[data-delete-item]' : 'button'
		);
		(target ?? content)?.focus();
	};
	const remove = (key: string) => {
		announceRemoval(key);
		void removeAndFocus(key, () => onRemove(key));
	};
	const changeQuantity = (key: string, quantity: number) => {
		if (quantity <= 0) {
			announceRemoval(key);
			void removeAndFocus(key, () => onQuantity(key, quantity));
		} else onQuantity(key, quantity);
	};
	let receipt = $state({ total: 0, count: 0 });
	let confirmation = $state<HTMLParagraphElement>();
	let content = $state<HTMLDivElement>();
	const changeStage = async (next: 'cart' | 'review') => {
		stage = next;
		await tick();
		content?.focus();
	};
	const total = $derived(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
	const confirm = async () => {
		receipt = { total, count: items.reduce((sum, item) => sum + item.quantity, 0) };
		stage = 'complete';
		onComplete();
		await tick();
		confirmation?.focus();
	};
</script>

<Dialog
	bind:open
	header={{
		title:
			stage === 'complete' ? 'Order confirmed' : stage === 'review' ? 'Review order' : 'Your cart',
		icon: { name: stage === 'complete' ? 'check_circle' : 'shopping_cart' }
	}}
	size="large"
	onclose={() => {
		stage = 'cart';
		removal = '';
	}}
>
	<p role="status" aria-atomic="true" data-visually-hidden>{removal}</p>
	{#key stage}
		<div
			data-cart
			bind:this={content}
			tabindex="-1"
			in:fly={{
				y: prefersReducedMotion.current ? 0 : 24,
				duration: prefersReducedMotion.current ? 0 : 360
			}}
		>
			{#if stage === 'complete'}
				<p role="status" tabindex="-1" bind:this={confirmation}>
					{receipt.count}
					{receipt.count === 1 ? 'piece' : 'pieces'} · {money(receipt.total)}. This was a demo
					order. No payment was taken.
				</p>
				<Button
					label="Continue shopping"
					icon={{ name: 'arrow_back' }}
					onClick={() => (open = false)}
				/>
			{:else}
				{#if stage === 'cart'}
					{#if items.length}
						<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll the cart table on narrow screens.) -->
						<div data-cart-table role="region" aria-label="Cart items" tabindex="0">
							<table>
								<thead>
									<tr>
										<th scope="col">Product</th>
										<th scope="col">Price</th>
										<th scope="col">Quantity</th>
										<th scope="col">Subtotal</th>
										<th scope="col"><span data-visually-hidden>Remove</span></th>
									</tr>
								</thead>
								<tbody>
									{#each items as item (item.key)}
										<CartItemRow {item} onQuantity={changeQuantity} onRemove={remove} />
									{/each}
								</tbody>
								<tfoot>
									<tr>
										<th scope="row" colspan="3">Subtotal</th>
										<td data-cart-item-subtotal><strong>{money(total)}</strong></td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>
					{:else}<div data-cart-empty>
							<Icon name="shopping_cart" size="large" />
							<p>Your cart is empty.</p>
						</div>{/if}
				{:else}
					{#each items as item (item.key)}
						<div data-order-line>
							<span>{item.product.name} × {item.quantity}</span>
							<strong>{money(item.product.price * item.quantity)}</strong>
						</div>
					{/each}
				{/if}
				{#if items.length}
					{#if stage === 'review'}
						<div data-cart-total>
							<span>Subtotal</span>
							<strong>{money(total)}</strong>
						</div>
					{/if}
					<p data-muted>Demo checkout. No payment, delivery or purchase is made.</p>
				{/if}
				<div data-cart-actions>
					<Button
						label={stage === 'review' ? 'Back to cart' : 'Continue shopping'}
						icon={{ name: 'arrow_back' }}
						variant="neutral"
						onClick={() => (stage === 'review' ? changeStage('cart') : (open = false))}
					/>
					{#if items.length}<Button
							label={stage === 'review' ? 'Confirm demo order' : 'Checkout'}
							icon={{ name: stage === 'review' ? 'check' : 'arrow_forward' }}
							variant="filled"
							color="primary"
							onClick={() => (stage === 'review' ? confirm() : changeStage('review'))}
						/>{/if}
				</div>
			{/if}
		</div>
	{/key}
</Dialog>
