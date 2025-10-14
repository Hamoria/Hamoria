#

##
1. cross container
- first entry dev dependencies
2. identity map, decorators
-
3. singlaton

4. edge

### set up cross container ssr prod ready

#### vite setup micro orm  with vite (vite,package.json config)

[get-started] https://mikro-orm.io/docs/guide/first-entity

```sh
pnpm add @mikro-orm/core \
            @mikro-orm/mongodb \
            @mikro-orm/reflection \

```

```sh
pnpm add --save-dev @mikro-orm/cli \
                       typescript \
                       ts-node \
                       @types/node \
                       vitest

pnpm add -D @vitejs/plugin-react
```

package.json

- some packed package for mjs it seams, dont need patch

[hono] https://v2.remix.run/resources/remix-hono

```json
{
"postinstall": "pnpm run typegen",
		"preinstall": "npx --yes only-allow pnpm"
	},
	"mikro-orm": {
		"configPaths": [
			"./app/server/lib/db/configs/dev.ts",
			"./build/db/mikro-orm.config.js"
		]
	},
	"pnpm": {
		"supportedArchitectures": {
			"os": [
				"darwin",
				"linux"
			],
			"cpu": [
				"x64",
				"arm64"
			]
		},
		"overrides": {
			"react-router-hono-server@2>hono": "$hono"
		},
		// "patchedDependencies": {
		// 	"react-router": "patches/react-router.patch"
		// }
	},
```

[..] https://github.com/vitejs/vite/issues/15012

vite.config.ts

```ts
	test: {
		typecheck: {
			enabled: true,
		},
	},

	build: {

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
```

vite.mikro-orm.config.ts

[bundle-db-client]https://vite.dev/guide/build.html#library-mode

```ts
import { defineConfig } from "vite"

export default defineConfig({
	build: {
		target: "esnext",
		outDir: "build/db",
		ssr: true,
		copyPublicDir: false,
		lib: {
			formats: ["es"],
			entry: {
				"mikro-orm.config": "app/server/lib/db/configs/prod.ts",
			},
		},
	},
})
```

micro-orm.config

```ts
import { MongoDriver, type Options } from "@mikro-orm/mongodb"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"

const config: Options = {
	// for simplicity, we use the SQLite database, as it's available pretty much everywhere
	driver: MongoDriver,
	dbName: "mongodb.db",
	// folder-based discovery setup, using common filename suffix
	entities: ["dist/**/*.entity.js"],
	entitiesTs: ["src/**/*.entity.ts"],
	// we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
	// check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
	metadataProvider: TsMorphMetadataProvider,
	// enable debug mode to log SQL queries and discovery information
	debug: true,
}

export default config
```

vitest.workspace.ts

- setup files

```ts
import react from "@vitejs/plugin-react"

export default defineWorkspace([
	{
		plugins: [react()],
		test: {
		...
			globalSetup: ["tests/setup/docker.ts"],
			setupFiles: ["tests/setup/dbName.ts"],
		},


		plugins: [react()],

		....
			include: [
				"tests/browser/**/*.test.ts?(x)",
				"tests/browser/**/*.desktop.ts?(x)",
				"./**/*.test.{ts,tsx}",
				"./**/*.browser.test.{ts,tsx}",
				"!./**/*.server.test.{ts,tsx}",
			],
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
```

##### note err

pnpm run test

Serialized Error: { code: 'ERR_MODULE_NOT_FOUND' }
Caused by: Error: Failed to load url /home/fallow/base-stack/tests/setup/docker.ts (resolved id: /home/fallow/base-stack/tests/setup/docker.ts). Does the file exist?
 ❯ loadAndTransform node_modules/.pnpm/vite@7.1.5_@types+node@24.5.1_jiti@2.5.1_lightningcss@1.30.2_tsx@4.20.5/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:26400

pnpm run build

- mb post generatet, empty is fine?

 ✓ 7896 modules transformed.
Generated an empty chunk: "sitemap-index_._xml".
Generated an empty chunk: "sitemap._lang_._xml".
Generated an empty chunk: "resource.locales".
Generated an empty chunk: "robots_._txt".
Generated an empty chunk: "ping".

The unstable_viteEnvironmentApi is enabled.
This is experimental and may break your build.

#### fix cross container testable (health check)
- fix test is-inside container , ignore process.env
- we had some browser types, and should also be cross containerable.

```sh
pnpm add is-inside-container
pnpm add execa
pnpm exec playwright install
```


error during close browserType.launch: Executable doesn't exist at /home/fallow/.cache/ms-playwright/firefox-1490/firefox/firefox

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Error ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: browserType.launch: Executable doesn't exist at /home/fallow/.cache/ms-playwright/firefox-1490/firefox/firefox

tests\utils\isDevContainer.ts

```ts
import isInsideContainer from "is-inside-container"

/**
 * Checks if current process runs within devcontainer
 *
 * Note: This might need some improvents, because ccurrent sulution is relied on `REMOTE_CONTAINERS` env variable to be set + the result of `is-inside-container`.
 * This alone might not in practice mean that the process is indeed inside dev container.
 */
// biome-ignore lint/suspicious/noProcessEnv: We need to check env vars
export const isDevContainer = (): boolean => isInsideContainer() && !!process.env.REMOTE_CONTAINERS
```

setup\docker.ts

