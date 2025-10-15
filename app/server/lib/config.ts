import "./env.js"
import { z } from "zod/v4"
import { Config, type IConfig } from "./zod/Confg"

// const envSchema = z.object({
// 	BLOG_NAME: z.string().nonempty(),
// 	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
// 	DB_NAME: z.string().nonempty(),
// 	DB_HOST: z.string().optional(), // optional string
// 	DB_PORT: z.string().optional(), // usually env vars are strings, parse to number if needed
// 	DB_USER: z.string().nonempty(),
// 	DB_PASSWORD: z.string().nonempty(),
// 	// add other environment vars here with validation as needed
// 	AUTH_SECRET: z.string().min(32),
// 	AUTH_COOKIE_PREFIX: z.string().optional(),
// 	PORT: z.string().optional(), // usually env vars are strings, parse to number if needed
// })
export const envSchema = z.object({
	//primary instance
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.string().optional(),
	DB_NAME: z.string().nonempty(),
	DB_USER: z.string().nonempty(),
	DB_PASSWORD: z.string().nonempty(),
	DB_HOST: z.string().nonempty(),
	DB_PORT: z.string().optional(),
	MONGO_URL: z.string().optional(),
	MONGO_URL_LOCAL: z.string().optional(),
	MONGODB_USER: z.string().optional(),
	MONGODB_PASSWORD: z.string().optional(),
	MONGODB_DATABASE: z.string().optional(),
	MONGODB_OPTIONS: z.string().optional(),
	//issuer plugin
	AUTH_COOKIE_PREFIX: z.string().optional(),
	AUTH_SECRET: z.string().nonempty(),
	ISSUER: z.string().nonempty(),
	CLIENT_ID: z.string().nonempty(),
	CLIENT_SECRET: z.string().nonempty(),
	SESSION_SECRET: z.string().nonempty(),
	RESOURCE_HOST: z.string().nonempty(),
	ISSUER_HOST: z.string().nonempty(),
	AUDIENCE: z.string().nonempty(),
	//deployment
	APP_DEPLOYMENT_ENV: z.string().optional(),
	BLOG_NAME: z.string().nonempty(),
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
	auth: {
		secret: env.AUTH_SECRET,
		cookiePrefix: env.AUTH_COOKIE_PREFIX || undefined,
	},
	server: {
		port: env.PORT || undefined,
	},
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
