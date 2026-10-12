<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	beforeNavigate(({ from, to, willUnload, cancel }) => {
		if (willUnload || !from || !to || from.url.pathname === to.url.pathname) return;
		cancel();
		window.location.assign(to.url.href);
	});
</script>

{@render children()}
