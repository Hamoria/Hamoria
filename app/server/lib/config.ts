import "./env.js"
import { z } from "zod"
import { Config, type IConfig } from "./zod/Confg"

const envSchema = z.object({
	BLOG_NAME: z.string().nonempty(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	DB_NAME: z.string().nonempty(),
	DB_HOST: z.string().optional(), // optional string
	DB_PORT: z.string().optional(), // usually env vars are strings, parse to number if needed
	DB_USER: z.string().nonempty(),
	DB_PASSWORD: z.string().nonempty(),
	// add other environment vars here with validation as needed
})
type ServerEnv = z.infer<typeof envSchema>
let env: ServerEnv

// biome-ignore lint/style/noProcessEnv: This should be the only place to use process.env directly
const envData = envSchema.safeParse(process.env)

if (!envData.success) {
	// biome-ignore lint/suspicious/noConsole: We want this to be logged
	console.error("❌ Invalid environment variables:", envData.error.flatten().fieldErrors)
	throw new Error("Invalid environment variables")
}

env = envData.data
Object.freeze(env)

const config = Config.parse({
	app: {
		name: env.BLOG_NAME,
	},
	// auth: {
	// 	secret: process.env.AUTH_SECRET,
	// 	cookiePrefix: process.env.AUTH_COOKIE_PREFIX || undefined,
	// },
	// server: {
	// 	port: process.env.PORT || undefined,
	// },
	orm: {
		// debug: process.env.NODE_ENV,
		dbName: env.DB_NAME,
		host: env.DB_HOST || undefined,
		port: env.DB_PORT || undefined,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
	},
} satisfies IConfig)

export default config
