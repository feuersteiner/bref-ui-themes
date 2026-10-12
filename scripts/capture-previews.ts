import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const origin = process.argv[2] ?? 'http://127.0.0.1:5173';
const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1440, height: 960 },
	reducedMotion: 'reduce'
});
await mkdir('static/previews', { recursive: true });
try {
	for (const demo of ['relay', 'forma', 'elsewhere']) {
		await page.goto(`${origin}/${demo}`);
		await page.waitForLoadState('networkidle');
		await page.evaluate(() => document.fonts.ready);
		await page.screenshot({ path: `static/previews/${demo}.jpg`, type: 'jpeg', quality: 85 });
	}
} finally {
	await browser.close();
}
