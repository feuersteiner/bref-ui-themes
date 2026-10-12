import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/themes/new-paris');
	await page.waitForLoadState('networkidle');
});

test('editorial geometry, sizes, complete specimens and focus', async ({ page }) => {
	await expect(page.getByRole('heading', { name: 'NEW PARIS.' })).toBeVisible();
	await expect(page.locator('.specimen-grid > section')).toHaveCount(8);
	const continueButton = page.getByRole('button', { name: 'Continue', exact: true }).first();
	await continueButton.focus();
	expect(
		await continueButton.evaluate((node) => ({
			radius: getComputedStyle(node).borderRadius,
			outline: getComputedStyle(node).outlineWidth
		}))
	).toEqual({ radius: '0px', outline: '2px' });
	await page.keyboard.press('Enter');
	await expect(page.getByRole('status').filter({ hasText: 'Actions activated' })).toHaveText(
		'Actions activated: 1'
	);
	await expect(page.getByRole('button', { name: 'Disabled', exact: true })).toBeDisabled();
	const disabledLink = page.getByText('Disabled link', { exact: true });
	await expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
	await expect(disabledLink).not.toHaveAttribute('href');
	await page.getByRole('button', { name: 'Try loading' }).click();
	await expect(page.getByRole('button', { name: 'Loading…' })).toBeDisabled();
	await expect(page.getByRole('button', { name: 'Loading…' })).toHaveAttribute('aria-busy', 'true');
	await expect(page.getByRole('button', { name: 'Try loading' })).toBeEnabled();
	await expect(page.getByRole('img', { name: 'Filled favorite' })).toBeVisible();
});

test('input binding, error recovery and disabled/read-only controls', async ({ page }) => {
	await page.getByLabel('Edition name', { exact: true }).fill('Paris edition');
	await expect(page.getByLabel('Edition name', { exact: true })).toHaveValue('Paris edition');
	await page.getByRole('button', { name: 'Validate email' }).click();
	await expect(page.getByRole('alert')).toContainText('Enter an email address');
	const email = page.getByLabel('Email address', { exact: false });
	await expect(email).toHaveAttribute('aria-invalid', 'true');
	await email.fill('bonjour@example.com');
	await page.getByRole('button', { name: 'Validate email' }).click();
	await expect(page.getByText('Looks good', { exact: true })).toBeVisible();
	await expect(email).not.toHaveAttribute('aria-invalid');
	await expect(page.getByLabel('Read only', { exact: true })).toHaveAttribute('readonly');
	await expect(page.getByLabel('Disabled', { exact: true })).toBeDisabled();
});

test('keyboard selects, multiple choices, disabled option and empty state', async ({ page }) => {
	const trigger = page.locator('#np-material');
	await trigger.focus();
	await page.keyboard.press('Enter');
	const popover = page.locator('[popover]:popover-open');
	await expect(popover.getByRole('button', { name: 'Archive (disabled)' })).toBeDisabled();
	await popover.getByRole('button', { name: 'Ink', exact: true }).focus();
	await page.keyboard.press('Enter');
	await expect(trigger.locator('[data-value]')).toHaveText('Ink');
	await expect(trigger).toBeFocused();
	await page.locator('#np-multiple').click();
	await popover.getByRole('button', { name: 'Paper', exact: true }).click();
	await popover.getByRole('button', { name: 'Ink', exact: true }).click();
	await expect(page.locator('#np-multiple')).toContainText('Paper, Ink');
	await page.keyboard.press('Escape');
	await page.locator('#np-empty').click();
	await expect(popover).toContainText('No editions available');
	await page.keyboard.press('Escape');
	await expect(page.locator('#np-unavailable')).toBeDisabled();
});

