<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { Theme, ThemeModeToggle } from 'bref-ui';
	import type { ThemeMode } from 'bref-ui/types';
	import type { Snippet } from 'svelte';
	import DemoNav from './(sites)/demo-nav.svelte';
	import SiteHeader from './catalog/site-header.svelte';
	import './catalog/navigation.css';
	let { children }: { children: Snippet } = $props();
	let mode = $state<ThemeMode>('light');
	const showcase = $derived(page.route.id === '/');
	const contentId = $derived(
		showcase
			? 'showcase-content'
			: page.route.id?.includes('(themes)')
				? 'theme-content'
				: 'demo-content'
	);
	onNavigate((navigation) => {
		if (
			navigation.from?.url.pathname === navigation.to?.url.pathname ||
			!document.startViewTransition ||
			matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;
		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Theme>
	{#if showcase}<ThemeModeToggle {mode} />{/if}
	<div data-demo-root>
		<SiteHeader bind:mode {contentId}>
			{#if !showcase}<DemoNav />{/if}
		</SiteHeader>
		<div data-navigation-content>{@render children()}</div>
	</div>
</Theme>
