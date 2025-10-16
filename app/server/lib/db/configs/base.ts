// import { join } from "node:path"
// import { Migrator } from "@mikro-orm/migrations"
import { defineConfig } from "@mikro-orm/mongodb"

import * as entities from "../../../db/entities"

// import * as subscribers from "../../../db/subscribers"

import { MongoDriver } from "@mikro-orm/mongodb"
// import appConfig from "../../config"

// const { orm } = appConfig

import { TsMorphMetadataProvider } from "@mikro-orm/reflection"

// import { Config } from "../../zod/Confg"

// const base = join(process.cwd(), "app", "server", "db")

const config = defineConfig({
	// ...orm,
	metadataProvider: TsMorphMetadataProvider,
	// ensureDatabase: true,
	driver: MongoDriver,
	// driverOptions: { connection: { timezone: "+02:00" } },
	dbName: "Hamoria",
	entities: Object.values(entities),
	clientUrl: "mongodb://localhost:27017/test",
	//"mongodb://172.22.224.1:27017/test",
	//process.env.MONGO_URL_LOCAL || process.env.MONGO_URL ||
	// subscribers: Object.values(subscribers).map((Subscriber) => new Subscriber()),
	debug: true,
	// extensions: [Migrator],
	// migrations: {
	// 	path: join(base, "migrations"),
	// },
	discovery: {
		warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
		requireEntitiesArray: true, // force usage of class references in `entities` instead of paths
		alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
	},
})

export default config

// class ConnectionManager {
// 	private async handleConnectionError(error: Error) {
// 		if (this.isRetryableError(error)) {
// 			await this.reconnect({
// 				maxRetries: 3,
// 				backoffStrategy: "exponential",
// 			})
// 		} else {
// 			throw new DatabaseConnectionError(error)
// 		}
// 	}

// 	private isRetryableError(error: Error): boolean {
// 		return ["PROTOCOL_CONNECTION_LOST", "ER_CON_COUNT_ERROR"].includes(error.message)
// 	}
// }
