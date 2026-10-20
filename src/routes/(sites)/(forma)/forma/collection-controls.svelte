<script lang="ts">
	import { Tabs, Select, TextInput } from '#lib/forma/index.js';
	let {
		category = $bindable('all'),
		sort = $bindable('featured'),
		query = $bindable('')
	}: { category?: string; sort?: string | string[]; query?: string } = $props();
</script>

<div data-collection-controls>
	<Tabs
		label="Product category"
		bind:value={category}
		items={[
			{ id: 'all', label: 'All', icon: 'grid_view' },
			{ id: 'seating', label: 'Seating', icon: 'chair' },
			{ id: 'lighting', label: 'Lighting', icon: 'light' },
			{ id: 'tables', label: 'Tables', icon: 'table_restaurant' }
		]}
	/>
	<div data-collection-tools>
		<TextInput
			aria-label="Search furniture"
			type="search"
			placeholder="Search furniture"
			icon={{ name: 'search' }}
			bind:value={query}
			size="small"
		/>
		<label for="product-sort">
			<span data-visually-hidden>Sort products</span>
			<Select
				id="product-sort"
				bind:value={sort}
				items={[
					{ id: 'featured', label: 'Featured' },
					{ id: 'price-asc', label: 'Price: Low to high' },
					{ id: 'price-desc', label: 'Price: High to low' }
				]}
				size="small"
			/>
		</label>
	</div>
</div>
