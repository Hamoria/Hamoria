# s

## test triangle initial deep dive

### POM Fixture e2e

1. config devices
 - https://medium.com/@divyakandpal93/playwright-test-framework-structure-best-practices-for-scalability-eddf6232593d
 - expect POM and Fixtures
2. record setup
 - code gene/aria + ctx
3. base test POM + base extend
	- https://github.com/BakkappaN/PlaywrightTutorialFullCourse/blob/main/pages/homepage.js
	- go towards n+1
4. should do a to do


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

```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm install -g pnpm && pnpm install
    - name: Install Playwright Browsers
      run: pnpm exec playwright install --with-deps
    - name: Run Playwright tests
      run: pnpm exec playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

example.spec.ts

```ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

```

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

#### 2. ecord playwright test doc user setup

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

#### 3. accire account, storage state.

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
			 async function acquireAccount(id: number) {
  // Return a dummy test account without real authentication
  return {
    username: `testuser${id}`,
    password: `testpass${id}`,
  };
}
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

#### 4. list to be tested

_dashboard._course_

```ts
import { useEffect, useId, useRef } from "react"
import { Form, Outlet, useNavigation, useSubmit } from "react-router"
const searchId = useId()
	if (e.currentTarget.q.value) {
										// biome-ignore lint/nursery/noFloatingPromises: <explanation>
										submit(e.currentTarget, { method: "get" })
									}
								//change to
		onChange={async (e) => {
								//check if the form is valid
								if (e.currentTarget.checkValidity()) {

			//Alternative - a title
			<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="absolute left-2 z-2 size-6"
								>
									<title>Search</title>'
		//Generate unique IDs using useId().biomelint/correctness/useUniqueElementIds
```


helper\createList.ts

- step or beforeEach

```ts
import { expect, type Page, test } from "@playwright/test"

export async function createList(page: Page, listName: string, listDescription: string) {
	await test.step("create a new list", async () => {
		await page.getByLabel("User Profile").click()
		await page.getByRole("link", { name: "Create New List" }).click()
		await page.getByLabel("Name").fill(listName)
		await page.getByLabel("Description").fill(listDescription)
		await page.getByRole("button", { name: "Continue" }).click()
	})
}

export async function openLists(page: Page, name = "My Lists") {
	//...
}

/**
 * use fixture instead of beforeEach
 */
// import { test, expect } from "@playwright/test"
// import { addMovie, createList, openLists } from "../helpers/list-utilities"

// // Before each test, navigate to the base URL, create a list, and open the lists page
// test.beforeEach(async ({ page }) => {
// 	await page.goto("")
// 	await createList(page, "my favorite movies", "here is a list of my favorite movies")
// 	await openLists(page)
// })

// test("should edit an existing list", async ({ page }) => {
// 	await page.getByRole("link", { name: "my favorite movies" }).click()
// 	await page.getByRole("link", { name: "Edit" }).click()
// 	// ...
// })

// test("should add and delete movies from a list", async ({ page }) => {
// 	await page.getByRole("link", { name: "my favorite movies" }).click()
// 	await page.getByRole("button", { name: "Add/Remove Movies" }).click()
// 	//...
// })

```


fixtures\testSetup.ts

```ts
// fixtures/testSetup.ts
import { test as base } from "@playwright/test"
import { LoginPage } from "../pageobjects/LoginPage"

type TestFixtures = {
	loginPage: LoginPage
}
export const test = base.extend<TestFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},
})
```

types\task

```ts

```

types\user

```ts

```

pageObjects\LoginPage.ts

```ts
import type { Locator, Page } from "@playwright/test"

export class LoginPage {
	constructor(private page: Page) {}
	private usernameInput = this.page.locator("#username")
	private passwordInput = this.page.locator("#password")
	private loginButton = this.page.locator('button[type="submit"]')
	async login(username: string, password: string) {
		await this.usernameInput.fill(username)
		await this.passwordInput.fill(password)
		await this.loginButton.click()
	}
}

export class Login {
	readonly page: Page
	readonly username: Locator
	readonly password: Locator
	readonly signIn: Locator

	constructor(page: Page) {
		this.page = page
		this.username = page.locator('(//input[@id="outlined-name"])[1]')
		this.password = page.locator('(//input[@id="outlined-name"])[2]')
		this.signIn = page.locator('(//span[normalize-space()="SIGN IN"])[1]')
	}

