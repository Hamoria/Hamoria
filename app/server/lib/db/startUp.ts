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