```ts
// import { $ } from "execa"

import { isDevContainer } from "../utils/isDevContainer.js"

async function setup() {
	// Skip docker compose setup and point to local database instead
	if (isDevContainer()) {
		return
	}

	// Setting up global env variables. All read-only complaints should be ignored by TypeScript

	// biome-ignore lint: We need to check env vars
	process.env.DB_HOST = "localhost"

	// biome-ignore lint: We need to check env vars
	process.env.DB_PORT = "3308"

	// await $`docker compose --env-file .env.test.local -f compose.test.yaml up --wait --build`

	// return async function teardown() {
	// 	await $`docker compose --env-file .env.test.local -f compose.test.yaml down`
	// }
}

export default setup
```

setup\dbName.ts

```ts
// import { v7 } from "uuid"

// biome-ignore lint: We need to check env vars
// process.env.DB_NAME = `eri_test_${math.floor(Math.random() * 10000)}`
```


### request context with decorators and identity map

```txt
1. ...
- [-]use decorators
	-
- [-]withORM construct microorm FOR server context
- [-]db should add migrators and auth
- [-]server lib load env
2. ....
- [-] mult zod typings
3. ....
- [-] records are in identity map
- [-] db types
```

#### micro orm for entities (leader based ts)

Unable to resolve signature of property decorator when called as an expression.
  Argument of type 'undefined' is not assignable to parameter of type 'Partial<any>'.ts(1240)
(alias) PrimaryKey<object>(options?: PrimaryKeyOptions<object> | undefined): (target: AnyEntity, propertyName: string) => any
import PrimaryKey


[] https://mikro-orm.io/docs/guide/first-entity#configuring-typescript
 ma
tsconfig.json

```json
  "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strictPropertyInitialization": false
```

##### web server w leader based entries managment - cross container

- lib and server with client to cross container comunication

lib\db\orm.ts

```ts
import { MikroORM, RequestContext } from "@mikro-orm/mongodb"

import config from "./configs/base"

let cache: Promise<MikroORM> | undefined

export const orm = MikroORM.initSync(config)

/**
 * @deprecated - use `orm` object directly
 */
export const createOrm = () => MikroORM.init(config)

/**
 * @deprecated - use `orm` object directly
 */
export function getOrm(): Promise<MikroORM> {
	if (!cache) {
		cache = createOrm()
	}

	return cache
}

export type WithOrmCallback<TResult, TArgs extends unknown[]> = (
	orm: MikroORM,

	...args: TArgs
) => Promise<TResult>

/**
 * @deprecated - use `orm` object directly
 */
export const withOrm =
	<TResult, TArgs extends unknown[]>(fn: WithOrmCallback<TResult, TArgs>) =>
	async (...args: TArgs) => {
		const orm = await getOrm()

		return RequestContext.create(orm.em, () => fn(orm, ...args))
	}
```

lib\db\config-->

base.ts

```ts
// import { join } from "node:path"
// import { Migrator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/mongodb"

import * as entities from "../../../db/entities"
// import * as subscribers from "../../../db/subscribers.js"

import appConfig from "../../config"

const { orm } = appConfig

// const base = join(process.cwd(), "app", "server", "db")

const config = defineConfig({
	...orm,

	ensureDatabase: true,
	entities: Object.values(entities),
	// subscribers: Object.values(subscribers).map((Subscriber) => new Subscriber()),
	// extensions: [Migrator],
	// migrations: {
	// 	path: join(base, "migrations"),
	// },
})

export default config
```

server\lib\config.ts

- webb service leader based orm container

```ts
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
```

server/lib/env

```ts
import { resolve } from "node:path"

// import pc from "picocolors"

import { Env } from "./zod/Env.js"

// biome-ignore lint/style/noProcessEnv: This should be the only place to use process.env directly
process.env.NODE_ENV = Env.parse(process.env.NODE_ENV)

function loadEnv(name: string): boolean {
	let hasFound = false

	const path = resolve(name)
	try {
		process.loadEnvFile(path)

		hasFound = true
	} catch (error) {
		const reason = error as NodeJS.ErrnoException
		if (!reason.code || reason.code !== "ENOENT") {
			throw error
		}
	} finally {
		// const status = [!hasFound && "not", "found"].filter(Boolean).join(" ")
		// const color = hasFound ? pc.green : pc.yellow
		// biome-ignore lint/style/noProcessEnv: This should be the only place to use process.env directly
		if (process.env.NODE_ENV !== "test") {
			// console.log("Load env from %s (%s)", path, color(status))
		}
	}

	return hasFound
}
// biome-ignore lint/style/noProcessEnv: This should be the only place to use process.env directly
const env = process.env.NODE_ENV
const sources = [`.env.${env}.local`, `.env.${env}`, ".env.local", ".env"] as const

const loadedAny = sources.some((source) => loadEnv(source))
if (!loadedAny) {
	// console.info("No .env files found. Fallback to process.env object.")
}
```

dev.ts

```ts
import "../../env.js"

// ! Config is imported asynchronously because of how Vite bundles dependencies (it breaks the order). Maybe I'll find a better solution
export default import("./base.js").then(({ default: config }) => config)
```

prod.ts

```ts
// import { join } from "node:path"

// import { defineConfig } from "@mikro-orm/mariadb"
// import { Migrator } from "@mikro-orm/migrations"

// import * as entities from "../../../db/entities.js"
// import * as subscribers from "../../../db/subscribers.js"

// import appConfig from "../../config.js"

// const { orm } = appConfig

// const base = join(process.cwd(), "app", "server", "db")

// const config = defineConfig({
// 	...orm,

// 	ensureDatabase: true,
// 	entities: Object.values(entities),
// 	subscribers: Object.values(subscribers).map((Subscriber) => new Subscriber()),
// 	extensions: [Migrator],
// 	migrations: {
// 		path: join(base, "migrations"),
// 	},
// })

// export default config
```

#### the typing of orm webb app., input, output. (type safe freeze ctx)



lib\zod\config.ts

