import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	reporter: 'list',
	use: { baseURL: 'http://127.0.0.1:4177', trace: 'retain-on-failure' },
	projects: [
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 960 } }
		},
		{ name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }
	],
	webServer: {
		command: 'bun run preview --host 127.0.0.1 --port 4177',
		url: 'http://127.0.0.1:4177',
		reuseExistingServer: false
	}
});