test('checkboxes, pill activation, removal and native choice bindings', async ({ page }) => {
	const checkbox = page.getByRole('checkbox', { name: 'Ready for review', exact: true });
	await checkbox.focus();
	await page.keyboard.press('Space');
	await expect(checkbox).not.toBeChecked();
	await expect(page.getByRole('checkbox', { name: 'Disabled, checked' })).toBeChecked();
	await expect(page.getByRole('checkbox', { name: 'Disabled, unchecked' })).toBeDisabled();
	const pill = page.getByRole('button', { name: 'Activate pill' });
	await pill.focus();
	await page.keyboard.press('Space');
	await expect(page.getByRole('status').filter({ hasText: 'Actions activated' })).toHaveText(
		'Actions activated: 1'
	);
	await page.getByRole('button', { name: 'Remove Removable' }).click();
	await expect(page.getByRole('button', { name: 'Restore pill' })).toBeVisible();
	await page.getByRole('button', { name: 'Restore pill' }).click();
	await expect(page.getByRole('button', { name: 'Remove Removable' })).toBeVisible();
	await page.getByRole('button', { name: 'Remove Typography' }).click();
	await expect(page.getByRole('button', { name: 'Remove Typography' })).toHaveCount(0);
	await page.getByRole('button', { name: 'Restore tags' }).click();
	await expect(page.getByRole('button', { name: 'Remove Typography' })).toBeVisible();
	const radio = page
		.getByRole('radiogroup', { name: 'Edition format' })
		.getByRole('radio', { name: 'Journal' });
	await radio.focus();
	await page.keyboard.press('Space');
	await expect(radio).toBeChecked();
	const multiple = page
		.getByRole('group', { name: 'Included sections' })
		.getByRole('checkbox', { name: 'Notes' });
	await multiple.focus();
	await page.keyboard.press('Space');
	await expect(multiple).toBeChecked();
	await expect(
		page.getByRole('radiogroup', { name: 'Archived format' }).getByRole('radio').first()
	).toBeDisabled();
});

test('progress keyboard seeking and reduced motion', async ({ page }) => {
	const slider = page.getByRole('slider', { name: 'Seekable', exact: false }).first();
	await slider.focus();
	await page.keyboard.press('ArrowRight');
	await expect(slider).toHaveValue('0.65');
	await expect(page.getByRole('slider', { name: 'Disabled seekable progress' })).toBeDisabled();
	await expect(
		page.getByRole('progressbar', { name: 'Determinate / 64%', exact: true })
	).toHaveAttribute('value', '0.64');
	await expect(
		page.getByRole('progressbar', { name: 'Indeterminate progress' })
	).not.toHaveAttribute('value');
	const spinner = page
		.getByRole('status', { name: '' })
		.filter({ hasText: 'Loading (medium)' })
		.locator('span');
	expect(await spinner.evaluate((node) => getComputedStyle(node).animationName)).toBe('none');
});

test('native popover dismissal and modal focus, header updates and locked dialog', async ({
	page
}) => {
	const popoverTrigger = page.getByRole('button', { name: 'Open popover', exact: true });
	await popoverTrigger.focus();
	await page.keyboard.press('Enter');
	await expect(page.locator('[popover]:popover-open')).toContainText('Details matter.');
	await page.keyboard.press('Escape');
	await expect(popoverTrigger).toBeFocused();
	const trigger = page.getByRole('button', { name: 'Medium dialog', exact: true });
	await trigger.click();
	const dialog = page.getByRole('dialog', { name: 'A moment of focus.' });
	await expect(dialog).toBeVisible();
	for (let index = 0; index < 8; index++) {
		await page.keyboard.press('Tab');
		expect(
			await dialog.evaluate(
				(node) => node.contains(document.activeElement) || document.activeElement === document.body
			)
		).toBe(true);
	}
	await dialog.getByRole('button', { name: 'Continue', exact: true }).click();
	await expect(page.getByRole('dialog', { name: 'Consider it done.' })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(trigger).toBeFocused();
	await page.getByRole('button', { name: 'Non-dismissible dialog' }).click();
	const locked = page.getByRole('dialog', { name: 'Stay a moment.' });
	await page.keyboard.press('Escape');
	await expect(locked).toBeVisible();
	await locked.getByRole('button', { name: 'Finish example' }).click();
	await expect(locked).not.toBeVisible();
});

test('full-document navigation clears New Paris styles', async ({ page }) => {
	await page.evaluate(() => Object.assign(window, { newParisSentinel: true }));
	await page
		.getByRole('navigation', { name: 'Theme demonstrations' })
		.getByRole('link', { name: 'Forma', exact: true })
		.click();
	await page.waitForLoadState('networkidle');
	expect(await page.evaluate(() => 'newParisSentinel' in window)).toBe(false);
	await expect(page.locator('[data-bref-theme="new-paris"]')).toHaveCount(0);
	expect(
		await page
			.getByRole('button', { name: 'Open dialog' })
			.evaluate((node) => getComputedStyle(node).borderRadius)
	).toBe('10px');
});