```ts
import { z } from "zod"

import { App } from "./config/App"
// import { Auth } from "./config/Auth"
import { Orm } from "./config/Orm"
// import { Server } from "./config/Server"

export const Config = z
	.object({
		app: App,
		// server: Server,
		orm: Orm,
		// auth: Auth,
	})
	.transform((value) => Object.freeze(value))

export type IConfig = z.input<typeof Config>

export type OConfig = z.output<typeof Config>
```

lib\zod\config-->

App.ts

```ts
import { z } from "zod"

import { Name } from "./app/Name"

export const App = z
	.object({
		name: Name,
	})
	.transform((value) => Object.freeze(value))

export type IApp = z.input<typeof App>

export type OApp = z.output<typeof App>
```

Name.ts

```ts
import { z } from "zod"

export const Name = z.string().trim().min(1).optional().default("Eri's Blog")

export type IName = z.input<typeof Name>

export type OName = z.output<typeof Name>
```

Auth.ts

```ts

```

Orm.ts

```ts
import { z } from "zod"
import { DatabaseHost } from "./orm/DatabaseHost"
import { DatabaseName } from "./orm/DatabaseName"
import { DatabasePort } from "./orm/DatabasePort"
import { DatabaseUserName } from "./orm/DatabaseUserName"
import { DatabaseUserPassword } from "./orm/DatabaseUserPassword"
// import { Debug } from "./orm/Debug.js"

export const Orm = z
	.object({
		// debug: Debug,
		host: DatabaseHost,
		port: DatabasePort,
		dbName: DatabaseName,
		user: DatabaseUserName,
		password: DatabaseUserPassword,
	})
	.transform((value) => Object.freeze(value))

export type IOrm = z.input<typeof Orm>

export type OOrm = z.output<typeof Orm>
```


lib\zod\config -->

Server.ts

```ts

```

server\serverPort.ts

```ts
import type { z } from "zod"

import { Port } from "../../common/Port"

export const ServerPort = Port.default(3000)

export type IServerPort = z.input<typeof ServerPort>

export type OServerPort = z.output<typeof ServerPort>
```

zod\Env.ts

```ts
import type { z } from "zod"

import { NodeEnv } from "./common/NodeEnv"

export const Env = NodeEnv.default("development")

export type IEnv = z.input<typeof Env>

export type OEnv = z.output<typeof Env>
```


#### entity records (lice cycle)

server\db\entries

```ts
// export { PostPrevKnownSlug } from "./entities/PostPrevKnownSlug.js"
// export { Session } from "./entities/Session.js"
export { User } from "./entities/Users"
```

db\entries-->

Node.ts

```ts

import type { ObjectId } from "@mikro-orm/mongodb"
import { Entity, PrimaryKey, SerializedPrimaryKey } from "@mikro-orm/mongodb"

@Entity()
export abstract class Node {
	@PrimaryKey()
	_id!: ObjectId

	@SerializedPrimaryKey()
	id!: string // a string representation, virtual in the entity
}

// export abstract class Node {
// 	@PrimaryKey({ type: "uuid" })
// 	readonly id: string = uuidV7()
// }
```

Record.ts

```ts
import { Index, type Opt, Property } from "@mikro-orm/mongodb"

import { Node } from "./Node"

/**
 * Represents abstract base database entity with comman dates
 */
export abstract class Record extends Node {
	/**
	 * The date and time the entity is created
	 */
	@Property<Record>({ type: "datetime" })
	@Index()
	readonly createdAt: Opt<Date> = new Date()

	/**
	 * The date and time the entity was last updated
	 */
	@Property<Record>({ type: "datetime", onUpdate: () => new Date() })
	@Index()
	readonly updatedAt: Opt<Date> = new Date()
}
```

lib/types\MaybeNull.ts

```ts
export type MaybeNull<T> = T | null
```

RecordSoft.ts

```ts
import { Index, type Opt, Property } from "@mikro-orm/mongodb"

import type { MaybeNull } from "../../../lib/types/MaybeNull"

import { Record } from "./Record"

/**
 * Represents soft-removable database entity
 */
export abstract class RecordSoft extends Record {
	/**
	 * The date and time the entity have been marked as removed
	 */
	@Property<RecordSoft>({ type: "string", nullable: true, default: null })
	@Index()
	removedAt: MaybeNull<Opt<Date>> = null
}
```

User.ts

```ts
import { Entity, type Opt, Property, Unique } from "@mikro-orm/mongodb"
import type { User as UserSchema } from "better-auth"

// import { Passkey } from "./Passkey.js"
import { RecordSoft } from "./RecordSoft.js"

export interface UserBase extends Omit<UserSchema, "name"> {}

export type UserInput = Pick<UserBase, "email">

/**
 * Represents a user stored in database
 */
@Entity()
export class User extends RecordSoft implements UserBase {
	/**
	 * User email address
	 */
	@Property<User>({ type: "string" })
	@Unique()
	email!: string

	@Property<User>({ type: "boolean", default: false, nullable: false })
	emailVerified: Opt<boolean> = false

	@Property<User>({ type: "string", persist: false })
	readonly name: Opt<string> = ""

	@Property<User>({ type: "string", persist: false })
	readonly image: Opt<string> = ""

	// 	@OneToMany(() => Passkey, "user")
	// 	passkeys = new Collection<Passkey, this>(this)
}
```


##### database types

NodeEnv.ts

```ts
import { z } from "zod"

export const NodeEnv = z.union([z.literal("development"), z.literal("production"), z.literal("test")])

export type INodeEnv = z.input<typeof NodeEnv>

export type ONodeEnv = z.output<typeof NodeEnv>
```

Port.ts

