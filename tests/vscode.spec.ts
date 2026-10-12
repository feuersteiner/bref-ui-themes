import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/themes/vscode');
	await page.waitForLoadState('networkidle');
});

test('VS Code validation, native controls, selection and tag removal', async ({ page }) => {
	await page.getByRole('button', { name: 'Validate input' }).click();
	await expect(page.getByRole('alert')).toHaveText('Enter a setting name.');
	await expect(page.getByLabel('Setting name', { exact: true })).toHaveAttribute(
		'aria-invalid',
		'true'
	);
	await page.getByLabel('Setting name', { exact: true }).fill('editor.fontSize');
	await page.getByRole('button', { name: 'Validate input' }).click();
	await expect(page.locator('#name-feedback')).toHaveText('Accepted: editor.fontSize');
	await expect(page.getByLabel('Read only', { exact: true })).toHaveAttribute('readonly', '');
	await expect(page.getByLabel('Disabled', { exact: true })).toBeDisabled();
	const checkbox = page.getByRole('checkbox', { name: 'Enable formatting' });
	await checkbox.focus();
	await page.keyboard.press('Space');
	await expect(checkbox).not.toBeChecked();
	await expect(page.getByRole('checkbox', { name: 'Disabled checked' })).toBeDisabled();
	const language = page.getByRole('button', { name: 'Language', exact: true });
	await language.focus();
	await page.keyboard.press('Enter');
	const popover = page.locator('[popover]:popover-open');
	await expect(popover).toBeVisible();
	await expect(popover.getByRole('button', { name: 'Unavailable language' })).toBeDisabled();
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await expect(popover.getByRole('button', { name: 'JavaScript' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(language).toContainText('JavaScript');
	await page.getByRole('button', { name: 'Multiple languages' }).click();
	await page.locator('[popover]:popover-open').getByRole('button', { name: 'JavaScript' }).click();
	await expect(page.getByRole('button', { name: 'Multiple languages' })).toContainText(
		'TypeScript, JavaScript'
	);
	await page.keyboard.press('Escape');
	await page.getByRole('button', { name: 'Empty select' }).click();
	await expect(page.locator('[popover]:popover-open')).toContainText('No options found');
	await page.keyboard.press('Escape');
	const radio = page.getByRole('radio', { name: 'Default', exact: true });
	await radio.focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.getByRole('radio', { name: 'Compact', exact: true })).toBeChecked();
	const types = page.getByRole('checkbox', { name: 'Types', exact: true });
	await types.focus();
	await page.keyboard.press('Space');
	await expect(types).toBeChecked();
	await expect(page.getByRole('radio', { name: 'Locked choice' })).toBeDisabled();
	const clickable = page.getByRole('button', { name: 'Activate tag', exact: true });
	await clickable.focus();
	await page.keyboard.press('Enter');
	await expect(page.getByRole('status').filter({ hasText: 'Activations:' })).toHaveText(
		'Activations: 1'
	);
	await page.getByRole('button', { name: 'Remove Removable tag' }).click();
	await expect(page.getByRole('button', { name: 'Restore tag' })).toBeVisible();
	await page.getByRole('button', { name: 'Remove Svelte' }).click();
	await expect(page.getByRole('button', { name: 'Remove Svelte' })).toHaveCount(0);
	await page.getByRole('button', { name: 'Reset tags' }).click();
	await expect(page.getByRole('button', { name: 'Remove Svelte' })).toBeVisible();
	const seek = page.getByRole('slider', { name: /Seekable progress/ });
	await seek.focus();
	await page.keyboard.press('ArrowRight');
	await expect(seek).toHaveValue('0.43');
	await expect(page.getByRole('slider', { name: 'Disabled seek' })).toBeDisabled();
});

test('VS Code overlays, focus return and theme isolation', async ({ page }) => {
	const trigger = page.getByRole('button', { name: 'Open popover', exact: true });
	await trigger.focus();
	await page.keyboard.press('Enter');
	await page.keyboard.press('Tab');
	await expect(page.getByRole('button', { name: 'Close popover', exact: true })).toBeFocused();
	await page.keyboard.press('Escape');
	await expect(page.locator('[popover]:popover-open')).toHaveCount(0);
	await expect(trigger).toBeFocused();
	const dialogTrigger = page.getByRole('button', { name: 'Open dialog', exact: true });
	await dialogTrigger.click();
	const dialog = page.getByRole('dialog', { name: 'Dialog reference' });
	await expect(dialog).toBeVisible();
	expect(
		await dialog
			.getByRole('button', { name: 'Done', exact: true })
			.evaluate((node) => getComputedStyle(node).borderRadius)
	).toBe('2px');
	expect(
		await dialog
			.locator(':scope > .surface')
			.evaluate((node) => getComputedStyle(node).backgroundColor)
	).toBe('rgb(37, 37, 38)');
	for (let i = 0; i < 8; i++) {
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
	await page.evaluate(() => Object.assign(window, { themeSentinel: true }));
	await page
		.getByRole('navigation', { name: 'Theme demonstrations' })
		.getByRole('link', { name: 'Relay' })
		.click();
	await page.waitForLoadState('networkidle');
	expect(await page.evaluate(() => 'themeSentinel' in window)).toBe(false);
	expect(
		await page.evaluate(() =>
			getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
		)
	).toBe('#375b86');
});

test('VS Code reduced motion and high contrast preserve visible controls', async ({ page }) => {
	const spinner = page
		.getByRole('status', { name: '' })
		.filter({ hasText: 'medium loading example' });
	expect(
		await spinner.locator('span').evaluate((node) => getComputedStyle(node).animationName)
	).toBe('none');
	await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
	await page.getByLabel('Setting name', { exact: true }).focus();
	const input = page.locator('.surface').filter({ has: page.locator('#setting-name') });
	expect(await input.evaluate((node) => getComputedStyle(node).outlineStyle)).toBe('solid');
	expect(await input.evaluate((node) => getComputedStyle(node).borderTopWidth)).toBe('1px');
	await expect(page.getByRole('checkbox', { name: 'Enable formatting' })).toBeChecked();
	await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
	expect(
		await page
			.getByRole('dialog')
			.locator(':scope > .surface')
			.evaluate((node) => getComputedStyle(node).backgroundColor)
	).toBe('rgb(255, 255, 255)');
});
