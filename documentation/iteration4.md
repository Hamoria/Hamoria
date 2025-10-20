#

##

###

#### install playwright

```sh
pnpm add zod@^3.25.0
pnpm create playwright

pnpm exec playwright show-report
pnpm exec playwright test --ui
pnpm exec playwright install --with-deps
pnpm exec playwright test
```

workflows\playwright.yml

example.spec.ts

playwright.config.ts

```ts
@ -0,0 +1,80 @@
import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./e2e",
	testMatch: "**/*.spec.ts",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('')`. */
		// baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://localhost:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
})
```

#### record playwright test doc user setup

```sh
npx playwright codegen wikipedia.org
pnpm exec playwright codegen playwright.dev
pnpm install --save-dev @playwright/test@latest
```

auth.setup.ts

```ts
import { expect, test as setup } from "@playwright/test"
import path from "path"

const authFile = path.join(__dirname, "../playwright/.auth/user.json")

setup("authenticate", async ({ page }) => {
	// Perform authentication steps. Replace these actions with your own.
	await page.goto("https://github.com/login")
	await page.getByLabel("Username or email address").fill("username")
	await page.getByLabel("Password").fill("password")
	await page.getByRole("button", { name: "Sign in" }).click()
	// Wait until the page receives the cookies.
	//
	// Sometimes login flow sets cookies in the process of several redirects.
	// Wait for the final URL to ensure that the cookies are actually set.
	await page.waitForURL("https://github.com/")
	// Alternatively, you can wait until the page reaches a state where all cookies are set.
	await expect(page.getByRole("button", { name: "View profile and more" })).toBeVisible()

	// End of authentication steps.

	await page.context().storageState({ path: authFile })
})
```

layered.spec.ts

```ts
// @ts-check

import assert from "node:assert"
import { chromium, devices } from "playwright"
;(async () => {
	// Setup
	const browser = await chromium.launch()
	const context = await browser.newContext(devices["iPhone 11"])
	const page = await context.newPage()

	// The actual interesting bit
	await context.route("**.jpg", (route) => route.abort())
	await page.goto("https://example.com/")

	assert((await page.title()) === "Example Domain") // 👎 not a Web First assertion

	// Teardown
	await context.close()
	await browser.close()
})()

```

playwright.config.ts

```ts
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },

			dependencies: ["setup"],
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"], storageState: "playwright/.auth/user.json" },
			dependencies: ["setup"],
		},
```

fixtures.ts

```ts
import { test as baseTest, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

export * from "@playwright/test"
export const test = baseTest.extend<{}, { workerStorageState: string }>({
	// Use the same storage state for all tests in this worker.
	storageState: ({ workerStorageState }, use) => use(workerStorageState),

	// Authenticate once per worker with a worker-scoped fixture.
	workerStorageState: [
		async ({ browser }, use) => {
			// Use parallelIndex as a unique identifier for each worker.
			const id = test.info().parallelIndex
			const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`)

			if (fs.existsSync(fileName)) {
				// Reuse existing authentication state if any.
				await use(fileName)
				return
			}

			// Important: make sure we authenticate in a clean environment by unsetting storage state.
			const page = await browser.newPage({ storageState: undefined })

			// Acquire a unique account, for example create a new one.
			// Alternatively, you can have a list of precreated accounts for testing.
			// Make sure that accounts are unique, so that multiple team members
			// can run tests at the same time without interference.
			const account = await acquireAccount(id)

			// Perform authentication steps. Replace these actions with your own.
			await page.goto("https://github.com/login")
			await page.getByLabel("Username or email address").fill(account.username)
			await page.getByLabel("Password").fill(account.password)
			await page.getByRole("button", { name: "Sign in" }).click()
			// Wait until the page receives the cookies.
			//
			// Sometimes login flow sets cookies in the process of several redirects.
			// Wait for the final URL to ensure that the cookies are actually set.
			await page.waitForURL("https://github.com/")
			// Alternatively, you can wait until the page reaches a state where all cookies are set.
			await expect(page.getByRole("button", { name: "View profile and more" })).toBeVisible()

			// End of authentication steps.

			await page.context().storageState({ path: fileName })
			await page.close()
			await use(fileName)
		},
		{ scope: "worker" },
	],
})
```