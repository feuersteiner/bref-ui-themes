<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Button, Pill, Surface, Theme, ThemeModeToggle } from 'bref-ui';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/syne';
	import Demos from './catalog/demos.svelte';
</script>

<svelte:head>
	<title>Bref themes & demos</title>
	<meta
		name="description"
		content="Explore complete Bref demo sites and reusable Svelte themes. Relay, Forma and Elsewhere are ready to try; more themes are on the way."
	/>
</svelte:head>

<Theme>
	<ThemeModeToggle mode="light" />
	<div data-showcase>
		<a data-skip href="#showcase-content">Skip to content</a>
		<header>
			<a data-brand href={resolve('/')} aria-label="Bref showcase home">
				<img src={asset('favicon.svg')} alt="" width="40" height="40" />
				<strong>bref<span data-slash>/</span>themes</strong>
			</a>
			<nav aria-label="Showcase">
				<Button href="#demos" label="Demos" size="small" /><Button
					href="#themes"
					label="Themes"
					size="small"
				/>
			</nav>
		</header>
		<main id="showcase-content" tabindex="-1">
			<div data-intro>
				<p data-eyebrow>Made with Bref · Built with Svelte</p>
				<h1>A few ways to<br />make it yours.</h1>
				<p>
					Complete demo sites, reusable themes, and room for what comes next. Explore the details.
					Try the interactions.
				</p>
			</div>
			<section id="demos" aria-labelledby="demos-heading">
				<div data-section-heading>
					<h2 id="demos-heading">Demos</h2>
					<p>Three complete sites. Ready to explore.</p>
				</div>
				<Demos />
			</section>
			<section id="themes" aria-labelledby="themes-heading">
				<div data-section-heading>
					<h2 id="themes-heading">Themes</h2>
					<p>Reusable foundations, with more on the way.</p>
				</div>
				<div data-available>
					<p>Available now</p>
					<nav aria-label="Implemented theme demonstrations" data-sveltekit-reload>
						<Button
							href={resolve('/(themes)/themes/[theme]', { theme: 'relay' })}
							label="Relay theme"
							trailingIcon={{ name: 'arrow_outward' }}
							size="small"
						/>
						<Button
							href={resolve('/(themes)/themes/[theme]', { theme: 'forma' })}
							label="Forma theme"
							trailingIcon={{ name: 'arrow_outward' }}
							size="small"
						/>
						<Button
							href={resolve('/(themes)/themes/[theme]', { theme: 'elsewhere' })}
							label="Elsewhere theme"
							trailingIcon={{ name: 'arrow_outward' }}
							size="small"
						/>
					</nav>
				</div>
				<div data-wip-themes>
					{#each [{ name: 'VS Code', description: 'An editor-inspired theme for focused work.' }, { name: 'Liquid Glass', description: 'A study in translucent surfaces and soft depth.' }, { name: 'Minimalist Blocky', description: 'Bold geometry, clear structure, fewer distractions.' }] as theme (theme.name)}
						<article>
							<Surface variant="soft" radius="medium" spacing="large" height="fill">
								<div data-theme-heading>
									<h3>{theme.name}</h3>
									<Pill label="WIP" size="x-small" color="muted" variant="soft" />
								</div>
								<p>{theme.description}</p>
								<small>Planned · demonstration coming later</small>
							</Surface>
						</article>
					{/each}
				</div>
			</section>
		</main>
		<footer><span>Bref themes & demos</span><span>Svelte components. Native CSS.</span></footer>
	</div>
</Theme>

<style>
	:global(:root) {
		--font-text: 'Inter Variable', sans-serif;
		--font-display: 'Syne Variable', sans-serif;
	}
	[data-showcase] {
		--showcase-rule: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		max-width: 1280px;
		margin: auto;
		padding-inline: 40px;
	}
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding-block: 24px;
		border-bottom: 1px solid var(--showcase-rule);
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}
	[data-brand] {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	strong {
		font: 700 24px / 1.2 var(--font-display);
	}
	[data-slash] {
		color: var(--color-primary);
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	[data-intro] {
		padding-block: 76px 68px;
	}
	[data-eyebrow] {
		color: var(--color-muted);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.13em;
	}
	h1,
	h2,
	h3 {
		font-family: var(--font-display);
	}
	h1 {
		font-size: clamp(44px, 6vw, 76px);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.04em;
		margin-block: 20px 24px;
	}
	[data-intro] > p:last-child {
		max-width: 470px;
		color: var(--color-muted);
		font-size: 16px;
		line-height: 1.65;
	}
	section {
		margin-bottom: 64px;
		scroll-margin-top: 24px;
	}
	[data-section-heading] {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 24px;
	}
	h2 {
		font-size: 28px;
		font-weight: 500;
	}
	[data-section-heading] p {
		font-size: 13px;
		color: var(--color-muted);
	}
	[data-available] {
		border-block: 1px solid var(--showcase-rule);
		padding-block: 18px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}
	[data-available] p {
		font-size: 13px;
		color: var(--color-primary);
		font-weight: 600;
	}
	[data-wip-themes] {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}
	[data-theme-heading] {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}
	h3 {
		font-size: 18px;
		font-weight: 500;
	}
	article p {
		font-size: 13px;
		line-height: 1.6;
		color: var(--color-muted);
	}
	small {
		font-size: 11px;
		color: var(--color-muted);
	}
	footer {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		border-top: 1px solid var(--showcase-rule);
		padding-block: 24px;
		font-size: 12px;
		color: var(--color-muted);
	}
	[data-skip] {
		position: fixed;
		top: 8px;
		left: 8px;
		padding: 12px;
		background: var(--color-background);
		z-index: 10;
		transform: translateY(-160%);
	}
	[data-skip]:focus {
		transform: none;
	}
	@media (max-width: 780px) {
		[data-showcase] {
			padding-inline: 20px;
		}
		[data-intro] {
			padding-block: 48px;
		}
		[data-section-heading] {
			align-items: flex-start;
			flex-direction: column;
			gap: 8px;
		}
		[data-wip-themes] {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 400px) {
		footer {
			flex-direction: column;
		}
	}
</style>