```ts
import { z } from "zod"

export const Port = z.coerce
	.number()
	.min(1) // Including reserved, just in case
	.max(2 ** 16 - 1) // 65635

export type IPort = z.input<typeof Port>

export type OPort = z.output<typeof Port>

// export const Port = z.union([z.number(), z.string().trim()]).pipe(
// 	z.coerce
// 		.number()
// 		.min(1) // Including reserved, just in case
// 		.max(2 ** 16 - 1) // 65635
// )
```

DatabaseHost.ts

```ts
import { z } from "zod"

export const DatabaseHost = z
	.union([
		z.literal("localhost"),
		z.string(), //.ip(),
		z.string().url(),
		z
			.string()
			.min(3)
			.regex(/[a-z0-9_]{3,}/), // Loosen the validation a bit, for docker compose networks
	])
	.default("localhost")

export type IDatabaseHost = z.input<typeof DatabaseHost>

export type ODatabaseHost = z.output<typeof DatabaseHost>
```

DatabaseName.ts

```ts
import { z } from "zod"

const pattern = /^[a-z0-9-_]+$/i

const message = `Invalid database name. The value must correspond following pattern: ${pattern.source}`

export const DatabaseName = z.string().regex(pattern, message)

export type IDatabaseName = z.input<typeof DatabaseName>

export type ODatabaseName = z.output<typeof DatabaseName>
```

DatabasePort.ts

```ts
import type { z } from "zod"

import { Port } from "../../common/Port.js"

export const DatabasePort = Port.default(3306)

export type IDatabasePort = z.input<typeof DatabasePort>

export type ODatabasePort = z.output<typeof DatabasePort>
```

DatabaseUserName.ts

```ts
import { z } from "zod"

export const DatabaseUserName = z.string().min(1, "User name required")

export type IDatabaseUserName = z.input<typeof DatabaseUserName>

export type ODatabaseUserName = z.output<typeof DatabaseUserName>
```

DatabaseUserPassword.ts

```ts
import { z } from "zod"

export const DatabaseUserPassword = z.string().min(8)

export type IDatabaseUserPassword = z.input<typeof DatabaseUserPassword>

export type ODatabaseUserPassword = z.output<typeof DatabaseUserPassword>
```

### complete incomplete  request-scoped EntityManager for singleton MikroOrm instance. (monolith)

- configuration define connection

db/congig --> withORM middleware -> server entry point

#### simplify ctx  w getRoute match ctx setup for middleware (manifest)

```sh
pnpm add @node-rs/argon2
pnpm add better-auth-mikro-orm
```


server\context.ts

```ts
import type { Options } from "@mikro-orm/core"

import { authContext } from "./contexts/auth"
import { matchesContext } from "./contexts/matches"
import { ormContext } from "./contexts/orm"
import { resHeadersContext } from "./contexts/resHeaders"
import { getRouteMatches } from "./lib/utils/routes"

export const getAppContext = async (ctx: Context, options: Options) => {
	// get the locale from the context
	const locale = i18next.getLocale(ctx)
	// get t function for the default namespace
	const t = await i18next.getFixedT(ctx)
	// get the server environment
	const env = getServerEnv()

	const context = new RouterContextProvider()

	context.set(authContext, ctx.var.auth)
	context.set(ormContext, ctx.var.orm)
	context.set(resHeadersContext, ctx.var.resHeaders)

	const matches = getRouteMatches(options.build.routes, ctx.req.url, options.build.basename)

	context.set(matchesContext, matches ?? [])

	return {
		lang: locale,
		t,

		env,
		clientEnv: getClientEnv(),
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: ctx.body,
		context,
	}
}

export const getLoadContext = async (c: Context, options: Options) => {
	const ctx = new RouterContextProvider()
	const globalCtx = await getAppContext(c, options)
	ctx.set(globalAppContext, globalCtx)
	return ctx
}
```

##### ctx (async store)

contexts\-->

admin.ts

```ts
import { createContext } from "react-router"

// import type { AdminViewer } from "../lib/admin/AdminArgs.js"

export const adminContext = createContext<null>()
```

auth.ts

```ts
import { createContext } from "react-router"

import type { Auth } from "../lib/auth/auth"

export const authContext = createContext<Auth>()
```

matches.ts

```ts
import { createContext } from "react-router"

import type { RouteMatchWithPattern } from "../lib/utils/routes"

export const matchesContext = createContext<RouteMatchWithPattern[]>()
```

orm.ts

```ts
import type { MikroORM } from "@mikro-orm/mongodb"
import { createContext } from "react-router"

export const ormContext = createContext<MikroORM>()
```

resHeaders.ts

```ts
import { createContext } from "react-router"

export const resHeadersContext = createContext<Headers>()
```

#### connect and create and configure the server + route manifest(create, match, normalize)

Simplify.ts

```ts
export type Simplify<T> = { [K in keyof T]: T[K] } & {}
```


index.ts

```ts
import { csrf } from "hono/csrf"
import { RouterContextProvider } from "react-router"

import type { auth } from "./lib/auth/auth.ts"
import config from "./lib/config.ts"
import type { orm } from "./lib/db/orm.ts"
import { getRouteMatches } from "./lib/utils/routes.ts"
import { withAuth } from "./middlewares/hono/withAuth.ts"
import { withOrm } from "./middlewares/hono/withOrm.ts"
import { withResponseHeaders } from "./middlewares/hono/withResponseHeaders.ts"

export interface Variables {
	orm: typeof orm
	auth: typeof auth
	resHeaders: Headers
}

export interface Env {
	Variables: Variables
}

export default await createHonoServer({
	port: config.server.port,
	configure(server) {
		server
			.use(withResponseHeaders())
			.use(csrf()) // TODO: specify origin for production
			.use(withOrm())
			.use(withAuth())

		server.use("*", i18next(i18nextOpts))
	},
	defaultLogger: false,
	getLoadContext,
})
```