	async goto() {
		await this.page.goto("https://charlyautomatiza.github.io/task-management-frontend")
	}

	async sigIn(username: string, password: string) {
		await this.username.fill(username)
		await this.password.fill(password)
		await this.signIn.click()
	}
}

```

pageObjects\tasks.ts

```ts
import type { Locator, Page } from "@playwright/test"

export class Tasks {
	readonly page: Page
	readonly search: Locator
	readonly taskTitle: Locator

	constructor(page: Page) {
		this.page = page
		this.search = page.locator('input[placeholder="Search..."]')
		this.taskTitle = page.locator('(//div[@class="MuiCardContent-root"]/h1)[1]')
	}

	async findTask(criteria: string) {
		await this.search.fill(criteria)
		await this.page.waitForLoadState("networkidle")
	}

	async getTaskTitle() {
		return this.taskTitle.innerText()
	}
}

```

utils\selectDropdown.ts

```ts
import type { Page } from "@playwright/test"
export async function selectDropdownValue(page: Page, selector: string, value: string) {
	await page.locator(selector).click()
	await page.locator(`text="${value}"`).click()
}

```

####

```sh
npx playwright init-agents --loop=vscode

```

### session user pooling dering view transition

1. types for remote container user view
2. record action/loader coupled to route stub
3. extend orm create schema
4. future authorized req.

#### session view behaviors

\node\lib\types\

isAny.test.ts

```ts
import { expectTypeOf, test } from "vitest"

import type { IsAny } from "~/lib/types/IsAny.js"

test("returns true for type 'any'", () => {
	expectTypeOf<IsAny<any>>().toEqualTypeOf<true>()
})

test("returns false for other types", () => {
	expectTypeOf<IsAny<never>>().toEqualTypeOf<false>()
	expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>()
	expectTypeOf<IsAny<any[]>>().toEqualTypeOf<false>()
	expectTypeOf<IsAny<unknown[]>>().toEqualTypeOf<false>()
	expectTypeOf<IsAny<never[]>>().toEqualTypeOf<false>()
})
```

Maybe.test.ts

```ts
import { expectTypeOf, test } from "vitest"

import type { Maybe } from "~/lib/types/Maybe"

test("creates nullish for given type parameter", () => {
	expectTypeOf<Maybe<unknown[]>>().toEqualTypeOf<unknown[] | null | undefined>()
})
```

MaybeNull.test.ts

```ts
import { expectTypeOf, test } from "vitest"

import type { MaybeNull } from "../../../../app/lib/types/MaybeNull.js"

test("creates nullable for given type parameter", () => {
	expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number | null>()
})
```

MaybeUndefined.test.ts

```ts
import { expectTypeOf, test } from "vitest"

import type { MaybeUndefined } from "~/lib/types/MaybeUndefined"

test("return T | undefined union for given type parameter", () => {
	expectTypeOf<MaybeUndefined<string>>().toEqualTypeOf<string | undefined>()
})
```

#### action act on Routing structure

_auth.login.test.ts

```ts
import { expect, suite } from "vitest"
import { action } from "~/routes/_auth.login/route"
import { test } from "../../fixtures/admin.js"
import { createStubActionArgs } from "../../utils/createStubRouteArgs"

