import { copyFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { reactRouterDevTools } from "react-router-devtools"
import { reactRouterHonoServer } from "react-router-hono-server/dev"
// import swc from "rollup-plugin-swc"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet"
import tsconfigPaths from "vite-tsconfig-paths"
export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		// Run the react-compiler on .tsx files only when bundling
		{
			...babel({
				filter: /\.tsx?$/,
				babelConfig: {
					presets: ["@babel/preset-typescript"],
					plugins: [
						"babel-plugin-react-compiler",
						["@babel/plugin-proposal-decorators", { legacy: true }],
						["@babel/plugin-proposal-class-properties", { loose: true }],
					],
				},
			}),
			apply: "build",
		},
		reactRouterDevTools(),
		reactRouter(),
		{
			name: "copy-reflect-metadata",
			generateBundle() {
				const srcPath = resolve("node_modules/reflect-metadata/Reflect.js")
				const destDir = resolve("build/client/assets")
				const destPath = resolve(destDir, "reflect-metadata.js")

				try {
					mkdirSync(destDir, { recursive: true })
					copyFileSync(srcPath, destPath)
					// console.log("✓ Copied reflect-metadata to assets")
				} catch {
					// console.warn("Failed to copy reflect-metadata")
				}
			},
		},
		reactRouterHonoServer({
			dev: {
				exclude: [/^\/(resources)\/.+/],
			},
		}),
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: "./resources/icons",
			outputDir: "./app/library/icon/icons",
			fileName: "icon.svg",
			withTypes: true,
			formatter: "biome",
		}),
	],
	server: {
		open: true,
		// biome-ignore lint/style/noProcessEnv: Its ok to use process.env here
		port: Number(process.env.PORT || 4280),
	},
	test: {
		typecheck: {
			enabled: true,
		},
	},
})
