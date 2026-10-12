<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		Theme,
		Button,
		Checkbox,
		Dialog,
		Icon,
		Pill,
		PillChoiceGroup,
		PillGroup,
		Popover,
		Progress,
		Select,
		Spinner,
		Surface,
		TextInput
	} from '#lib/vscode/index.js';
	import type { Size, Variant, Color } from 'bref-ui/types';
	let enabled = $state(true);
	let name = $state('');
	let submitted = $state(false);
	let open = $state(false);
	let popover = $state(false);
	let language = $state<string | string[]>('ts');
	let languages = $state<string | string[]>(['ts']);
	let selection = $state<string | string[]>('default');
	let multiple = $state<string | string[]>(['lint']);
	let seek = $state(0.42);
	let presses = $state(0);
	let tags = $state([
		{ id: 'svelte', label: 'Svelte' },
		{ id: 'typescript', label: 'TypeScript' },
		{ id: 'css', label: 'CSS' }
	]);
	let removable = $state(true);
	const options = [
		{ id: 'ts', label: 'TypeScript', icon: { name: 'code' as const } },
		{ id: 'js', label: 'JavaScript' },
		{ id: 'locked', label: 'Unavailable language', disabled: true }
	];
	const sizes: Size[] = ['x-small', 'small', 'medium', 'large', 'x-large'];
	const variants: Variant[] = ['neutral', 'soft', 'filled'];
	const colors: Exclude<Color, 'background'>[] = [
		'primary',
		'secondary',
		'foreground',
		'muted',
		'info',
		'success',
		'warning',
		'error'
	];
</script>

