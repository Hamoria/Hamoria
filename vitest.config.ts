import react from "@vitejs/plugin-react"
import browserslist from "browserslist"
import { browserslistToTargets, Features } from "lightningcss"
import { loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"
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
			typecheck: {
				enabled: true,
			},
			globals: true,
			css: true,
			coverage: {
				all: false,
				include: ["app/**"],
				reporter: ["text", "json-summary", "json"],
				reportOnFailure: true,
				thresholds: {
					lines: 85,
					functions: 85,
					branches: 85,
					statements: 85,
				},
			},
			projects: [
				"packages/*",
				"tests/*/vitest.config.{e2e,unit}.ts",
				{
					extends: "./vitest.config.ts",
					plugins: [react()],
					test: {
						name: "server tests",
						environment: "node",
						// Include generic .test files that should work anywhere and .server.test files for server only, ignore .browser.test
						include: ["./**/*.server.test.{ts,tsx}", "!./**/*.browser.test.{ts,tsx}", "./**/*.test.{ts,tsx}"],
						globalSetup: ["tests/setup/docker.ts"],
						setupFiles: ["tests/setup/dbName.ts"],
					},
				},
				{
					extends: "./vitest.config.ts",
					plugins: [react()],

					optimizeDeps: {
						include: ["react/jsx-dev-runtime"],
					},
					server: {
						fs: {
							strict: false,
						},
					},
					test: {
						includeTaskLocation: true,
						// Include generic .test files that should work anywhere and .browser.test files for browser only, ignore .server.test
						include: [
							"tests/browser/**/*.test.ts?(x)",
							"tests/browser/**/*.desktop.ts?(x)",
							// "./**/*.test.{ts,tsx}",
							"./**/*.browser.test.{ts,tsx}",
							"!./**/*.server.test.{ts,tsx}",
						],
						setupFiles: ["./tests/setup.browser.tsx"],
						name: "browser tests",

						browser: {
							enabled: true,
							headless: true,
							provider: "playwright",
							// https://playwright.dev
							//providerOptions: {},
							instances: [
								{
									browser: "chromium",
									include: ["tests/browser/**/*.test.{ts,tsx}"],
									launch: {},

									context: {},
								},
								// {
								// 	browser: "firefox",
								// },
								// {
								// 	browser: "webkit",
								// },
							],
						},
					},
				},
			],
		},
		css: {
			transformer: "lightningcss",
			lightningcss: {
				targets: browserslistToTargets(browserslist(">= 0.25%")),
				include: Features.LightDark | Features.Colors,
			},
		},
		build: {
			cssMinify: "lightningcss",
			sourcemap: true,

			rollupOptions: {
				onLog(level, log, handler) {
					// if (log.cause && log.cause.message === `Can't resolve original location of error.`) {
					// 	return
					// }
					handler(level, log)
				},
			},
		},
	}
})
