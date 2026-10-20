<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Icon, Surface } from 'bref-ui';
	const demos = [
		{
			name: 'Tasks',
			href: resolve('/(sites)/(relay)/relay'),
			preview: 'relay',
			description: 'A project workspace. Complete, organize and edit tasks.'
		},
		{
			name: 'House Shop',
			href: resolve('/(sites)/(forma)/forma'),
			preview: 'forma',
			description: 'A furniture shop. Browse the catalog and manage your cart.'
		},
		{
			name: 'Site Reviewer',
			href: resolve('/(sites)/(elsewhere)/elsewhere'),
			preview: 'elsewhere',
			description: 'An agent workspace. Run a sample website audit and review its findings.'
		}
	] as const;
</script>

<div data-live-demos>
	{#each demos as demo (demo.preview)}
		<a href={demo.href} data-sveltekit-reload>
			<Surface variant="soft" radius="medium" spacing="medium" hover="medium" height="fill">
				<img
					src={asset(`previews/${demo.preview}.jpg`)}
					alt={`${demo.name} demo as rendered in a browser`}
					width="1440"
					height="960"
					loading="lazy"
				/>
				<h3>{demo.name}<Icon name="arrow_outward" /></h3>
				<p>{demo.description}</p>
				<span data-link>Explore demo</span>
			</Surface>
		</a>
	{/each}
</div>

<style>
	[data-live-demos] {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}
	a {
		display: block;
		color: var(--color-foreground);
		text-decoration: none;
		min-width: 0;
	}
	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
		border-radius: 1.5rem;
	}
	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 3/2;
		object-fit: cover;
		object-position: top;
		border-radius: 0.5rem;
	}
	h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font: 400 24px / 1.2 var(--font-display);
	}
	p {
		color: var(--color-muted);
		font-size: 14px;
		line-height: 1.6;
	}
	[data-link] {
		font-size: 13px;
		font-weight: 600;
		color: var(--color-primary);
	}
	@media (max-width: 780px) {
		[data-live-demos] {
			grid-template-columns: 1fr;
		}
	}
</style>