<Theme>
	<div data-vscode-gallery>
		<a class="skip" href="#components">Skip to components</a>
		<nav aria-label="Theme demonstrations" data-sveltekit-reload>
			<a href={resolve('/')}>← Showcase</a>
			<div>
				{#each ['relay', 'forma', 'elsewhere', 'vscode'] as theme (theme)}<a
						href={resolve('/(themes)/themes/[theme]', { theme })}
						aria-current={theme === 'vscode' ? 'page' : undefined}
						>{theme === 'vscode' ? 'VS Code' : theme[0].toUpperCase() + theme.slice(1)}</a
					>{/each}
			</div>
		</nav>
		<header>
			<p class="eyebrow"><Icon name="code" /> BREF / THEME COLLECTION</p>
			<h1>VS Code<span>Component reference</span></h1>
			<p>Editor colors. Workbench precision. Native Bref interactions.</p>
			<code>import &#123; Theme, Button &#125; from 'bref-ui-themes/vscode';</code>
		</header>
		<main id="components" tabindex="-1">
			<section aria-labelledby="buttons">
				<div class="section-title">
					<h2 id="buttons">01 <span>Buttons</span></h2>
					<code>Button</code>
				</div>
				<p class="note">Neutral, soft and filled; five sizes. Tab to inspect focus.</p>
				{#each variants as variant (variant)}<div class="row">
						<span class="key">{variant}</span>{#each sizes as size (size)}<Button
								label={size}
								{size}
								{variant}
								color="primary"
								onClick={() => presses++}
							/>{/each}
					</div>{/each}
				<div class="row">
					<Button label="Disabled" disabled /><Button
						label="Pressed"
						aria-pressed="true"
						color="primary"
						variant="soft"
					/><Button
						icon={{ name: 'settings', label: 'Settings example' }}
						size="small"
						onClick={() => presses++}
					/><Button
						icon={{ name: 'add', label: 'Rounded example' }}
						rounded
						size="small"
						onClick={() => presses++}
					/><Button href="#inputs" label="Link button" size="small" /><Button
						href="#inputs"
						label="Disabled link"
						disabled
						size="small"
					/><span role="status">Activations: {presses}</span>
				</div>
				<div class="colors">
					{#each colors as color (color)}<Button
							label={color}
							size="small"
							variant="soft"
							{color}
						/>{/each}
				</div>
			</section>
			<section aria-labelledby="inputs">
				<div class="section-title">
					<h2 id="inputs">02 <span>Inputs & selection</span></h2>
					<code>TextInput · Checkbox · Select</code>
				</div>
				<div class="grid">
					<form
						onsubmit={(event) => {
							event.preventDefault();
							submitted = true;
						}}
						novalidate
					>
						<label for="setting-name">Setting name</label><TextInput
							id="setting-name"
							bind:value={name}
							placeholder="editor.fontSize"
							icon={{ name: 'search' }}
							required
							aria-invalid={submitted && !name.trim()}
							aria-describedby="name-feedback"
							wide
						/>
						<p
							id="name-feedback"
							class:error={submitted && !name.trim()}
							role={submitted && !name.trim() ? 'alert' : 'status'}
						>
							{submitted
								? name.trim()
									? `Accepted: ${name}`
									: 'Enter a setting name.'
								: 'Submit an empty value to inspect the error state.'}
						</p>
						<Button
							type="submit"
							label="Validate input"
							variant="filled"
							color="primary"
							size="small"
						/>
						<label for="readonly">Read only</label><TextInput
							id="readonly"
							value="workbench.colorTheme"
							readonly
							wide
						/>
						<label for="disabled-input">Disabled</label><TextInput
							id="disabled-input"
							value="Managed by policy"
							disabled
							wide
						/>
						<div class="row">
							{#each ['small', 'medium', 'large'] as size (size)}<TextInput
									aria-label={`${size} input`}
									placeholder={size}
									size={size as 'small' | 'medium' | 'large'}
								/>{/each}
						</div>
					</form>
					<div class="control-stack">
						<label for="language">Language</label><Select
							id="language"
							items={options}
							bind:value={language}
						/>
						<p class="note">Selected: {language}. Open, Tab to an option, then Enter.</p>
						<label for="languages">Multiple languages</label><Select
							id="languages"
							items={options}
							bind:value={languages}
							size="small"
						/>
						<label for="disabled-select">Disabled select</label><Select
							id="disabled-select"
							items={options}
							value="ts"
							disabled
						/>
						<label for="empty-select">Empty select</label><Select
							id="empty-select"
							items={[]}
							placeholder="No languages"
							size="large"
						/>
						<div class="checks">
							<label><Checkbox bind:checked={enabled} /> Enable formatting</label><label
								><Checkbox checked disabled /> Disabled checked</label
							><label><Checkbox disabled /> Disabled unchecked</label><label
								><Checkbox aria-invalid="true" /> Error checkbox</label
							>
						</div>
						<div class="row">
							{#each sizes as size (size)}<label class="size-check"
									><Checkbox {size} aria-label={`${size} checkbox`} />{size}</label
								>{/each}
						</div>
					</div>
				</div>
			</section>
			<section aria-labelledby="pills">
				<div class="section-title">
					<h2 id="pills">03 <span>Tags & choices</span></h2>
					<code>Pill · PillGroup · PillChoiceGroup</code>
				</div>
				<div class="row">
					{#each variants as variant (variant)}<Pill
							label={variant}
							{variant}
							color="secondary"
							icon={{ name: 'label' }}
						/>{/each}<Pill
						label="Activate tag"
						onClick={() => presses++}
						color="primary"
					/>{#if removable}<Pill
							label="Removable tag"
							onDelete={() => (removable = false)}
						/>{:else}<Button
							label="Restore tag"
							size="small"
							onClick={() => (removable = true)}
						/>{/if}
				</div>
				<div class="row">
					{#each sizes as size (size)}<Pill
							label={size}
							{size}
							color="info"
							variant="soft"
						/>{/each}
				</div>
				<div class="grid">
					<div class="control-stack">
						<h3>Removable group</h3>
						<PillGroup
							items={tags}
							onDelete={(id) => (tags = tags.filter((tag) => tag.id !== id))}
							size="small"
						/><Button
							label="Reset tags"
							size="small"
							onClick={() =>
								(tags = [
									{ id: 'svelte', label: 'Svelte' },
									{ id: 'typescript', label: 'TypeScript' },
									{ id: 'css', label: 'CSS' }
								])}
						/>
					</div>
					<div class="control-stack">
						<h3>Single choice / native radios</h3>
						<PillChoiceGroup
							aria-label="Formatting mode"
							items={[
								{ id: 'default', label: 'Default' },
								{ id: 'compact', label: 'Compact' },
								{ id: 'expanded', label: 'Expanded' }
							]}
							bind:selection
							color="primary"
							size="small"
						/>
						<p class="note">Mode: {selection}</p>
						<h3>Multiple choice / native checkboxes</h3>
						<PillChoiceGroup
							aria-label="Checks"
							items={[
								{ id: 'lint', label: 'Lint' },
								{ id: 'types', label: 'Types' }
							]}
							bind:selection={multiple}
							variant="soft"
							color="success"
						/><PillChoiceGroup
							aria-label="Disabled choices"
							items={[{ id: 'locked', label: 'Locked choice' }]}
							selection="locked"
							disabled
						/>
					</div>
				</div>
			</section>
			<section aria-labelledby="feedback">
				<div class="section-title">
					<h2 id="feedback">04 <span>Feedback & icons</span></h2>
					<code>Progress · Spinner · Icon</code>
				</div>
				<div class="grid">
					<div class="control-stack">
						<label for="seek">Seekable progress · {Math.round(seek * 100)}%</label><Progress
							id="seek"
							value={seek}
							onSeek={(value) => (seek = value)}
						/><Progress label="Disabled seek" value={0.6} onSeek={() => {}} disabled /><Progress
							label="Indeterminate progress"
						/>
						<div class="row">
							{#each ['small', 'medium', 'large'] as size (size)}<div class="progress-sample">
									<span>{size}</span><Progress
										label={`${size} progress`}
										value={0.65}
										size={size as 'small' | 'medium' | 'large'}
									/>
								</div>{/each}
						</div>
					</div>
					<div class="control-stack">
						<h3>Loading indicators</h3>
						<div class="row">
							{#each sizes as size (size)}<Spinner
									label={`${size} loading example`}
									{size}
								/>{/each}
						</div>
						<h3>Semantic icons</h3>
						<div class="row">
							{#each colors as color (color)}<Icon
									name="circle"
									label={`${color} icon`}
									{color}
									size="medium"
								/>{/each}
						</div>
						<div class="row">
							{#each sizes as size (size)}<Icon
									name="code"
									label={`${size} code icon`}
									{size}
								/>{/each}<Icon name="star" filled label="Filled star" color="warning" />
						</div>
					</div>
				</div>
			</section>
			<section aria-labelledby="surfaces">
				<div class="section-title">
					<h2 id="surfaces">05 <span>Surfaces & overlays</span></h2>
					<code>Surface · Popover · Dialog</code>
				</div>
				<div class="surface-grid">
					{#each variants as variant (variant)}<Surface
							{variant}
							color="background"
							spacing="medium"
							radius="0.1875rem"
							><h3>{variant}</h3>
							<p>A crisp container with semantic paint and explicit spacing.</p>
							<Pill label="Surface" size="x-small" /></Surface
						>{/each}
				</div>
				<div class="row">
					<Surface
						width="fit"
						orientation="horizontal"
						variant="soft"
						spacing="small"
						radius="0.125rem"
						hover="small"><Icon name="info" color="info" /><span>Horizontal surface</span></Surface
					><Surface width="fit" spacing="small" radius="0.125rem" glass shadow
						><span>Glass / shadow</span></Surface
					>
				</div>
				<Surface
					scroll
					spacing="small"
					radius="0.125rem"
					style="max-height: 96px"
					aria-label="Scrollable surface"
					>{#each [1, 2, 3, 4, 5] as line (line)}<p>
							Scrollable content, line {line}. Focus and use the arrow keys.
						</p>{/each}</Surface
				>
				<div class="row">
					<Popover bind:open={popover} spacing="medium" radius="0.1875rem"
						>{#snippet trigger()}<Button
								label="Open popover"
								aria-expanded={popover}
								size="small"
								onClick={() => (popover = !popover)}
							/>{/snippet}
						<h3>Popover reference</h3>
						<p>Native light dismissal and Escape.</p>
						<Button label="Close popover" size="small" onClick={() => (popover = false)} /></Popover
					><Popover disabled spacing="small"
						>{#snippet trigger()}<Button label="Disabled popover" disabled size="small" />{/snippet}
						<p>Disabled content</p></Popover
					><Button
						label="Open dialog"
						size="small"
						variant="filled"
						color="primary"
						onClick={() => (open = true)}
					/>
				</div>
			</section>
		</main>
		<footer>
			<span>14 exports · one reusable theme</span><a href={resolve('/')} data-sveltekit-reload
				>Back to showcase ↗</a
			>
		</footer>
		<Dialog
			bind:open
			header={{
				title: 'Dialog reference',
				icon: { name: 'settings' },
				description: 'Native modal focus, Escape and return to trigger.'
			}}
			footer={{
				primary: { label: 'Done', onClick: () => (open = false) },
				secondary: { label: 'Cancel', onClick: () => (open = false) }
			}}
			size="small"
			><label for="dialog-setting">Example value</label><TextInput
				id="dialog-setting"
				placeholder="Type here"
				wide
			/>
			<p>
				Tab and Shift+Tab cycle within the dialog. Small screens use the native full-screen
				presentation.
			</p></Dialog
		>
	</div>
</Theme>

<style>
	[data-vscode-gallery] {
		max-width: 1180px;
		padding: 0 32px;
		margin: auto;
	}
	nav,
	nav div,
	.row,
	.colors {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
	}
	nav {
		justify-content: space-between;
		border-bottom: 1px solid var(--vscode-border);
		padding: 16px 0;
	}
	nav div {
		gap: 20px;
	}
	nav a {
		text-decoration: none;
		color: var(--color-muted);
	}
	nav a[aria-current] {
		color: var(--color-foreground);
		border-bottom: 2px solid var(--color-primary);
	}
	header {
		padding: 32px 0 24px;
	}
	.eyebrow {
		display: flex;
		align-items: center;
		gap: 8px;
		font:
			11px / 1.5 ui-monospace,
			monospace;
		color: var(--color-info);
		letter-spacing: 0.08em;
	}
	h1 {
		margin: 12px 0;
		font-size: 36px;
		line-height: 1.2;
		color: #f0f0f0;
	}
	h1 span {
		display: inline-block;
		margin-left: 16px;
		color: var(--color-muted);
		font-size: 16px;
	}
	code {
		font:
			12px / 1.6 ui-monospace,
			'SFMono-Regular',
			Consolas,
			monospace;
		color: var(--color-info);
		overflow-wrap: anywhere;
	}
	header > code {
		display: block;
		border-left: 2px solid var(--color-primary);
		padding: 8px 12px;
		background: var(--vscode-panel);
	}
	section {
		display: grid;
		gap: 16px;
		padding: 24px 0;
		border-top: 1px solid var(--vscode-border);
		scroll-margin-top: 16px;
	}
	.section-title {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px;
	}
	h2 {
		font:
			12px / 1.5 ui-monospace,
			monospace;
		color: var(--color-muted);
		margin: 0;
	}
	h2 span {
		margin-left: 10px;
		font:
			500 18px / 1.5 'Segoe UI',
			system-ui,
			sans-serif;
		color: var(--color-foreground);
	}
	h3 {
		font-size: 13px;
		margin: 0;
	}
	p {
		margin: 0;
	}
	.note,
	.key,
	footer {
		color: var(--color-muted);
	}
	.key {
		min-width: 52px;
		font:
			12px / 1.5 ui-monospace,
			monospace;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 32px;
	}
	form,
	.control-stack {
		display: grid;
		align-content: start;
		gap: 10px;
		min-width: 0;
	}
	form > label:not(:first-child) {
		margin-top: 8px;
	}
	.error {
		color: var(--color-error);
	}
	.checks {
		display: grid;
		gap: 12px;
		padding: 8px 0;
	}
	.checks label,
	.size-check {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.size-check {
		flex-direction: column;
		font-size: 11px;
	}
	.progress-sample {
		display: grid;
		flex: 1;
		min-width: 60px;
		gap: 8px;
	}
	.surface-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
	}
	footer {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 20px 0;
		border-top: 1px solid var(--vscode-border);
	}
	.skip {
		position: fixed;
		left: 8px;
		top: 8px;
		z-index: 10;
		padding: 8px 12px;
		background: var(--vscode-panel);
		transform: translateY(-160%);
	}
	.skip:focus {
		transform: none;
	}
	@media (max-width: 680px) {
		[data-vscode-gallery] {
			padding: 0 16px;
		}
		.grid,
		.surface-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		h1 span {
			display: block;
			margin: 8px 0 0;
		}
		nav div {
			gap: 12px;
		}
		footer {
			flex-wrap: wrap;
		}
	}
</style>
