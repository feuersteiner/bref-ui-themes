<script lang="ts">
	import { resolve } from '$app/paths';
	import { onDestroy } from 'svelte';
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
	} from '#lib/new-paris/index.js';
	const variants = ['neutral', 'soft', 'filled'] as const;
	const sizes = ['x-small', 'small', 'medium', 'large', 'x-large'] as const;
	const colors = [
		'primary',
		'secondary',
		'foreground',
		'muted',
		'info',
		'success',
		'warning',
		'error'
	] as const;
	const options = [
		{ id: 'paper', label: 'Paper', icon: { name: 'article' as const } },
		{ id: 'ink', label: 'Ink', icon: { name: 'format_color_fill' as const } },
		{ id: 'archive', label: 'Archive (disabled)', disabled: true }
	];
	const choices = [
		{ id: 'edition', label: 'Edition' },
		{ id: 'journal', label: 'Journal' },
		{ id: 'notes', label: 'Notes' }
	];
	let value = $state('');
	let email = $state('');
	let error = $state('');
	let submitted = $state(false);
	let checked = $state(true);
	let selection = $state<string | string[]>('paper');
	let multiple = $state<string | string[]>([]);
	let singleChoice = $state<string | string[]>('edition');
	let multiChoice = $state<string | string[]>(['journal']);
	let tags = $state([
		{ id: 'type', label: 'Typography' },
		{ id: 'space', label: 'Spacing' },
		{ id: 'grid', label: 'Grid' }
	]);
	let pillVisible = $state(true);
	let pillClicks = $state(0);
	let progress = $state(0.64);
	let popoverOpen = $state(false);
	let open = $state(false);
	let lockedOpen = $state(false);
	let dialogSize = $state<'small' | 'medium' | 'large'>('medium');
	let dialogStep = $state(false);
	let busy = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;
	onDestroy(() => clearTimeout(timer));
	function load() {
		busy = true;
		timer = setTimeout(() => (busy = false), 1400);
	}
	function validate(event: SubmitEvent) {
		event.preventDefault();
		error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			? ''
			: 'Enter an email address, such as bonjour@example.com.';
		submitted = !error;
	}
</script>

