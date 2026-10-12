import { expect, test, type Page } from '@playwright/test';

const routes = [
	'/',
	'/relay',
	'/forma',
	'/elsewhere',
	'/themes/relay',
	'/themes/forma',
	'/themes/elsewhere'
];

async function ready(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.evaluate(() => document.fonts.ready);
}

for (const route of routes) {
	test(`${route}: renders without errors or horizontal overflow`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('response', (response) => {
			if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
		});
		await page.goto(route);
		await ready(page);
		await expect(page.locator('main')).toBeVisible();
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
			true
		);
		for (const image of await page.locator('img').all()) {
			await image.scrollIntoViewIfNeeded();
			await expect
				.poll(() =>
					image.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
				)
				.toBe(true);
		}
		expect(errors).toEqual([]);
	});
}

test('catalog links, WIP availability and keyboard skip link', async ({ page }) => {
	await page.goto('/');
	await ready(page);
	await page.keyboard.press('Tab');
	await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(page.locator('main')).toBeFocused();
	await expect(page.locator('[data-wip-themes] article')).toHaveCount(3);
	await expect(page.locator('[data-wip-themes] a')).toHaveCount(0);
	for (const route of routes.slice(1)) {
		const link = page.locator(`a[href="${route}"]`);
		await expect(link).toHaveCount(1);
		expect((await page.request.get(route)).status()).toBe(200);
	}
});

test('Relay native task completion, creation and modal focus', async ({ page }) => {
	await page.goto('/relay');
	await ready(page);
	const checkbox = page.getByRole('checkbox', {
		name: 'Complete Build the component library',
		exact: true
	});
	await checkbox.focus();
	await page.keyboard.press('Space');
	await expect(checkbox).toBeChecked();
	const trigger = page.getByRole('button', { name: 'New task', exact: true });
	await trigger.click();
	const dialog = page.getByRole('dialog', { name: 'New task', exact: true });
	await expect(dialog).toBeVisible();
	await page.getByLabel('Task name', { exact: true }).fill('Review the migrated showcase');
	await dialog.getByRole('button', { name: 'Save task', exact: true }).click();
	await expect(page.getByRole('heading', { name: 'Review the migrated showcase' })).toBeVisible();
	await expect(trigger).toBeFocused();
	await trigger.click();
	await expect(dialog).toBeVisible();
	for (let i = 0; i < 12; i++) {
		await page.keyboard.press('Tab');
		expect(
			await dialog.evaluate(
				(node) => node.contains(document.activeElement) || document.activeElement === document.body
			)
		).toBe(true);
	}
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(trigger).toBeFocused();
});

test('Forma product dialog, cart and changing dialog headers', async ({ page }) => {
	await page.goto('/forma');
	await ready(page);
	await page.getByRole('button', { name: 'View Sunday chair', exact: true }).click();
	await expect(page.getByRole('dialog', { name: 'Sunday chair' })).toBeVisible();
	await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
	await page.locator('[data-store-header]').getByRole('button', { name: /Cart/ }).click();
	await expect(page.getByRole('dialog', { name: 'Your cart' })).toBeVisible();
	await page.getByRole('button', { name: 'Checkout', exact: true }).click();
	await expect(page.getByRole('dialog', { name: 'Review order' })).toBeVisible();
	await page.getByRole('button', { name: 'Confirm demo order' }).click();
	await expect(page.getByRole('dialog', { name: 'Order confirmed' })).toBeVisible();
	await expect(
		page.getByText('This was a demo order. No payment was taken.', { exact: false })
	).toBeVisible();
	await page.getByRole('button', { name: 'Continue shopping', exact: true }).click();
});

test('Elsewhere audit validation, completion, review and stop', async ({ page }) => {
	await page.goto('/elsewhere');
	await ready(page);
	await page.getByRole('button', { name: 'New run', exact: true }).click();
	await expect(page.locator('#audit-url')).toBeFocused();
	await page.locator('#audit-url').fill('ftp://example.com');
	await page.getByRole('button', { name: 'Run audit', exact: true }).click();
	await expect(page.getByRole('alert')).toContainText('Enter a complete website URL');
	await page.locator('#audit-url').fill('https://example.com');
	await page.getByRole('button', { name: 'Run audit', exact: true }).click();
	await expect(
		page.getByRole('status').filter({ hasText: 'Sample audit ready for review' })
	).toBeVisible();
	const checkbox = page.getByRole('checkbox').first();
	await checkbox.check();
	await expect(checkbox).toBeChecked();
	await page.getByRole('button', { name: 'New run', exact: true }).click();
	await page.locator('#audit-url').fill('https://example.org');
	await page.getByRole('button', { name: 'Run audit', exact: true }).click();
	await page.getByRole('button', { name: 'Stop', exact: true }).click();
	await expect(page.getByRole('status').filter({ hasText: 'Audit stopped' })).toBeVisible();
});

test('cross-theme navigation reloads and restores palette', async ({ page }) => {
	await page.goto('/relay');
	await ready(page);
	const primary = () =>
		page.evaluate(() =>
			getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
		);
	expect(await primary()).toBe('#375b86');
	await page.evaluate(() => {
		Object.assign(window, { migrationSentinel: true });
	});
	await page
		.getByRole('navigation', { name: 'Bref live demos' })
		.getByRole('link', { name: 'Forma', exact: true })
		.click();
	await ready(page);
	expect(await page.evaluate(() => 'migrationSentinel' in window)).toBe(false);
	expect(await primary()).toBe('#252a26');
	await page
		.getByRole('navigation', { name: 'Bref live demos' })
		.getByRole('link', { name: 'Elsewhere', exact: true })
		.click();
	await ready(page);
	expect(await primary()).toBe('#6250aa');
	await page.getByRole('link', { name: 'Back to showcase' }).click();
	await ready(page);
	expect(await primary()).toBe('#1d4ed8');
	await page.getByRole('link', { name: 'Relay theme', exact: true }).click();
	await ready(page);
	expect(await primary()).toBe('#375b86');
});

for (const theme of ['relay', 'forma', 'elsewhere']) {
	test(`${theme}: reduced motion, keyboard select and dialog`, async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto(`/themes/${theme}`);
		await ready(page);
		const checkbox = page.getByRole('checkbox', { name: 'Ready for review' });
		await checkbox.focus();
		await page.keyboard.press('Space');
		await expect(checkbox).not.toBeChecked();
		await page.keyboard.press('Space');
		await expect(checkbox).toBeChecked();
		const trigger = page.locator('[data-form] button').first();
		await trigger.focus();
		await page.keyboard.press('Enter');
		const popover = page.locator('[popover]:popover-open');
		await expect(popover).toBeVisible();
		await page.keyboard.press('Tab');
		await expect(popover.locator('[data-scroll]')).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(popover.getByRole('button').first()).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(popover.getByRole('button', { name: 'Second project' })).toBeFocused();
		await page.keyboard.press('Enter');
		await expect(trigger).toContainText('Second project');
		const dialogTrigger = page.getByRole('button', { name: 'Open dialog' });
		await dialogTrigger.click();
		await expect(page.getByRole('dialog', { name: 'Review project' })).toBeVisible();
		await page.keyboard.press('Shift+Tab');
		await page.keyboard.press('Escape');
		await expect(dialogTrigger).toBeFocused();
	});
}
