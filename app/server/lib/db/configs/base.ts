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