<Theme>
	<div data-new-paris-showcase>
		<a class="skip" href="#specimens">Skip to components</a>
		<nav class="masthead" aria-label="Theme demonstrations" data-sveltekit-reload>
			<a href={resolve('/')} class="brand">bref-ui<span>/</span>themes</a>
			<div class="theme-links">
				{#each ['relay', 'forma', 'elsewhere'] as theme (theme)}
					<a href={resolve('/(themes)/themes/[theme]', { theme })}
						>{theme[0].toUpperCase() + theme.slice(1)}</a
					>
				{/each}
				<a href={resolve('/(themes)/themes/[theme]', { theme: 'new-paris' })} aria-current="page"
					>New Paris</a
				>
			</div>
		</nav>
		<main id="specimens" tabindex="-1">
			<header class="hero">
				<div class="hero-copy">
					<p data-eyebrow>Collection 04 / Component study</p>
					<h1>NEW<br />PARIS<span>.</span></h1>
					<p class="dek">Clear by design.<br /><span>Distinctly New Paris.</span></p>
				</div>
				<div class="hero-aside">
					<div class="monogram" aria-hidden="true">
						<span>n<span class="serif">p</span></span><small>PARIS — 04</small>
					</div>
					<p>
						A clear visual language.<br />Built for everyday interfaces.
					</p>
					<div class="swatches" aria-label="Theme palette">
						<span style="--swatch: #1e231f" title="Ink #1e231f"></span><span
							style="--swatch: #c6402d"
							title="Vermilion #c6402d"
						></span><span style="--swatch: #526750" title="Olive #526750"></span><span
							style="--swatch: #e1e3db"
							title="Stone #e1e3db"
						></span>
						<small>INK / VERMILION / OLIVE / STONE</small>
					</div>
				</div>
			</header>
			<div class="index-bar">
				<span>THE SPECIMENS</span><span>14 exports · Native interactions</span><a href="#usage"
					>Import this theme <Icon name="south_east" /></a
				>
			</div>
			<div class="specimen-grid">
				<section aria-labelledby="actions" class="actions-panel">
					<div class="section-title">
						<span>01</span>
						<h2 id="actions">Make a move.</h2>
						<small>Button</small>
					</div>
					<p data-caption>Three treatments. One clear intention.</p>
					{#each variants as variant (variant)}
						<div class="specimen-row">
							<span class="row-label">{variant}</span><Button
								label="Continue"
								{variant}
								color="primary"
								trailingIcon={{ name: 'arrow_forward' }}
								onClick={() => (pillClicks += 1)}
							/><Button
								{variant}
								icon={{ name: 'add', label: `Add (${variant})` }}
								color="foreground"
								onClick={() => (pillClicks += 1)}
							/>
						</div>
					{/each}
					<div class="row-divider"></div>
					<div class="row">
						<Button
							label={busy ? 'Loading…' : 'Try loading'}
							disabled={busy}
							aria-busy={busy}
							onClick={load}
							variant="filled"
							color="foreground"
						/>{#if busy}<Spinner label="Loading button example" size="small" />{/if}<Button
							label="Disabled"
							disabled
						/><Button label="Disabled link" href="#usage" disabled />
					</div>
					<div class="row">
						<Button label="Link button" href="#usage" icon={{ name: 'north_east' }} /><Button
							label="Pressed"
							aria-pressed="true"
							variant="soft"
							color="primary"
						/>
					</div>
					<p data-caption role="status">Actions activated: {pillClicks}</p>
				</section>
				<section aria-labelledby="inputs">
					<div class="section-title">
						<span>02</span>
						<h2 id="inputs">Leave a mark.</h2>
						<small>TextInput</small>
					</div>
					<p data-caption>Honest labels. Visible focus. Helpful feedback.</p>
					<form novalidate onsubmit={validate}>
						<label for="np-name">Edition name</label><TextInput
							id="np-name"
							bind:value
							placeholder="Something worth keeping"
							wide
							icon={{ name: 'edit' }}
						/>
						<label for="np-email">Email address <small>Required</small></label><TextInput
							id="np-email"
							type="email"
							bind:value={email}
							placeholder="bonjour@example.com"
							wide
							aria-invalid={error ? 'true' : undefined}
							aria-describedby="np-email-help"
							required
							oninput={() => {
								error = '';
								submitted = false;
							}}
						/>
						<p
							id="np-email-help"
							class:error={!!error}
							data-caption
							role={error ? 'alert' : undefined}
						>
							{error || 'Submit to try the error and success states.'}
						</p>
						<div class="row">
							<Button
								type="submit"
								label="Validate email"
								variant="filled"
								color="foreground"
							/>{#if submitted}<Pill label="Looks good" color="success" variant="soft" />{/if}
						</div>
					</form>
					<div class="row-divider"></div>
					<label for="np-readonly">Read only</label><TextInput
						id="np-readonly"
						value="Édition Nº 04"
						readonly
						wide
						variant="neutral"
					/>
					<label for="np-disabled">Disabled</label><TextInput
						id="np-disabled"
						value="Archived edition"
						disabled
						wide
						size="small"
					/>
				</section>
				<section aria-labelledby="selection">
					<div class="section-title">
						<span>03</span>
						<h2 id="selection">Choose carefully.</h2>
						<small>Select · Checkbox</small>
					</div>
					<div class="select-grid">
						<div>
							<label for="np-material">Material</label><Select
								id="np-material"
								items={options}
								bind:value={selection}
							/>
							<p data-caption>Selected: {selection}</p>
						</div>
						<div>
							<label for="np-multiple">Multiple selection</label><Select
								id="np-multiple"
								items={options}
								bind:value={multiple}
								placeholder="Choose materials"
							/>
						</div>
						<div>
							<label for="np-empty">Empty options</label><Select
								id="np-empty"
								items={[]}
								emptyMessage={{ message: 'No editions available', icon: { name: 'inbox' } }}
								size="small"
							/>
						</div>
						<div>
							<label for="np-unavailable">Disabled select</label><Select
								id="np-unavailable"
								size="small"
								items={options}
								value="ink"
								disabled
							/>
						</div>
					</div>
					<div class="row-divider"></div>
					<div class="checkboxes">
						<label><Checkbox bind:checked /><span>Ready for review</span></label><label
							><Checkbox /><span>Unchecked</span></label
						><label><Checkbox checked disabled /><span>Disabled, checked</span></label><label
							><Checkbox disabled /><span>Disabled, unchecked</span></label
						><label
							><Checkbox aria-invalid="true" aria-describedby="np-consent-error" /><span
								>Required consent</span
							></label
						>
					</div>
					<p id="np-consent-error" class="caption error">Error specimen: consent is required.</p>
				</section>
				<section aria-labelledby="pills">
					<div class="section-title">
						<span>04</span>
						<h2 id="pills">Small statements.</h2>
						<small>Pill · Groups</small>
					</div>
					<div class="row">
						{#each variants as variant (variant)}<Pill
								label={variant}
								{variant}
								color="primary"
							/>{/each}<Pill
							label="Activate pill"
							icon={{ name: 'bolt' }}
							onClick={() => (pillClicks += 1)}
						/>{#if pillVisible}<Pill
								label="Removable"
								onDelete={() => (pillVisible = false)}
							/>{:else}<Button
								label="Restore pill"
								size="small"
								onClick={() => (pillVisible = true)}
							/>{/if}
					</div>
					<h3>Single choice</h3>
					<PillChoiceGroup
						items={choices}
						bind:selection={singleChoice}
						aria-label="Edition format"
						color="primary"
					/>
					<p data-caption>Selected: {singleChoice}</p>
					<h3>Multiple choice</h3>
					<PillChoiceGroup
						items={choices}
						bind:selection={multiChoice}
						aria-label="Included sections"
						variant="soft"
						color="secondary"
					/>
					<h3>Disabled choice</h3>
					<PillChoiceGroup
						items={choices}
						selection="edition"
						disabled
						aria-label="Archived format"
						size="small"
					/>
					<h3>Removable group</h3>
					<PillGroup
						items={tags}
						onDelete={(id) => (tags = tags.filter((tag) => tag.id !== id))}
						aria-label="Design tags"
						size="small"
					/>{#if tags.length < 3}<Button
							label="Restore tags"
							size="small"
							onClick={() =>
								(tags = [
									{ id: 'type', label: 'Typography' },
									{ id: 'space', label: 'Spacing' },
									{ id: 'grid', label: 'Grid' }
								])}
						/>{/if}
				</section>
				<section aria-labelledby="surfaces" class="wide-panel">
					<div class="section-title">
						<span>05</span>
						<h2 id="surfaces">Room to breathe.</h2>
						<small>Surface</small>
					</div>
					<div class="surface-grid">
						{#each variants as variant, index (variant)}<Surface
								{variant}
								color={index === 2 ? 'foreground' : 'background'}
								spacing="large"
								shadow={index === 1 ? 'small' : false}
								><span data-eyebrow>0{index + 1} / {variant}</span>
								<h3>{['The quiet frame.', 'A softer ground.', 'A bold conclusion.'][index]}</h3>
								<p>Space does the work.<br />Every edge has a purpose.</p></Surface
							>{/each}
					</div>
					<div class="row">
						<a href="#usage"
							><Surface
								variant="soft"
								color="primary"
								spacing="medium"
								width="fit"
								hover="medium"
								orientation="horizontal"
								><span>Interactive surface</span><Icon name="arrow_outward" /></Surface
							>
						</a>
						<Surface variant="neutral" glass spacing="medium" width="fit"
							><span>Opaque glass treatment</span></Surface
						>
					</div>
					<Surface spacing="medium" scroll style="max-height: 100px" aria-label="Scrollable surface"
						><p>A scrollable surface with keyboard access.</p>
						<p>Use the arrow keys to read the remaining content.</p>
						<p>Consistent borders, spacing and contrast.</p></Surface
					>
				</section>
				<section aria-labelledby="feedback">
					<div class="section-title">
						<span>06</span>
						<h2 id="feedback">A sense of progress.</h2>
						<small>Progress · Spinner</small>
					</div>
					<label for="np-progress">Determinate / 64%</label><Progress
						id="np-progress"
						value={0.64}
						size="large"
					/>
					<p class="field-label">Indeterminate</p>
					<Progress label="Indeterminate progress" size="small" />
					<label for="np-seek">Seekable / {Math.round(progress * 100)}%</label><Progress
						id="np-seek"
						value={progress}
						onSeek={(value) => (progress = value)}
					/>
					<Progress label="Disabled seekable progress" value={0.32} onSeek={() => {}} disabled />
					<div class="row">
						{#each sizes as size (size)}<Spinner {size} label={`Loading (${size})`} />{/each}
					</div>
					<div class="row">
						{#each ['info', 'success', 'warning', 'error'] as color (color)}<Pill
								label={color}
								color={color as 'info' | 'success' | 'warning' | 'error'}
								variant="soft"
							/>{/each}
					</div>
				</section>
				<section aria-labelledby="overlays">
					<div class="section-title">
						<span>07</span>
						<h2 id="overlays">Above the fold.</h2>
						<small>Dialog · Popover</small>
					</div>
					<p data-caption>Native top layers. Try Tab, Shift+Tab and Escape.</p>
					<div class="row">
						{#each ['small', 'medium', 'large'] as size (size)}<Button
								label={`${size[0].toUpperCase() + size.slice(1)} dialog`}
								size="small"
								onClick={() => {
									dialogSize = size as 'small' | 'medium' | 'large';
									dialogStep = false;
									open = true;
								}}
							/>{/each}
					</div>
					<div class="row">
						<Button
							label="Non-dismissible dialog"
							size="small"
							onClick={() => (lockedOpen = true)}
						/>
					</div>
					<div class="row">
						<Popover bind:open={popoverOpen} spacing="large" shadow width="fit">
							{#snippet trigger()}<Button
									label="Open popover"
									aria-expanded={popoverOpen}
									onClick={() => (popoverOpen = !popoverOpen)}
									trailingIcon={{ name: 'add' }}
									variant="filled"
									color="foreground"
								/>{/snippet}
							<div class="popover-content">
								<p data-eyebrow>A small aside</p>
								<h3>Details matter.</h3>
								<p>Click outside or press Escape to dismiss.</p>
								<Button label="Close popover" size="small" onClick={() => (popoverOpen = false)} />
							</div>
						</Popover><Popover disabled open={false}
							>{#snippet trigger()}<Button label="Disabled popover" disabled />{/snippet}
							<p>Unavailable</p></Popover
						>
					</div>
				</section>
				<section aria-labelledby="scale" class="wide-panel">
					<div class="section-title">
						<span>08</span>
						<h2 id="scale">The finer details.</h2>
						<small>Sizes · Palette · Icon</small>
					</div>
					<p data-caption>Every size, from the smallest annotation to a confident action.</p>
					<div class="row">
						{#each sizes as size (size)}<Button
								label={size}
								{size}
								variant="filled"
								color="foreground"
							/>{/each}
					</div>
					<div class="row">
						{#each sizes as size (size)}<Pill
								label={size}
								{size}
								variant="soft"
								color="secondary"
							/>{/each}
					</div>
					<div class="row">
						{#each sizes as size (size)}<label class="checkbox-size"
								><Checkbox {size} aria-label={`${size} checkbox`} /><span>{size}</span></label
							>{/each}
					</div>
					<div class="input-sizes">
						{#each ['small', 'medium', 'large'] as size (size)}<label
								><span>{size} input</span><TextInput
									size={size as 'small' | 'medium' | 'large'}
									placeholder="Édition"
									wide
									variant={size === 'small' ? 'neutral' : 'soft'}
								/></label
							>{/each}
					</div>
					<div class="input-sizes">
						{#each ['small', 'medium', 'large'] as size (size)}<div>
								<label for={`np-select-${size}`}>{size} select</label>
								<Select
									id={`np-select-${size}`}
									size={size as 'small' | 'medium' | 'large'}
									items={options}
									value="paper"
								/>
							</div>{/each}
					</div>
					<div class="row">
						{#each colors as color (color)}<Button
								label={color}
								{color}
								variant="soft"
								size="small"
							/>{/each}
					</div>
					<div class="icon-row">
						{#each sizes as size (size)}<Icon
								name="asterisk"
								{size}
								label={`${size} asterisk`}
							/>{/each}<Icon
							name="favorite"
							filled
							color="primary"
							size="large"
							label="Filled favorite"
						/><Icon name="arrow_outward" size="large" label="Arrow outward" /><Icon
							name="check"
							color="success"
							size="large"
							label="Success check"
						/>
					</div>
				</section>
			</div>
			<section id="usage" class="usage" aria-labelledby="usage-heading">
				<div>
					<p data-eyebrow>Built to be used</p>
					<h2 id="usage-heading">Take it from here.</h2>
					<p>Wrap the components in one Theme per document.</p>
				</div>
				<pre><code
						>&lt;script&gt;
  import &#123; Theme, Button &#125;
    from 'bref-ui-themes/new-paris';
&lt;/script&gt;

&lt;Theme&gt;
  &lt;Button label="Bonjour" variant="filled" /&gt;
&lt;/Theme&gt;</code
					></pre>
			</section>
		</main>
		<footer class="colophon">
			<a href={resolve('/')} data-sveltekit-reload>← Back to showcase</a><span
				>NEW PARIS / BREF / COMPONENT COLLECTION 04</span
			>
		</footer>
		<Dialog
			bind:open
			size={dialogSize}
			header={{
				title: dialogStep ? 'Consider it done.' : 'A moment of focus.',
				icon: { name: dialogStep ? 'check' : 'article' },
				description: 'New Paris / Native dialog specimen'
			}}
			footer={{
				primary: {
					label: dialogStep ? 'Done' : 'Continue',
					onClick: () => {
						if (dialogStep) open = false;
						else dialogStep = true;
					}
				},
				secondary: { label: 'Cancel', onClick: () => (open = false) }
			}}
		>
			<p>
				{dialogStep
					? 'The title, icon and action update together.'
					: 'Sharp edges, warm paper and a little room to think. Keyboard focus stays inside this dialog.'}
			</p>
			<label class="dialog-note" for="np-dialog-note">A short note</label><TextInput
				id="np-dialog-note"
				placeholder="Write something thoughtful"
				wide
			/>
		</Dialog>
		<Dialog
			bind:open={lockedOpen}
			dismissible={false}
			header={{ title: 'Stay a moment.', description: 'Non-dismissible dialog specimen' }}
			footer={{
				primary: { label: 'Finish example', onClick: () => (lockedOpen = false) },
				secondary: { label: 'Close example', onClick: () => (lockedOpen = false) }
			}}
			><p>
				Escape and outside clicks keep this dialog open. Use an explicit action to close it.
			</p></Dialog
		>
	</div>
</Theme>

<style>
	[data-new-paris-showcase] {
		max-width: 1320px;
		margin: auto;
		padding: 0 48px;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	.masthead {
		min-height: 96px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		border-bottom: 1px solid var(--np-rule);
	}
	.brand {
		font: 700 23px var(--font-display);
		letter-spacing: -1px;
	}
	.brand span {
		color: var(--color-primary);
		margin: 0 3px;
	}
	.theme-links {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		font-size: 12px;
	}
	.theme-links [aria-current] {
		color: var(--color-primary);
		text-decoration: underline;
		text-underline-offset: 6px;
	}
	.hero {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		padding: 72px 0 64px;
		gap: 64px;
	}
	h1 {
		font-size: clamp(60px, 9vw, 128px);
		line-height: 0.9;
		letter-spacing: -0.065em;
		margin: 28px 0 26px;
		font-weight: 800;
	}
	h1 > span {
		color: var(--color-primary);
	}
	.dek {
		font-size: 22px;
		line-height: 1.4;
		letter-spacing: -0.02em;
	}
	.dek > span {
		color: var(--color-muted);
	}
	.hero-aside {
		display: grid;
		grid-template-columns: 1fr;
		align-content: end;
		justify-items: start;
		gap: 22px;
		padding-left: 24px;
	}
	.hero-aside > p {
		font-size: 15px;
		color: var(--color-muted);
		line-height: 1.6;
	}
	.monogram {
		background: var(--color-foreground);
		color: var(--color-background);
		width: 188px;
		height: 188px;
		display: grid;
		place-content: center;
		text-align: center;
	}
	.monogram > span {
		font: 600 90px / 1 var(--font-display);
		letter-spacing: -9px;
		padding-right: 12px;
	}
	.monogram .serif {
		color: #fa765f;
	}
	.monogram small {
		font-size: 9px;
		letter-spacing: 0.2em;
		margin-top: 16px;
	}
	.swatches {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 5px;
	}
	.swatches > span {
		width: 23px;
		height: 23px;
		background: var(--swatch);
	}
	.swatches small {
		font-size: 11px;
		letter-spacing: 0.08em;
		margin-left: 8px;
	}
	.index-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		border-bottom: 1px solid var(--np-rule);
		padding: 20px 0;
		font-size: 13px;
		letter-spacing: 0.02em;
	}
	.index-bar > span:first-child {
		font-weight: 700;
	}
	.index-bar > span:nth-child(2) {
		color: var(--color-muted);
	}
	.index-bar a {
		display: flex;
		align-items: center;
		gap: 10px;
		min-height: 24px;
	}
	.specimen-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		align-items: start;
		gap: 24px;
		margin-top: 32px;
	}
	section {
		min-width: 0;
	}
	.specimen-grid > section {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 36px;
		background: var(--np-paper);
	}
	.section-title {
		display: flex;
		gap: 12px;
		align-items: baseline;
		flex-wrap: wrap;
	}
	.section-title > span {
		font: 500 12px var(--font-text);
		color: var(--color-muted);
	}
	h2 {
		font-size: 28px;
	}
	.section-title small {
		color: var(--color-muted);
		font-size: 12px;
		margin-left: auto;
	}
	.row,
	.specimen-row,
	.icon-row {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.row-label {
		font-size: 13px;
		min-width: 66px;
		color: var(--color-muted);
	}
	.row-divider {
		border-top: 1px solid var(--np-rule);
		margin-block: 4px;
	}
	.specimen-row {
		padding-block: 4px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	label,
	.field-label {
		font-size: 13px;
		font-weight: 500;
	}
	label {
		display: flex;
		justify-content: space-between;
		gap: 12px;
	}
	label small {
		color: var(--color-muted);
		font-size: 12px;
		font-weight: 400;
	}
	.error {
		color: var(--color-error);
	}
	.select-grid,
	.input-sizes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
	}
	.select-grid label {
		margin-bottom: 8px;
	}
	.select-grid [data-caption] {
		margin-top: 8px;
	}
	.checkboxes {
		display: grid;
		gap: 18px;
	}
	.checkboxes label,
	.checkbox-size {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 12px;
	}
	h3 {
		font-size: 18px;
	}
	.wide-panel {
		grid-column: 1 / -1;
	}
	.surface-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}
	.surface-grid p {
		font-size: 14px;
	}
	.popover-content {
		max-width: 240px;
		display: grid;
		gap: 16px;
	}
	.popover-content p {
		font-size: 14px;
	}
	.input-sizes {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.input-sizes label {
		display: grid;
		justify-content: stretch;
	}

	.icon-row {
		gap: 26px;
		padding: 12px 0;
	}
	.usage {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		padding: 56px 0;
		align-items: center;
	}
	.usage h2 {
		font-size: 36px;
		margin: 16px 0;
	}
	.usage p:last-child {
		font-size: 12px;
		color: var(--color-muted);
	}
	pre {
		border: 0;
		padding: 28px;
		font-size: 12px;
		line-height: 1.6;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		background: var(--np-paper);
	}
	.colophon {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 16px;
		border-top: 1px solid var(--np-rule);
		padding: 24px 0;
		font-size: 12px;
		letter-spacing: 0.06em;
	}
	.colophon a {
		display: inline-flex;
		align-items: center;
		min-height: 24px;
	}
	.dialog-note {
		margin-top: 24px;
	}
	.colophon span {
		color: var(--color-muted);
	}
	.skip {
		position: fixed;
		top: 8px;
		left: 8px;
		translate: 0 -200%;
		padding: 12px;
		background: var(--np-paper);
		z-index: 10;
	}
	.skip:focus {
		translate: none;
	}
	@media (max-width: 900px) {
		[data-new-paris-showcase] {
			padding-inline: 28px;
		}
		.hero {
			gap: 24px;
		}
		.hero-aside {
			padding-left: 0;
		}
		.specimen-grid > section {
			padding: 24px;
		}
	}
	@media (max-width: 640px) {
		[data-new-paris-showcase] {
			padding-inline: 20px;
		}
		.masthead {
			align-items: flex-start;
			flex-direction: column;
			padding-block: 20px;
			gap: 16px;
		}
		.theme-links {
			gap: 20px;
			font-size: 12px;
		}
		.hero {
			grid-template-columns: 1fr;
			padding-block: 36px;
			gap: 30px;
		}
		h1 {
			font-size: clamp(60px, 18.5vw, 110px);
		}
		.hero-aside {
			grid-template-columns: 96px 1fr;
			gap: 16px;
			align-items: center;
		}
		.monogram {
			width: 96px;
			height: 96px;
			grid-row: 1 / 3;
		}
		.monogram > span {
			font-size: 48px;
			letter-spacing: -6px;
			padding-right: 6px;
		}

		.monogram small {
			font-size: 6px;
			margin-top: 8px;
		}
		.swatches small {
			flex-basis: 100%;
			font-size: 11px;
			margin: 2px 0 0;
		}
		.index-bar > span:nth-child(2) {
			display: none;
		}
		.specimen-grid {
			grid-template-columns: 1fr;
			margin-top: 24px;
		}
		.specimen-grid > section {
			padding: 28px 20px;
		}

		.surface-grid,
		.input-sizes,
		.usage {
			grid-template-columns: 1fr;
		}
		.section-title small {
			flex-basis: auto;
			margin-left: auto;
		}
		.select-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		.usage {
			gap: 24px;
			padding-block: 40px;
		}
		h2 {
			font-size: 22px;
		}
	}
</style>
