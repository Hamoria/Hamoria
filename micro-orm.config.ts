import { MongoDriver, type Options } from "@mikro-orm/mongodb"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"

const config: Options = {
	// for simplicity, we use the SQLite database, as it's available pretty much everywhere
	driver: MongoDriver,
	dbName: "mongodb.db",
	// folder-based discovery setup, using common filename suffix
	entities: ["dist/db/entities/*.js"], // compiled JS files in dist
	entitiesTs: ["app/server/db/entities/*.ts"], // your TS sources
	// we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
	// check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
	metadataProvider: TsMorphMetadataProvider,
	// enable debug mode to log SQL queries and discovery information
	debug: true,
}

export default config