lib\utils\routes.ts

```ts
// Based on: https://github.com/remix-run/react-router/blob/04a62722fea11baa9ccea682879e530791e28c00/packages/react-router/lib/server-runtime/routes.ts#L19-L56

import { matchRoutes, type ServerBuild } from "react-router"
import type { Simplify } from "../../../lib/types/Simplify"

export type ServerRouteManifest = ServerBuild["routes"]

export type ServerRoute = NonNullable<ServerRouteManifest[keyof ServerRouteManifest]>

export type AgnosticRouteMatch = NonNullable<ReturnType<typeof matchRoutes>>[number]

export type RouteMatchWithPattern = Simplify<AgnosticRouteMatch & { pattern: string }>

const normalizePath = (path: string) => path.replace(/\/{2,}/, "/").replace(/\/$/, "")

function groupRoutesByParentId(manifest: ServerRouteManifest) {
	const routes: Record<string, Omit<ServerRoute, "children">[]> = {}

	Object.values(manifest).forEach((route) => {
		if (route) {
			const parentId = route.parentId || ""
			if (!routes[parentId]) {
				routes[parentId] = []
			}
			routes[parentId].push(route)
		}
	})

	return routes
}

// Create a map of routes by parentId to use recursively instead of
// repeatedly filtering the manifest.
export function createRoutes(
	manifest: ServerRouteManifest,
	parentId = "",
	routesByParentId: Record<string, Omit<ServerRoute, "children">[]> = groupRoutesByParentId(manifest)
): ServerRoute[] {
	return (routesByParentId[parentId] || []).map((route) => ({
		...route,

		children: createRoutes(manifest, route.id, routesByParentId),
	}))
}

export function getRouteMatches(manifest: ServerRouteManifest, url: string | URL, basename = "/") {
	const { pathname: current } = new URL(url)

	const matches = matchRoutes(createRoutes(manifest), current, basename)

	if (!matches) {
		return undefined
	}

	const res: RouteMatchWithPattern[] = []

	matches.reduce((prev, next) => {
		// Make pattern for next match. Here's some notes:
		// prev.pattern will be always empty for the first match (which is `root.tsx`), because it wasn't assigned to any match yet
		// prev.route.path will be empty string for `root.tsx`, so we replace extra leading `/` in normalizePath
		// next.route.path might be `undefined`, so we assing empty string and strip out extra `/` later
		const pattern = normalizePath(
			`${(prev as any as RouteMatchWithPattern).pattern || prev.route.path || ""}/${next.route.path || ""}`
		)

		const match = { ...next, pattern }

		res.push(match)

		return match
	})

	return res
}

export function getCurrentRoteFromMatches(matches: RouteMatchWithPattern[], url: string | URL) {
	const { pathname: current } = new URL(url)

	return matches.find(({ pathname }) => pathname === current)
}

export function getCurrentRouteMeta(routes: ServerBuild["routes"], url: string | URL) {
	const matches = getRouteMatches(routes, url)

	return matches ? getCurrentRoteFromMatches(matches, url) : undefined
}
```

#### better auth part of client (adapt plug in)


auth\-->

auth.ts

```ts
import { betterAuth } from "better-auth"
import { passkey } from "better-auth/plugins/passkey"
import { mikroOrmAdapter } from "better-auth-mikro-orm"

import config from "../config.js"

import { orm } from "../db/orm.js"

import { hash, verify } from "./password"

export const auth = betterAuth({
	database: mikroOrmAdapter(orm),
	secret: config.auth.secret,
	emailAndPassword: {
		enabled: true,
		password: {
			hash: (password) => hash(password),
			verify: ({ hash, password }) => verify(hash, password),
		},
	},
	plugins: [
		// TODO: Add configuration
		passkey(),
	],
	advanced: {
		cookiePrefix: config.auth.cookiePrefix,
		generateId: false, // Handled by the ORM
	},
})

export type Auth = typeof auth
```

password.ts

```ts
import { hash as _hash, verify as _verify, type Options } from "@node-rs/argon2"

const normalize = (input: string) => input.normalize("NFKC")

const defaults: Options = {
	memoryCost: 19_456, // memory size
	timeCost: 2, // iterations
	outputLen: 32,
	parallelism: 1,
	version: 1,
}

export const hash = (password: string, options?: Options) => _hash(normalize(password), { ...defaults, ...options })

export const verify = (hash: string, password: string, options?: Options) =>
	_verify(hash, normalize(password), { ...defaults, ...options })
```

##### complete orm config with auth

server\lib\config.ts

```ts
const envSchema = z.object({

	DB_HOST: z.string().nonempty(),
	DB_PORT: z.string().optional(),
	MONGO_URL: z.string().optional(),
	MONGO_URL_LOCAL: z.string().optional(),
	AUTH_COOKIE_PREFIX: z.string().optional(),
	MONGODB_USER: z.string().optional(),
	MONGODB_PASSWORD: z.string().optional(),
	MONGODB_DATABASE: z.string().optional(),
	MONGODB_OPTIONS: z.string().optional(),
	AUTH_SECRET: z.string().nonempty(),
	ISSUER: z.string().nonempty(),
	CLIENT_ID: z.string().nonempty(),
	CLIENT_SECRET: z.string().nonempty(),
	SESSION_SECRET: z.string().nonempty(),
	RESOURCE_HOST: z.string().nonempty(),
	ISSUER_HOST: z.string().nonempty(),
	AUDIENCE: z.string().nonempty(),
	APP_DEPLOYMENT_ENV: z.string().optional(),
	BLOG_NAME: z.string().nonempty(),
})
```


