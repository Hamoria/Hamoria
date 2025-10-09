import browserslist from "browserslist"
import { browserslistToTargets, Features } from "lightningcss"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"
export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		css: true,
		coverage: {
			all: false,
			include: ["app/**"],
			reporter: ["text", "json-summary", "json"],
			reportOnFailure: true,
		},
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
})
