<script lang="ts">
	import { resolve } from '$app/paths';
	import { Relay, Forma, Elsewhere } from '#lib';
	import type { PageProps } from './$types.js';
	let { data }: PageProps = $props();
	const themes = { relay: Relay, forma: Forma, elsewhere: Elsewhere };
	const components = $derived(themes[data.theme]);
	const name = $derived(data.theme[0].toUpperCase() + data.theme.slice(1));
	let checked = $state(true);
	let open = $state(false);
	let value = $state('');
	let choice = $state<string | string[]>('one');
</script>

<svelte:head
	><title>{name} theme | Bref</title><meta
		name="description"
		content={`Try the exported ${name} theme and its components.`}
	/></svelte:head
>

<components.Theme>
	<div data-theme-gallery>
		<nav aria-label="Theme demonstrations" data-sveltekit-reload>
			<a href={resolve('/')}>← Showcase</a>
			<div>
				{#each ['relay', 'forma', 'elsewhere', 'glassy'] as theme (theme)}<a
						href={resolve('/(themes)/themes/[theme]', { theme })}
						aria-current={data.theme === theme ? 'page' : undefined}
						>{theme[0].toUpperCase() + theme.slice(1)}</a
					>{/each}
			</div>
		</nav>
		<main>
			<h1>{name}</h1>
			<p data-muted>
				Reusable theme and copied Bref components. The complete site demo uses this same source.
			</p>
			<p><code>import &#123; Theme, Button &#125; from 'bref-ui-themes/{data.theme}';</code></p>
			<section aria-labelledby="buttons">
				<h2 id="buttons">Buttons</h2>
				{#each ['neutral', 'soft', 'filled'] as variant (variant)}<div data-actions>
						<span>{variant}</span
						>{#each ['small', 'medium', 'large'] as size (size)}<components.Button
								label={size}
								variant={variant as 'neutral' | 'soft' | 'filled'}
								size={size as 'small' | 'medium' | 'large'}
								color="primary"
							/>{/each}
					</div>{/each}
				<div data-actions>
					<components.Button label="Disabled" disabled /><components.Button
						label="Open dialog"
						variant="filled"
						color="primary"
						onClick={() => (open = true)}
					/>
				</div>
			</section>
			<section aria-labelledby="controls">
				<h2 id="controls">Native controls</h2>
				<div data-form>
					<label
						><span>Project name</span><components.TextInput
							bind:value
							placeholder="A new project"
						/></label
					>
					<label
						><span>Project</span><components.Select
							items={[
								{ id: 'one', label: 'First project' },
								{ id: 'two', label: 'Second project' }
							]}
							bind:value={choice}
						/></label
					>
					<label data-checkbox-label
						><components.Checkbox bind:checked /><span>Ready for review</span></label
					>
					<label data-checkbox-label
						><components.Checkbox disabled checked /><span>Disabled checkbox</span></label
					>
				</div>
			</section>
			<section aria-labelledby="feedback">
				<h2 id="feedback">Feedback & surfaces</h2>
				<div data-actions>
					<components.Pill label="In progress" color="primary" /><components.Pill
						label="Ready"
						color="success"
					/><components.Spinner label="Loading example" />
				</div>
				<components.Progress value={0.65} aria-label="Project progress" /><components.Surface
					variant="soft"
					radius="medium"
					spacing="large"
					><p>Theme colors, native CSS and reusable components.</p></components.Surface
				>
			</section>
		</main>
		<components.Dialog
			bind:open
			header={{
				title: 'Review project',
				icon: { name: 'task_alt' },
				description: 'Try Tab, Shift+Tab and Escape.'
			}}
			footer={{
				primary: { label: 'Done', onClick: () => (open = false) },
				secondary: { label: 'Cancel', onClick: () => (open = false) }
			}}
			><p>
				Keyboard focus stays in this dialog and returns to the trigger when it closes.
			</p></components.Dialog
		>
	</div>
</components.Theme>

<style>
	[data-theme-gallery] {
		max-width: 1040px;
		padding: 24px;
		margin: auto;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 20px;
		padding-bottom: 24px;
		border-bottom: 1px solid color-mix(in srgb, var(--color-foreground) 15%, transparent);
	}
	nav div {
		display: flex;
		gap: 20px;
	}
	a {
		color: inherit;
	}
	a[aria-current] {
		font-weight: 600;
	}
	h1 {
		font-size: 48px;
		margin: 40px 0 16px;
	}
	code {
		overflow-wrap: anywhere;
	}
	section {
		display: grid;
		gap: 24px;
		margin-top: 48px;
	}
	h2 {
		font-size: 24px;
	}
	[data-actions] > span {
		min-width: 60px;
	}
	[data-form] {
		max-width: 400px;
	}
	label[data-checkbox-label] {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	@media (max-width: 500px) {
		[data-theme-gallery] {
			padding: 20px;
		}
		nav {
			gap: 16px;
		}
		nav div {
			gap: 14px;
		}
	}
</style>
