import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/themes/glassy');
	await page.waitForLoadState('networkidle');
});

test('native inputs, validation and loading can be operated', async ({ page }) => {
	await page.getByRole('textbox', { name: 'Display name', exact: true }).fill('Glass layer');
	await expect(page.getByRole('textbox', { name: 'Display name', exact: true })).toHaveValue(
		'Glass layer'
	);
	await expect(page.getByRole('textbox', { name: 'Disabled input', exact: true })).toBeDisabled();
	await expect(page.getByLabel('Disabled select')).toBeDisabled();
	const checkbox = page.getByRole('checkbox', { name: 'Keep it clear', exact: true });
	await checkbox.focus();
	await page.keyboard.press('Space');
	await expect(checkbox).not.toBeChecked();
	await expect(page.getByRole('checkbox', { name: 'Disabled', exact: true })).toBeDisabled();
	await page.getByRole('button', { name: 'Validate email', exact: true }).click();
	await expect(page.getByRole('alert')).toHaveText('Enter an email address containing @.');
	await expect(
		page.getByRole('textbox', { name: 'Email / validation', exact: true })
	).toHaveAttribute('aria-invalid', 'true');
	await page
		.getByRole('textbox', { name: 'Email / validation', exact: true })
		.fill('glass@example.com');
	await page.getByRole('button', { name: 'Validate email', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Loading…', exact: true })).toBeDisabled();
	await expect(
		page.getByRole('status', { name: '' }).filter({ hasText: 'Preview loading' })
	).toBeVisible();
	await page.getByRole('button', { name: 'Finish preview' }).click();
	await expect(page.getByRole('button', { name: 'Validate email', exact: true })).toBeEnabled();
	await expect(
		page.getByRole('textbox', { name: 'Email / validation', exact: true })
	).toHaveAttribute('aria-invalid', 'false');
});

test('keyboard select, multiple select and empty options', async ({ page }) => {
	const trigger = page.getByLabel('Finish', { exact: true });
	await trigger.focus();
	await page.keyboard.press('Enter');
	const popover = page.locator('[popover]:popover-open');
	await expect(popover).toBeVisible();
	await expect(popover.getByRole('button', { name: 'Dusk', exact: true })).toBeDisabled();
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await expect(popover.getByRole('button', { name: 'Blue tide' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(trigger).toContainText('Blue tide');
	await page.getByLabel('Multiple finishes').click();
	await popover.getByRole('button', { name: 'Blue tide' }).click();
	await page.keyboard.press('Escape');
	await expect(page.getByLabel('Multiple finishes')).toContainText('Morning mist, Blue tide');
	await page.getByLabel('Empty options').click();
	await expect(popover).toContainText('No finishes available');
	await page.keyboard.press('Escape');
	await expect(popover).not.toBeVisible();
});

test('native pill choices, removal, pressed action and seeking', async ({ page }) => {
	const finish = page.getByRole('radiogroup', { name: 'Glass finish' });
	await finish.getByRole('radio', { name: 'Clear', exact: true }).focus();
	await page.keyboard.press('ArrowRight');
	await expect(finish.getByRole('radio', { name: 'Frosted' })).toBeChecked();
	const effects = page.getByRole('group', { name: 'Material effects' });
	await effects.getByRole('checkbox', { name: 'Highlight' }).focus();
	await page.keyboard.press('Space');
	await expect(effects.getByRole('checkbox', { name: 'Highlight' })).toBeChecked();
	await expect(
		page.getByRole('radiogroup', { name: 'Disabled finishes' }).getByRole('radio').first()
	).toBeDisabled();
	await page.getByRole('button', { name: 'Remove Layers', exact: true }).click();
	await expect(
		page.getByRole('list', { name: 'Removable layers' }).getByText('Layers', { exact: true })
	).toHaveCount(0);
	await page.getByRole('button', { name: 'Restore layers' }).click();
	await expect(page.getByRole('button', { name: 'Remove Layers', exact: true })).toBeVisible();
	await page.getByRole('button', { name: 'Remove Removable', exact: true }).click();
	await page.getByRole('button', { name: 'Restore pill' }).click();
	await expect(page.getByRole('button', { name: 'Remove Removable', exact: true })).toBeVisible();
	await page.getByRole('button', { name: 'Activate pill', exact: true }).focus();
	await page.keyboard.press('Space');
	await expect(page.getByRole('status').filter({ hasText: 'button activations' })).toContainText(
		'1 button activations'
	);
	await page.getByRole('button', { name: 'Pin', exact: true }).click();
	await expect(page.getByRole('button', { name: 'Pinned', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true'
	);
	const seek = page.getByRole('slider', { name: /Seekable/ });
	await seek.focus();
	await page.keyboard.press('ArrowRight');
	await expect(seek).toHaveValue('0.43');
	await expect(page.getByRole('slider', { name: 'Disabled progress' })).toBeDisabled();
});

test('popover dismissal, dialog focus trap and return', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	const trigger = page.getByRole('button', { name: 'Open popover', exact: true });
	await trigger.click();
	await expect(page.locator('[popover]:popover-open')).toContainText('A floating layer');
	await page.keyboard.press('Escape');
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await trigger.click();
	await page.getByRole('heading', { name: 'The building blocks', exact: true }).click();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	await trigger.click();
	await page.getByRole('button', { name: 'Close popover', exact: true }).click();
	await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	const dialogTrigger = page.getByRole('button', { name: 'Open dialog', exact: true });
	await dialogTrigger.click();
	const dialog = page.getByRole('dialog', { name: 'A clearer layer' });
	await expect(dialog).toBeVisible();
	await page.getByLabel('Layer name').fill('Depth');
	for (let i = 0; i < 10; i++) {
		await page.keyboard.press('Tab');
		expect(
			await dialog.evaluate(
				(node) => node.contains(document.activeElement) || document.activeElement === document.body
			)
		).toBe(true);
	}
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(dialogTrigger).toBeFocused();
	await dialogTrigger.click();
	await dialog.getByRole('button', { name: 'Done', exact: true }).click();
	await expect(dialogTrigger).toBeFocused();
});

test('glass paint, focus, contrast preferences and reduced motion', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	const surface = page.locator('.specimen');
	const paint = () =>
		surface.evaluate((node) => ({
			blur: getComputedStyle(node).backdropFilter,
			background: getComputedStyle(node).backgroundColor
		}));
	expect((await paint()).blur).toContain('blur(22px)');
	const name = page.getByRole('textbox', { name: 'Display name', exact: true });
	await name.focus();
	expect(await name.evaluate((node) => getComputedStyle(node.parentElement!).outlineWidth)).toBe(
		'3px'
	);
	const checkbox = page.getByRole('checkbox', { name: 'Keep it clear', exact: true });
	await checkbox.focus();
	expect(
		await checkbox.evaluate((node) => getComputedStyle(node.parentElement!).outlineWidth)
	).toBe('3px');
	for (const span of await page.locator('[role="status"] > span').all()) {
		expect(await span.evaluate((node) => getComputedStyle(node).animationName)).toBe('none');
	}
	const session = await page.context().newCDPSession(page);
	await session.send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }]
	});
	expect((await paint()).blur).toBe('none');
	await session.send('Emulation.setEmulatedMedia', { features: [] });
	await session.detach();
	await page.emulateMedia({ contrast: 'more' });
	expect((await paint()).blur).toBe('none');
	await page.emulateMedia({ forcedColors: 'active' });
	expect(await surface.evaluate((node) => getComputedStyle(node).boxShadow)).toBe('none');
});

test('navigation reloads the document and restores other theme tokens', async ({ page }) => {
	await page.evaluate(() => Object.assign(window, { glassySentinel: true }));
	await page
		.getByRole('navigation', { name: 'Theme demonstrations' })
		.getByRole('link', { name: 'Relay', exact: true })
		.click();
	await page.waitForLoadState('networkidle');
	expect(await page.evaluate(() => 'glassySentinel' in window)).toBe(false);
	expect(
		await page.evaluate(() =>
			getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
		)
	).toBe('#375b86');
	await page
		.getByRole('navigation', { name: 'Theme demonstrations' })
		.getByRole('link', { name: 'Glassy', exact: true })
		.click();
	await expect(page.locator('[data-bref-theme="glassy"]')).toHaveCount(1);
});
