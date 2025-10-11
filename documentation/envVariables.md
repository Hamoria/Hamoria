
test\setup

test\setup
-docker
- isDevContainer

scripts\setup

server\lib\zod\common

```ts
export const NodeEnv = z.union([z.literal("development"), z.literal("production"), z.literal("test")])
```

server.lib\env

```
process.env.NODE_ENV = Env.parse(process.env.NODE_ENV)
```

server\lib\config


const envSchema = z.object({
	BLOG_NAME: z.string().nonempty(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	DB_NAME: z.string().nonempty(),
	DB_HOST: z.string().optional(), // optional string
	DB_PORT: z.string().optional(), // usually env vars are strings, parse to number if needed
	DB_USER: z.string().nonempty(),
	DB_PASSWORD: z.string().nonempty(),
	// add other environment vars here with validation as needed
	AUTH_SECRET: z.string().min(32),
	AUTH_COOKIE_PREFIX: z.string().optional(),
	PORT: z.string().optional(), // usually env vars are strings, parse to number if needed
})