suite("action", () => {
	test("redirects to /admin on success", async ({ admin }) => {
		expect.hasAssertions()

		const form = new FormData()

		form.set("email", admin.viewer.email)
		form.set("password", admin.password)

		const request = new Request("http://localhost", {
			method: "post",
			body: form,
		})

		try {
			await action(createStubActionArgs({ request }))
		} catch (response) {
			if (!(response instanceof Response)) {
				throw response
			}

			expect(response.status).toBe(302)
			expect(response.headers.get("location")).toBe("/admin")
		}
	})

	test("returns error for incorrect email", async ({ admin }) => {
		const form = new FormData()

		form.set("email", "malformed email")
		form.set("password", admin.password)

		const request = new Request("http://localhost", {
			method: "post",
			body: form,
		})

		const response = await action(createStubActionArgs({ request }))

		expect(response.init?.status).toBe(422)
		expect(Object.keys(response.data.error ?? {})).toEqual(["email"])
	})

	test("returns error for incorrect password", async ({ admin }) => {
		const form = new FormData()

		form.set("email", admin.viewer.email)
		form.set("password", "1")

		const request = new Request("http://localhost", {
			method: "post",
			body: form,
		})

		const response = await action(createStubActionArgs({ request }))

		expect(response.init?.status).toBe(422)
		expect(Object.keys(response.data.error ?? {})).toEqual(["password"])
		expect(response.data.error?.password).toEqual(["Password must be at least 8 characters long"])
	})

	test("returns form error when user is not found", async ({ admin }) => {
		const form = new FormData()

		form.set("email", "test@example.com")
		form.set("password", admin.password)

		const request = new Request("http://localhost", {
			method: "post",
			body: form,
		})

		const response = await action(createStubActionArgs({ request }))

		expect(response.init?.status).toBe(401)
		expect(Object.keys(response.data.error ?? {})).toEqual([""])
		expect(response.data.error?.[""]).toEqual(["Invalid email or password"])
	})

	test("throws form error for wrong password", async ({ admin }) => {
		const form = new FormData()

		form.set("email", admin.viewer.email)
		form.set("password", `${admin.password}abc`)

		const request = new Request("http://localhost", {
			method: "post",
			body: form,
		})

		const response = await action(createStubActionArgs({ request }))

		expect(response.init?.status).toBe(401)
		expect(Object.keys(response.data.error ?? {})).toEqual([""])
		expect(response.data.error?.[""]).toEqual(["Invalid email or password"])
	})
})
```

utils\createStubRouteArgs.ts

```ts
import { RouterContextProvider } from "react-router"
import { auth } from "~/app/server/lib/auth/auth"
import type { LoaderArgs } from "~/app/server/lib/types/Loader"
import type { Replace } from "~/lib/types/Replace"
import { authContext } from "~/server/contexts/auth"
import { ormContext } from "~/server/contexts/orm"
import { resHeadersContext } from "~/server/contexts/resHeaders"
import { orm } from "~/server/lib/db/orm"
import type { ActionArgs } from "~/server/lib/types/Action"

interface CreateStubRouteArgsInput<TParams extends Record<string, unknown> = Record<string, unknown>> {
	params?: TParams
	request?: Request
	context?: RouterContextProvider
}

const createStubRouteArgs =
	<T extends LoaderArgs | ActionArgs>() =>
	<TParams extends Record<string, unknown> = Record<string, unknown>>({
		params,
		request,
		context = new RouterContextProvider(),
	}: CreateStubRouteArgsInput<TParams> = {}): Replace<
		T,
		{
			params: TParams
		}
	> => {
		const headers = new Headers()

		context.set(ormContext, orm)
		context.set(authContext, auth)
		context.set(resHeadersContext, headers)

		return {
			request: request ?? new Request("http://localhost"),
			context,
			params: params ?? ({} as TParams),
		} as any // TypeScript complains about the type, but everything is ok in practice. We can ignore this warning
	}

/**
 * Creates stub arguments for `loader`
 */
export const createStubLoaderArgs = createStubRouteArgs<LoaderArgs>()

/**
 * Creates stub arguments for `action`
 */
export const createStubActionArgs = createStubRouteArgs<ActionArgs>()

export const createStubMiddlewareArgs = createStubRouteArgs<LoaderArgs | ActionArgs>()
```

Replace.ts

```ts
import type { Simplify } from "./Simplify"

export type Replace<T, U> = Simplify<Omit<T, keyof U> & U>
```

setup\browser.ts

```ts
import "../../app/tailwind.css" // Adds styles so the app has correct look in Vitest Browser Mode
```

#### orm schema affected

```sh
pnpm add faker-js/faker
```

orm.ts

```ts
import type { MikroORM } from "@mikro-orm/mongodb"
import { afterAll, beforeAll, beforeEach, test } from "vitest"

import { orm } from "../../app/server/lib/db/orm.js"

export interface OrmTestContext {
	orm: MikroORM
}

beforeAll(async () => {
	orm.config.set("allowGlobalContext", true)
	await orm.getSchemaGenerator().ensureDatabase()
	await orm.connect()
})

afterAll(async () => {
	await orm.getSchemaGenerator().dropDatabase()
	await orm.close()
})

beforeEach(async () => {
	await orm.getSchemaGenerator().refreshDatabase()
})

export const ormTest = test.extend<OrmTestContext>({
	orm: [
		async ({ task: _ }, use) => {
			await use(orm)
		},

		{
			auto: true,
		},
	],
})

