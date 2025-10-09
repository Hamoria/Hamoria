import react from "@vitejs/plugin-react"
import { defineWorkspace } from "vitest/config"
export default defineWorkspace([
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
				"./**/*.test.{ts,tsx}",
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
					},
					{
						browser: "firefox",
					},
					{
						browser: "webkit",
					},
				],
			},
		},
	},
])
