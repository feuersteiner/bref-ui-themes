<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { Button, Pill, Surface, Theme, ThemeModeToggle } from 'bref-ui';
	import type { IconName, ThemeMode } from 'bref-ui/types';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/syne';
	import Demos from './catalog/demos.svelte';
	import GithubStars from './catalog/github-stars.svelte';

	let mode = $state<ThemeMode>('light');
	const modes: ThemeMode[] = ['auto', 'light', 'dark'];
	const labels: Record<ThemeMode, string> = { auto: 'System', light: 'Light', dark: 'Dark' };
	const icons: Record<ThemeMode, IconName> = {
		auto: 'brightness_auto',
		light: 'light_mode',
		dark: 'dark_mode'
	};
	const cycleTheme = () => {
		mode = modes[(modes.indexOf(mode) + 1) % modes.length];
	};
</script>

<svelte:head>
	<title>bref-ui/themes · Svelte themes & demos</title>
	<meta
		name="description"
		content="Explore complete Bref demo sites and reusable Svelte themes. Relay, Forma, Elsewhere and New Paris are ready to try; more themes are on the way."
	/>
</svelte:head>

<Theme>
	<ThemeModeToggle {mode} />
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
			<span data-actions>
				<GithubStars {mode} />
				<Button
					variant="neutral"
					rounded
					size="small"
					icon={{ name: icons[mode], label: labels[mode] }}
					onClick={cycleTheme}
				/>
			</span>
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
							href={resolve('/(themes)/themes/[theme]', { theme: 'new-paris' })}
							label="New Paris theme"
							trailingIcon={{ name: 'arrow_outward' }}
							size="small"
						/>
					</nav>
				</div>
				<a
					data-theme-preview
					href={resolve('/(themes)/themes/[theme]', { theme: 'new-paris' })}
					data-sveltekit-reload
				>
					<img
						src={asset('previews/new-paris.jpg')}
						alt="New Paris components as rendered in a browser"
						width="1440"
						height="960"
						loading="lazy"
					/>
					<div>
						<h3>New Paris</h3>
						<p>
							Warm paper, sharp edges and editorial typography. Explore the complete component
							collection.
						</p>
						<span>Explore theme →</span>
					</div>
				</a>
				<div data-wip-themes>
					{#each [{ name: 'VS Code', description: 'An editor-inspired theme for focused work.' }, { name: 'Liquid Glass', description: 'A study in translucent surfaces and soft depth.' }] as theme (theme.name)}
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
			<nav aria-label="Bref UI resources">
				<h2>Bref UI</h2>
				<a href="https://github.com/feuersteiner/bref-ui">GitHub</a>
				<a href="https://feuersteiner.github.io/bref-ui/">Documentation</a>
			</nav>
			<nav aria-label="Bref themes resources">
				<h2>Themes</h2>
				<a href="https://github.com/feuersteiner/bref-ui-themes">GitHub</a>
				<a href="https://github.com/feuersteiner/bref-ui-themes#library-imports">Documentation</a>
			</nav>
			<nav aria-label="Community">
				<h2>Community</h2>
				<a href="https://discord.gg/JpgQRTUsVS">Discord</a>
				<a href="https://x.com/feuersteinnnnn">Twitter / X</a>
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
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 12px;
		min-height: 72px;
		padding-block: 12px;
		border-bottom: 1px solid var(--showcase-rule);
	}
	header nav {
		justify-content: flex-end;
		margin-right: 12px;
	}
	[data-actions] {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
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
	[data-theme-preview] {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		align-items: center;
		padding: 20px;
		border: 1px solid var(--showcase-rule);
		margin-bottom: 24px;
	}
	[data-theme-preview] img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--showcase-rule);
	}
	[data-theme-preview] p {
		font-size: 13px;
		line-height: 1.6;
		color: var(--color-muted);
		margin-block: 12px;
	}
	[data-theme-preview] span {
		font-size: 12px;
		font-weight: 600;
		color: var(--color-primary);
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
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
		border-top: 1px solid var(--showcase-rule);
		padding-block: 32px;
		font-size: 13px;
		color: var(--color-muted);
	}
	footer nav {
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}
	footer h2 {
		font: 600 14px / 24px var(--font-text);
		color: var(--color-foreground);
		letter-spacing: normal;
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
		header {
			grid-template-columns: minmax(0, 1fr) auto;
		}
		[data-brand] {
			grid-column: 1 / -1;
		}
		header nav {
			justify-content: flex-start;
			margin-right: 0;
		}
		[data-intro] {
			padding-block: 24px;
		}
		[data-section-heading] {
			align-items: flex-start;
			flex-direction: column;
			gap: 8px;
		}
		[data-theme-preview] {
			grid-template-columns: 1fr;
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
			grid-template-columns: 1fr;
		}
	}
</style>
