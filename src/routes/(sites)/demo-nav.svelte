<script lang="ts">
	import { Icon } from '#lib/components/index.js';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	const demos = [
		{ name: 'Todo', icon: 'checklist', href: resolve('/(sites)/(relay)/todo') },
		{ name: 'House Shop', icon: 'storefront', href: resolve('/(sites)/(forma)/house-shop') },
		{ name: 'RunnerAI', icon: 'smart_toy', href: resolve('/(sites)/(elsewhere)/runner-ai') }
	] as const;
</script>

<div data-demo-navigation-shell>
	<nav data-demo-navigation aria-label="Bref live demos">
		<a
			href={resolve('/')}
			aria-label="Back to showcase"
			aria-current={page.route.id === '/' ? 'page' : undefined}
		>
			<Icon name="arrow_back" />
			<span>Showcase</span>
		</a>
		<div>
			{#each demos as demo (demo.href)}
				<a href={demo.href} aria-current={page.url.pathname === demo.href ? 'page' : undefined}>
					<Icon name={demo.icon} />
					{demo.name}
				</a>
			{/each}
		</div>
	</nav>
</div>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: min(1128px, calc(100% - 48px));
		min-height: 44px;
		margin-inline: auto;
		padding-block: 6px;
		color: var(--color-foreground);
		border-bottom: 1px solid color-mix(in srgb, var(--color-foreground) 10%, transparent);
		font:
			500 12px / 1.5 'Inter Variable',
			sans-serif;
	}
	nav > a,
	nav div {
		display: flex;
		align-items: center;
		gap: 20px;
	}
	a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--color-muted);
		text-decoration: none;
		padding-block: 8px;
	}
	a[aria-current] {
		color: var(--color-foreground);
		text-decoration: underline;
		text-underline-offset: 5px;
	}
	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}
	@media (max-width: 600px) {
		nav > a span {
			display: none;
		}
		nav div {
			gap: 14px;
		}
	}
</style>
