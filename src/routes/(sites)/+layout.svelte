<script lang="ts">
	import type { Snippet } from 'svelte';
	import DemoNav from './demo-nav.svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div data-demo-root>
	<DemoNav />
	{@render children()}
</div>