export { ormTest as test }
```

admin.ts

```ts
import { faker } from "@faker-js/faker"

import { Session, type User } from "../../app/server/db/entities.js"
import { auth } from "../../app/server/lib/auth/auth.js"

import { ormTest } from "./orm"

interface AdminParams {
	session: Session
	viewer: User
	request: Request
	password: string
}

export interface AdminTestContext {
	admin: AdminParams
}

export const adminTest = ormTest.extend<AdminTestContext>({
	async admin({ orm }, use) {
		const password = faker.internet.password({ length: 12 })
		const response = await auth.api.signUpEmail({
			asResponse: true,
			body: {
				email: faker.internet.exampleEmail(),
				password,
				name: "",
			},
		})

		const headers = new Headers()

		headers.set("cookie", response.headers.get("set-cookie") as string)

		const { token } = (await response.json()) as {
			token: string
		}

		const session = await orm.em.findOneOrFail(Session, { token: token })

		await use({
			session,
			password,
			viewer: session.user,
			request: new Request("http://localhost", { headers }),
		})
	},
})

export const test = adminTest
```

#### load single fetch

shared\adminAuthLoader.ts

```ts
import type { UNSAFE_DataWithResponseInit as DataWithResponseInit } from "react-router"
import { expect, suite } from "vitest"
import { AdminLoaderErrorCode, type AdminLoaderErrorData } from "../../app/server/lib/admin/adminLoaderError.js"
import type { Loader } from "../../app/server/lib/types/Loader.js"
import { adminTest } from "../fixtures/admin.js"
import { ormTest } from "../fixtures/orm.js"
import { createStubLoaderArgs } from "../utils/createStubRouteArgs.js"

/**
 * Creates a test suite for loaders that require admin authorization.
 * Use it to verify that the route has protection from public access
 *
 * @param loader - a loader to run tests for
 */
export const createAdminAuthLoaderSuite = (loader: Loader<any, any>) =>
	suite("admin auth loader", () => {
		ormTest("throws 401 with setup code", async () => {
			expect.hasAssertions()

			try {
				await loader(createStubLoaderArgs())
			} catch (error) {
				const response = error as DataWithResponseInit<AdminLoaderErrorData>

				expect(response.init?.status).toBe(401)
				expect(response.data).toEqual({
					type: "admin",
					code: AdminLoaderErrorCode.SETUP,
				})
			}
		})

		adminTest(
			"throws 401 with login code when admin account exist",

			async ({ admin: _ }) => {
				expect.hasAssertions()

				try {
					await loader(createStubLoaderArgs() as any)
				} catch (error) {
					const response = error as DataWithResponseInit<AdminLoaderErrorData>

					expect(response.init?.status).toBe(401)
					expect(response.data).toEqual({
						type: "admin",
						code: AdminLoaderErrorCode.LOGIN,
					})
				}
			}
		)
	})