env.d.ts

```ts
/// <reference types="react-router" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
```


db\orm.ts

- uh depricated, how to stable

```ts
export const createOrm = () => MikroORM.init(config) // returns Promise<MikroORM> - use async init at app startup
// MikroORM.init(config)
```


zod\config.ts

- complete instance setup

```ts
export const Config = z
	.object({
		app: App,
		server: Server,
		orm: Orm,

		auth: Auth,
	})
```

##### better auth fine grained configuration

zod\config\auth\cookiePrefix

```ts
import { z } from "zod"

export const CookiePrefix = z
	.string()
	.min(1)
	.regex(/^[a-z0-9_-]+$/i)
	.default("eri")

export type ICookiePrefix = z.input<typeof CookiePrefix>

export type OCookiePrefix = z.output<typeof CookiePrefix>
```


conhig\auth\Secrets.ts

```ts
import { z } from "zod"

export const Secret = z.string().min(21)

export type ISecret = z.input<typeof Secret>

export type OSecret = z.output<typeof Secret>
```


Server.ts

```ts
import { z } from "zod"

import { ServerPort } from "./server/ServerPort.js"

export const Server = z
	.object({
		port: ServerPort,
	})
	.transform((value) => Object.freeze(value))

export type IServer = z.input<typeof Server>

export type OServer = z.output<typeof Server>
```


withAuth.ts

```ts
import { createMiddleware } from "hono/factory"

import { auth } from "../../lib/auth/auth"

export const withAuth = () =>
	createMiddleware(async (ctx, next) => {
		ctx.set("auth", auth)

		await next()
	})
```


withOrm.ts

```ts
import { RequestContext } from "@mikro-orm/mongodb"
import { createMiddleware } from "hono/factory"

import { orm } from "../../lib/db/orm"

export const withOrm = () =>
	createMiddleware(async (ctx, next) => {
		ctx.set("orm", orm)

		return RequestContext.create(orm.em, () => next())
	})
```


withResponseHeaders.ts

```ts
import { createMiddleware } from "hono/factory"

import type { Env } from "../../../server"

export const withResponseHeaders = () =>
	createMiddleware<Env>(async (ctx, next) => {
		const headers = new Headers()

		ctx.set("resHeaders", headers)
		try {
			await next()
		} finally {
			headers.forEach((value, name) => {
				if (!ctx.res.headers.get(name) || ctx.res.headers.has("set-cookie")) {
					ctx.res.headers.set(name, value)
				}
			})
		}
	})
```

Auth.ts

```ts
import { z } from "zod"

import { CookiePrefix } from "./auth/CookiePrefix"
import { Secret } from "./auth/Secret"

export const Auth = z
	.object({
		secret: Secret,
		cookiePrefix: CookiePrefix,
	})
	.transform((value) => Object.freeze(value))

export type IAuth = z.input<typeof Auth>

export type OAuth = z.output<typeof Auth>
```


#### uh depricated + outdated challange (monolith)
AUTH_SECRET=supersecretkeywithlength
11:52:37 AM [vite] Internal server error: [
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 21,
    "inclusive": true,
    "path": [
      "auth",
      "secret"
    ],
    "message": "Too small: expected string to have >=21 characters"
  }
]

12:16:49 PM [vite] (ssr) Error when evaluating SSR module app/server/index.ts: Please provide either 'type' or 'entity' attribute in Node._id. If you are using decorators, ensure you have 'emitDecoratorMetadata' enabled in your tsconfig.json.

```sh
pnpm add @types/mongodb
```
Package                                 │ Current │ Latest     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @types/mongodb                          │ 4.0.7   │ Deprecated │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @biomejs/biome (dev)                    │ 2.2.4   │ 2.2.5      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @react-router/dev (dev)                 │ 7.9.1   │ 7.9.4      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @react-router/fs-routes (dev)           │ 7.9.1   │ 7.9.4      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @react-router/node                      │ 7.9.1   │ 7.9.4      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @tailwindcss/vite (dev)                 │ 4.1.13  │ 4.1.14     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ hono                                    │ 4.9.7   │ 4.9.10     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ isbot                                   │ 5.1.30  │ 5.1.31     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ lefthook (dev)                          │ 1.13.0  │ 1.13.6     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ react-router                            │ 7.9.1   │ 7.9.4      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ tailwindcss (dev)                       │ 4.1.13  │ 4.1.14     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ tsx (dev)                               │ 4.20.5  │ 4.20.6     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ typescript (dev)                        │ 5.9.2   │ 5.9.3      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ vite (dev)                              │ 7.1.5   │ 7.1.9      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ zod                                     │ 4.1.9   │ 4.1.12     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @dotenvx/dotenvx (dev)                  │ 1.49.1  │ 1.51.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @rollup/rollup-linux-x64-gnu (optional) │ 4.50.2  │ 4.52.4     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @types/node (dev)                       │ 24.5.1  │ 24.7.1     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @types/react (dev)                      │ 19.1.13 │ 19.2.2     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ @types/react-dom (dev)                  │ 19.1.9  │ 19.2.1     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ i18next                                 │ 25.5.2  │ 25.6.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ knip (dev)                              │ 5.63.1  │ 5.64.3     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ playwright (dev)                        │ 1.55.0  │ 1.56.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ react                                   │ 19.1.1  │ 19.2.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ react-dom                               │ 19.1.1  │ 19.2.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ remix-i18next                           │ 7.3.0   │ 7.4.2      │
├─────────────────────────────────────────┼─────────┼────────────┤
│ happy-dom (dev)                         │ 18.0.1  │ 20.0.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ react-i18next                           │ 15.7.3  │ 16.0.0     │
├─────────────────────────────────────────┼─────────┼────────────┤
│ lucide-react                            │ 0.544.0 │ 0.545.0    │

