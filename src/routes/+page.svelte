<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Button, Pill, Surface, Theme, ThemeModeToggle } from 'bref-ui';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/syne';
	import Demos from './catalog/demos.svelte';
</script>

<svelte:head>
	<title>bref-ui/themes · Svelte themes & demos</title>
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
			<a data-brand href={resolve('/')} aria-label="bref-ui/themes home">
				<img src={asset('favicon.svg')} alt="" width="40" height="40" />
				<strong>bref-ui<span data-slash>/</span>themes</strong>
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
						<Button
							href={resolve('/(themes)/themes/[theme]', { theme: 'vscode' })}
							label="VS Code theme"
							trailingIcon={{ name: 'arrow_outward' }}
							size="small"
						/>
					</nav>
				</div>
				<a
					data-vscode-preview
					href={resolve('/(themes)/themes/[theme]', { theme: 'vscode' })}
					data-sveltekit-reload
				>
					<img
						src={asset('previews/vscode.jpg')}
						alt="VS Code component theme rendered in a browser"
						width="1440"
						height="960"
						loading="lazy"
					/>
					<span>VS Code · Explore the component reference ↗</span>
				</a>
				<div data-wip-themes>
					{#each [{ name: 'Liquid Glass', description: 'A study in translucent surfaces and soft depth.' }, { name: 'Minimalist Blocky', description: 'Bold geometry, clear structure, fewer distractions.' }] as theme (theme.name)}
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
		<footer>
			<span>Svelte components. Native CSS.</span>
			<nav aria-label="Bref resources">
				<a href="https://feuersteiner.github.io/bref-ui/">Bref documentation</a>
				<a href="https://github.com/feuersteiner/bref-ui-themes">GitHub</a>
				<a href="https://discord.gg/JpgQRTUsVS">Discord</a>
			</nav>
		</footer>
	</div>
</Theme>

<style>
	:global(:root) {
		--font-text: 'Inter Variable', 'Inter', sans-serif;
		--font-display: 'Syne Variable', 'Syne', sans-serif;
	}
	:global(body) {
		font: 400 16px / 24px var(--font-text);
		font-synthesis: none;
	}
	[data-showcase] {
		--showcase-rule: color-mix(in srgb, var(--color-foreground) 10%, transparent);
		width: min(1128px, calc(100% - 48px));
		margin: auto;
	}
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		min-height: 72px;
		padding-block: 12px;
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
		white-space: nowrap;
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
		padding-block: 48px;
	}
	[data-eyebrow] {
		color: var(--color-muted);
		font-size: 14px;
	}
	h1,
	h2,
	h3 {
		font-family: var(--font-display);
	}
	h1 {
		font-size: clamp(36px, 5vw, 64px);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: -0.045em;
		margin-block: 20px;
	}
	[data-intro] > p:last-child {
		max-width: 60ch;
		color: var(--color-muted);
		font-size: 18px;
		line-height: 1.5;
	}
	section {
		margin-bottom: 48px;
		padding-top: 24px;
		border-top: 1px solid color-mix(in srgb, var(--color-foreground) 6%, transparent);
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
		font-size: clamp(28px, 3vw, 36px);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: -0.025em;
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
	[data-vscode-preview] {
		display: block;
		margin-bottom: 24px;
		max-width: 720px;
	}
	[data-vscode-preview] img {
		width: 100%;
		height: auto;
		border-radius: 8px;
	}
	[data-vscode-preview] span {
		display: block;
		padding-block: 10px;
		font-size: 13px;
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
		flex: 1;
		min-width: 0;
		font-size: 24px;
		font-weight: 400;
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
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 16px;
		border-top: 1px solid var(--showcase-rule);
		padding-block: 24px;
		font-size: 12px;
		color: var(--color-muted);
	}
	footer nav {
		gap: 24px;
	}
	footer a:hover {
		color: var(--color-primary);
		text-decoration: underline;
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
		[data-intro] {
			padding-block: 24px;
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
		[data-brand] img {
			width: 32px;
			height: 32px;
		}
		strong {
			font-size: 20px;
		}
		footer {
			flex-direction: column;
		}
	}
</style>
