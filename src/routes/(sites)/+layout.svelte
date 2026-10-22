<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}

<style>
	:global([data-demo-root] #demo-content) {
		scroll-margin-block-start: 180px;
	}
</style>