micro-orm.config.ts

- ts up is not configuring this

```
const config: Options = {
	driver: MongoDriver,
	dbName: "mongodb.db",
	// folder-based discovery setup, using common filename suffix
	entities: ["dist/**/*.entity.js"],
	entitiesTs: ["src/**/*.entity.ts"],
	entities: ["dist/db/entities/*.js"], // compiled JS files in dist
	entitiesTs: ["app/server/db/entities/*.ts"], // your TS sources
	// we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
	// check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
	metadataProvider: TsMorphMetadataProvider,

}
```

#####

```json
"@mikro-orm/migrations": "6.5.7",

		"@node-rs/argon2": "2.0.2",

		"@types/mongodb": "4.0.7",

		"better-auth-mikro-orm": "0.4.3",
```

fallow@Fallow:~/base-stack$ pnpm add reflect-metadata
 WARN  deprecated @types/mongodb@4.0.7: mongodb provides its own types. @types/mongodb is no longer needed.
Already up to date
Progress: resolved 928, reused 847, downloaded 0, added 0, done
 WARN  Issues with peer dependencies found
.
├─┬ react-router-hono-server 2.21.0
│ └── ✕ unmet peer @hono/node-server@^1.18.1: found 1.15.0
└─┬ remix-hono 0.0.18
  ├── ✕ unmet peer i18next@^24.0.5: found 25.5.2
  └── ✕ unmet peer zod@^3.0.0: found 4.1.9

dependencies:
+ reflect-metadata 0.2.2

Done in 9.8s using pnpm v10.16.1
fallow@Fallow:~/base-stack$

#####

```sh
pnpm remove @types/mongodb
 pnpm up @hono/node-server@latest
```

allow@Fallow:~/base-stack$ pnpm up @hono/node-server@latest
Packages: +117 -177
++++++++++++++++++++++++++++++++++++++++++++++++-------------------------------------------------------------------------
Progress: resolved 876, reused 753, downloaded 39, added 117, done
node_modules/.pnpm/esbuild@0.25.10/node_modules/esbuild: Running postinstall script, done in 1.5s

> @forge42/base-stack@0.0.1 preinstall /home/fallow/base-stack
> npx --yes only-allow pnpm

npm warn Unknown env config "enable-pre-post-scripts". This will stop working in the next major version of npm.
npm warn Unknown env config "verify-deps-before-run". This will stop working in the next major version of npm.
npm warn Unknown env config "_jsr-registry". This will stop working in the next major version of npm.
npm warn Unknown project config "enable-pre-post-scripts". This will stop working in the next major version of npm.
npm warn Unknown project config "side-effects-cache". This will stop working in the next major version of npm.

> @forge42/base-stack@0.0.1 postinstall /home/fallow/base-stack
> pnpm run typegen


> @forge42/base-stack@0.0.1 typegen /home/fallow/base-stack
> react-router typegen

The unstable_viteEnvironmentApi is enabled.
This is experimental and may break your build.

 WARN  Issues with peer dependencies found
.
└─┬ remix-hono 0.0.18
  └── ✕ unmet peer i18next@^24.0.5: found 25.5.2

optionalDependencies:
- @rollup/rollup-linux-x64-gnu 4.50.2
+ @rollup/rollup-linux-x64-gnu 4.52.4


```sh
pnpm add rollup-plugin-swc

pnpm add --save-dev @mikro-orm/cli \
                       typescript \
                       ts-node \
                       @types/node \
                       vitest
```

tsconfig.json

```json
{
"outDir": "dist",
		"declaration": true,
		},
	"ts-node": {
		"esm": true,
		"transpileOnly": true
	}
```

#### managed client

### edge connectivity

##### reflect meta data (script)

vite.config.ts

```ts
import { copyFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"

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
```

tsconfig.json

```json
	"types": ["vitest/globals", "@vitest/browser/providers/playwright", "reflect-metadata"],
```


index.ts

- not import "reflect-metadata"


root.tsx

```ts

	const { lang, clientEnv } = loaderData
	useChangeLanguage(lang)
	return (
		<>
			<Outlet />
			<script>{`window.env = ${JSON.stringify(clientEnv)}`}</script>
		</>
	)
}
import "reflect-metadata"
```

context.ts

```ts
body: (ctx as any).body, //?
```


##### client back off strategy

entities\Node.ts

- not a type

```ts
import { , ObjectId,  } from "@mikro-orm/mongodb"

@Entity()
export abstract class Node {
	@PrimaryKey()
	@PrimaryKey({ type: ObjectId })
```

db\subscribers.ts

```ts

```

congif\base.ts

```ts

import { MongoDriver } from "@mikro-orm/mongodb"
import appConfig from "../../config"

const { orm } = appConfig
const config = defineConfig({

	driver: MongoDriver,

class ConnectionManager {
	private async handleConnectionError(error: Error) {
		if (this.isRetryableError(error)) {
			await this.reconnect({
				maxRetries: 3,
				backoffStrategy: "exponential",
			})
		} else {
			throw new DatabaseConnectionError(error)
		}
	}

	private isRetryableError(error: Error): boolean {
		return ["PROTOCOL_CONNECTION_LOST", "ER_CON_COUNT_ERROR"].includes(error.message)
	}
}
```

config\retry.ts

