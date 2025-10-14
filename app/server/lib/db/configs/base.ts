// import { join } from "node:path"
// import { Migrator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/mongodb"

import * as entities from "../../../db/entities"

// import * as subscribers from "../../../db/subscribers"

import { MongoDriver } from "@mikro-orm/mongodb"
import appConfig from "../../config"

const { orm } = appConfig

// const base = join(process.cwd(), "app", "server", "db")

const config = defineConfig({
	...orm,

	// ensureDatabase: true,
	driver: MongoDriver,
	dbName: "my-db-name",
	entities: Object.values(entities),
	clientUrl: "mongodb://localhost:27017", //process.env.MONGO_URL_LOCAL || process.env.MONGO_URL ||
	// subscribers: Object.values(subscribers).map((Subscriber) => new Subscriber()),
	debug: true,
	// extensions: [Migrator],
	// migrations: {
	// 	path: join(base, "migrations"),
	// },
})

export default config

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
