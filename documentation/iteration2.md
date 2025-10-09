#

##

###

#### vite setup micro orm  with vite


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

#### fix cross container testable
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

#### micro orm for entities

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

#### the typing of orm webb app., input, output.

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


####

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


#####

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