```ts
import { MikroORM } from "@mikro-orm/core"

class ConnectionManager {
	private orm: MikroORM | null = null

	async connect(config) {
		try {
			this.orm = await MikroORM.init(config)
			console.log("Connected to DB")
		} catch (error) {
			await this.handleConnectionError(error)
		}
	}

	private async handleConnectionError(error: Error) {
		if (this.isRetryableError(error)) {
			console.log("Retrying connection...")
			await this.reconnect({ maxRetries: 3, backoffStrategy: "exponential" })
		} else {
			throw new Error(`DatabaseConnectionError: ${error.message}`)
		}
	}

	private isRetryableError(error: Error): boolean {
		// Add or customise error codes that are retryable
		return ["PROTOCOL_CONNECTION_LOST", "ER_CON_COUNT_ERROR"].some((msg) => error.message.includes(msg))
	}

	private async reconnect(options: { maxRetries: number; backoffStrategy: string }) {
		let attempts = 0
		const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

		while (attempts < options.maxRetries) {
			attempts++
			try {
				this.orm = await MikroORM.init(config)
				console.log("Reconnected to DB")
				return
			} catch (error) {
				console.log(`Reconnect attempt ${attempts} failed:`, error.message)
				const backoff = options.backoffStrategy === "exponential" ? 2 ** attempts * 1000 : 1000
				await delay(backoff)
			}
		}

		throw new Error("Max reconnect attempts reached")
	}

	async disconnect() {
		if (this.orm) {
			await this.orm.close(true)
		}
	}

	getEntityManager() {
		if (!this.orm) throw new Error("Not connected")
		return this.orm.em
	}
}
```

db/startup.ts

```ts
import { MikroORM } from "@mikro-orm/core"

async function initializeORM() {
	const advancedConfig = {
		// Automatically create database schema
		migrations: {
			tableName: "mikro_orm_migrations",
			path: "./migrations",
			transactional: true,
			allOrNothing: true,
		},
		// Entity discovery and loading
		entities: ["./dist/entities"],
		entitiesTs: ["./src/entities"],
		// Cache configuration
		cache: {
			enabled: true,
			options: {
				expiration: 3600,
				prefix: "my-app-cache:",
			},
		},
		// Query logging and debugging
		// logger: console.log.bind(console),
		debug: true,
		// Connection retry settings
		retry: {
			count: 3,
			delay: 1000,
			factor: 2,
		},
	}

	try {
		const orm = await MikroORM.init(advancedConfig)

		// Register shutdown handlers
		process.on("SIGINT", async () => {
			await orm.close()
			process.exit(0)
		})

		return orm
	} catch (error) {
		// console.error("Failed to connect to database:", error)
		throw error
	}
}
await initializeORM()
```

##### dependence generate back (load schema)

check-deps.js

```js
const checkDependencies = () => {
	const requiredDeps = ["@mikro-orm/core", "@mikro-orm/migrations", "typescript"]

	const pkg = import("./package.json")
	const missing = requiredDeps.filter(
		(dep) => !((pkg.dependencies && pkg.dependencies[dep]) || (pkg.devDependencies && pkg.devDependencies[dep]))
	)

	if (missing.length > 0) {
		throw new Error(`Missing dependencies: ${missing.join(", ")}`)
	}
	// console.log("All required dependencies are present!")
}
checkDependencies()
```

packag.json

```json
"build-base": "react-router build",
		"dev": "react-router dev",
		"start-base": "NODE_ENV=production node ./build/server/index.js",
		"build": "react-router build && vite -c vite.mikro-orm.config.ts build",
		"start": "NODE_ENV=production node ./build/server/index.js",
	"mikro-orm": "mikro-orm",
		"schema:create": "mikro-orm schema:create -r",
		"schema:update": "mikro-orm schema:update -r",
		"migration:create": "mikro-orm migration:create",
		"migration:up": "mikro-orm migration:up",
		"migration:down": "mikro-orm migration:down"
```

MaybeNull.test.ts

```ts
@@ -0,0 +1,7 @@
import { expectTypeOf, test } from "vitest"

import type { MaybeNull } from "../../../../app/lib/types/MaybeNull.ts"

test("creates nullable for given type parameter", () => {
	expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number | null>()
})
```

adminAuthLoader.ts


```ts
import { expectTypeOf, test } from "vitest"

import type { MaybeNull } from "../../../../app/lib/types/MaybeNull.ts"

test("creates nullable for given type parameter", () => {
	expectTypeOf<MaybeNull<number>>().toEqualTypeOf<number | null>()
})
```

zod\config\test.ts

```ts
import { describe, expect, it } from "vitest" // or jest
import { Config } from "../zod/Confg"

describe("Config schema", () => {
	it("successfully validates valid config", () => {
		const validInput = {
			app: {
				// provide valid properties expected by App schema
			},
			server: {
				// valid properties for Server
			},
			orm: {
				// valid properties for Orm
			},
			auth: {
				// valid properties for Auth
			},
		}

		const parseResult = Config.safeParse(validInput)
		expect(parseResult.success).toBe(true)
		if (parseResult.success) {
			expect(Object.isFrozen(parseResult.data)).toBe(true)
			// Optionally test specific fields
			expect(parseResult.data.app).toEqual(validInput.app)
		}
	})

	it("fails to validate invalid config", () => {
		const invalidInput = {
			app: {}, // missing required properties
			server: null,
			orm: {},
			auth: {},
		}

		const parseResult = Config.safeParse(invalidInput)
		expect(parseResult.success).toBe(false)
		if (!parseResult.success) {
			// Inspect errors if needed
			expect(parseResult.error.flatten().fieldErrors).toHaveProperty("app")
		}
	})
})
```