```

## fix issues

### fix minor vitest configuration


#### typescript config, dependency missmatch

https://github.com/vitest-dev/vitest/discussions/5828

Error: @vitest/browser/context can be imported only inside the Browser Mode. Your test is running in forks pool. Make sure your regular tests are excluded from the "test.include" glob pattern.

```ts
	browser: {
				// enabled: true,
				headless: true,
				provider: "playwright",
				// https://playwright.dev
				//providerOptions: {},
				instances: [
					{
						browser: "chromium",
						include: ["tests/browser/**/*.test.{ts,tsx}"],
					},
```

- lots of zod error back and forth

```sh
pnpm add mathjs
pnpm add zod@^3.25.0
pnpm add @faker-js/faker@latest --save-dev
pnpm add -D @types/node

```

```sh
pnpm update @biomejs/biome @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/mongodb @mikro-orm/reflection @react-router/dev @react-router/fs-routes @react-router/node @tailwindcss/vite better-auth isbot react-router tailwindcss tsx typescript vite --latest -D

```

vitest.config

```ts
test: {
		typecheck: {
			enabled: true,
		},
```

tsconfig.ts

```ts
{
	"include": [
		"@types/**/*.d.ts",
		"**/*.config.ts",
{
	"include": [
		-...,
		"node_modules/vitest"
	],

		"verbatimModuleSyntax": true,
		"allowImportingTsExtensions": true,
		"allowSyntheticDefaultImports": true,
```

package.json

```json
		"test:e2e": "npx playwright test -ui",
		"test:e2e:ci": "npx playwright test"
```

#### env variable and config infra

[vites+tools]
https://dev.to/juan_deto/configure-vitest-msw-and-playwright-in-a-react-project-with-vite-and-ts-part-3-32pe


```ts
	webServer:{
			command: "npm run dev",
			url: "http://localhost:4280",
			reuseExistingServer: true,
			timeout: 120 * 1000,
		}
```

https://johnsmilga.com/articles/2024/10/15
- react testing library

npm install @testing-library/react @testing-library/jest-dom --save-dev
```ts

```

vites.config

```ts
import { loadEnv } from "vite"
import { defineConfig, loadEnv } from "vitest/config"
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "")
	return {
			define: {
			// Provide an explicit app-level constant derived from an env var.
			__APP_ENV__: JSON.stringify(env.APP_ENV),
		},

		plugins: [tsconfigPaths()],
		test: {
			env,
			environment: "node",
```

#### a few err fixes

@types\

vitest.d.ts

/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/providers/playwright" />

vite.d.ts

/// <reference types="vite/client" />

_auth.login\route.tsx

import { parseWithZod } from "@conform-to/zod/v4"

```ts
export const Input: FC<InputProps> = ({ className, type, errors, ...props }) => (
	<input
		type={type}
		data-slot="input"
		className={cn(
		dark:aria-invalid:ring-destructive/40",
			{
				"border-destructive": errors,
			},
			className
		)}
		{...props}
	/>
)
```

#### auth set up considerations

auth.setup.ts

```ts
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```

global.setup.ts

```ts
import { type APIRequestContext, expect, test as setup } from "@playwright/test"

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext

setup.beforeEach(async ({ playwright }) => {
	apiContext = await playwright.request.newContext({
		baseURL: "https://task-mgmt-charlyautomatiza.onrender.com",
		extraHTTPHeaders: {
			Accept: "application/json",
		},
	})
})

setup.afterEach(async () => {
	// Dispose all responses.
	await apiContext.dispose()
})

// Add a test for Playwright to recognize
setup("verify that the server is active", async () => {
	// Logic to check that the server is active
	const timeout = 5 * 60 * 1000 // 5 minutes in milliseconds
	const interval = 60 * 1000 // Interval of 1 minute in milliseconds
	const startTime = Date.now()
	let response

	while (Date.now() - startTime < timeout) {
		response = await apiContext.get("/") // Change the route if necessary
		if (response.ok()) {
			const responseBody = await response.text() // Get the response body
			expect(response.status()).toBe(200) // Validate that the status is 200
			expect(responseBody).toContain("Hello World!") // Validate that the text contains "Hello World!"
			console.log("The server is active and responds correctly.")
			return // Exit the loop if the response is correct
		}
		console.log("Waiting for the server to wake up... Trying again in 1 minute.")
		await new Promise((resolve) => setTimeout(resolve, interval)) // Wait 1 minute before the next attempt
	}

	throw new Error('The server did not respond with a status 200 and "Hello World!" in the expected time.') // Throw an error if the time runs out
})
```

layered.spec.ts

```ts
})().catch(() => {
	// console.error(err)
	process.exit(1)
})
```

seed.spec.ts

```ts
import { expect, test } from "./fixtures"

test("seed", async ({ page }) => {
	// this test uses custom fixtures from ./fixtures
})
```

playwright.config.ts

```ts
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
// reporter: [["list"], ["allure-playwright"]]
	baseURL: "http://localhost:4280",
		// baseURL: process.env.BASE_URL,
		// Populates context with given storage state.
		storageState: "state.json",
			headless: true,
		screenshot: "only-on-failure",
		video: "retain-on-failure",
		projects: [
		{
			name: "setup",
			testMatch: "**/*.setup.ts", // runs setup steps first
		},
```

mytest.ts

```ts

import { test as base } from "@playwright/test"

type Account = {
	username: string
	password: string
}

// Note that we pass worker fixture types as a second template parameter.
export const test = base.extend<{}, { account: Account }>({
	account: [
		async ({ browser }, use, workerInfo) => {
			// Unique username.
			const username = "user" + workerInfo.workerIndex
			const password = "verysecure"

			// Create the account with Playwright.
			const page = await browser.newPage()
			await page.goto("/signup")
			await page.getByLabel("User Name").fill(username)
			await page.getByLabel("Password").fill(password)
			await page.getByText("Sign up").click()
			// Make sure everything is ok.
			await expect(page.getByTestId("result")).toHaveText("Success")
			// Do not forget to cleanup.
			await page.close()

			// Use the account value.
			await use({ username, password })
		},
		{ scope: "worker" },
	],

	page: async ({ page, account }, use) => {
		// Sign in with our account.
		const { username, password } = account
		await page.goto("/signin")
		await page.getByLabel("User Name").fill(username)
		await page.getByLabel("Password").fill(password)
		await page.getByText("Sign in").click()
		await expect(page.getByTestId("userinfo")).toHaveText(username)

		// Use signed-in page in the test.
		await use(page)
	},
})
// export { expect } from "@playwright/test"

// import { test as base, expect } from "@playwright/test"

// const test = base.extend<{ slowFixture: string }>({
// 	slowFixture: [
// 		async ({}, use) => {
// 			// ... perform a slow operation ...
// 			await use("hello")
// 		},
// 		{ timeout: 60000 },
// 	],
// })

// test("example test", async ({ slowFixture }) => {
// 	// ...
// })
```

input.browser.test.tsx

```ts
import { test } from "vitest"

// import { render } from "vitest-browser-react"

// import { Input } from "~/components/ui/input"

test("highlights errors", async () => {
	// const screen = render(<Input placeholder="test" errors={["Something's broken"]} />)
	// await expect.element(screen.getByPlaceholder("test")).toHaveClass("border-destructive")
})
```

login.browser.test.tsx

```ts
import { test } from "vitest"

// import { render } from "vitest-browser-react"

// import { Input } from "~/components/ui/input"

test("highlights errors", async () => {
	// const screen = render(<Input placeholder="test" errors={["Something's broken"]} />)
	// await expect.element(screen.getByPlaceholder("test")).toHaveClass("border-destructive")
})

// import type { SubmissionResult } from "@conform-to/react"
// import { createRoutesStub } from "react-router"
// import { expect, test } from "vitest"
// import { render } from "vitest-browser-react"

// import AdminLoginPage from "~/routes/_auth.login/LoginPage"

// test("displays login form", async () => {
// 	const Stub = createRoutesStub([
// 		{
// 			path: "/",
// 			Component: AdminLoginPage as any,
// 		},
// 	])

// 	const screen = render(<Stub initialEntries={["/"]} />)

// 	await expect.element(screen.getByText("Login")).toBeVisible()
// })

// test("has active Log in button", async () => {
// 	const Stub = createRoutesStub([
// 		{
// 			path: "/",
// 			Component: AdminLoginPage as any,
// 		},
// 	])

// 	const screen = render(<Stub initialEntries={["/"]} />)

// 	await expect.element(screen.getByRole("button", { name: "Log in" })).not.toBeDisabled()
// })

// test("has active Passkey button", async () => {
// 	const Stub = createRoutesStub([
// 		{
// 			path: "/",
// 			Component: AdminLoginPage as any,
// 		},
// 	])

// 	const screen = render(<Stub initialEntries={["/"]} />)

// 	await expect.element(screen.getByRole("button", { name: "Use Passkey" })).toBeEnabled()
// })

// test("hightlight input errors", async () => {
// 	const emailError = "Email required"
// 	const passwordError = "Password required"

// 	const Stub = createRoutesStub([
// 		{
// 			path: "/",
// 			Component: AdminLoginPage as any,
// 			async action(): Promise<SubmissionResult> {
// 				return {
// 					error: {
// 						email: [emailError],
// 						password: [passwordError],
// 					},
// 				}
// 			},
// 		},
// 	])

// 	const screen = render(<Stub initialEntries={["/"]} />)

// 	await screen.getByRole("button", { name: "Log in" }).click()

// 	await expect.element(screen.getByPlaceholder("me@example.com")).toHaveClass("border-destructive")

// 	await expect.element(screen.getByPlaceholder("your password")).toHaveClass("border-destructive")
// })
```

dbName.ts

```ts
import * as math from "mathjs"

// biome-ignore lint: We need to check env vars
process.env.DB_NAME = `eri_test_${math.floor(Math.random() * 10000)}`
```


### fix major vitest configuration