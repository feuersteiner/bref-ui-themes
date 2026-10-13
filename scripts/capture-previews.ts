import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const origin = process.argv[2] ?? 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1440, height: 960 },
	reducedMotion: 'reduce'
});
await mkdir('static/previews', { recursive: true });
try {
	for (const demo of ['relay', 'forma', 'elsewhere', 'vscode']) {
		await page.goto(`${origin}/${demo === 'vscode' ? 'themes/vscode' : demo}`);
		await page.waitForLoadState('networkidle');
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({ path: `static/previews/${demo}.jpg`, type: 'jpeg', quality: 85 });
		if (demo === 'vscode') {
			await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
			await page.getByRole('dialog').waitFor();
			await page.screenshot({
				path: 'static/previews/vscode-dialog.jpg',
				type: 'jpeg',
				quality: 85
			});
			await page.keyboard.press('Escape');
			await page.setViewportSize({ width: 390, height: 844 });
			await page.goto(`${origin}/themes/vscode`);
			await page.waitForLoadState('networkidle');
			await page.evaluate(() => document.fonts.ready);
			await page.evaluate(() => scrollTo(0, 0));
			await page.screenshot({
				path: 'static/previews/vscode-mobile.jpg',
				type: 'jpeg',
				quality: 85
			});
			await page.setViewportSize({ width: 1440, height: 960 });
		}
	}
} finally {
	await browser.close();
}
