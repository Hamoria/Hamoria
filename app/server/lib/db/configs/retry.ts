// import { MikroORM } from "@mikro-orm/core"
// import { unknown } from "better-auth";

// class ConnectionManager {
// 	private orm: MikroORM | null = null

// 	async connect(config) {
// 		try {
// 			this.orm = await MikroORM.init(config)
// 			console.log("Connected to DB")
// 		} catch (error) {
// 			await this.handleConnectionError(error)
// 		}
// 	}

// 	private async handleConnectionError(error: Error) {
// 		if (this.isRetryableError(error)) {
// 			console.log("Retrying connection...")
// 			await this.reconnect({ maxRetries: 3, backoffStrategy: "exponential" })
// 		} else {
// 			throw new Error(`DatabaseConnectionError: ${error.message}`)
// 		}
// 	}

// 	private isRetryableError(error: Error): boolean {
// 		// Add or customise error codes that are retryable
// 		return ["PROTOCOL_CONNECTION_LOST", "ER_CON_COUNT_ERROR"].some((msg) => error.message.includes(msg))
// 	// }

// 	// private async reconnect(options: { maxRetries: number; backoffStrategy: string }) {
// 	// 	let attempts = 0
// 	// 	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 	// 	while (attempts < options.maxRetries) {
// 	// 		attempts++
// 	// 		try {
// 	// 			this.orm = await MikroORM.init(config as)
// 	// 			// console.log("Reconnected to DB")
// 	// 			return
// 	// 		} catch (error as unknown	as Error) {
// 	// 			// console.log(`Reconnect attempt ${attempts} failed:`, error.message)
// 	// 			const backoff = options.backoffStrategy === "exponential" ? 2 ** attempts * 1000 : 1000
// 	// 			await delay(backoff)
// 	// 		}
// 		}

// 		throw new Error("Max reconnect attempts reached")
// 	}

// 	async disconnect() {
// 		if (this.orm) {
// 			await this.orm.close(true)
// 		}
// 	}

// 	getEntityManager() {
// 		if (!this.orm) throw new Error("Not connected")
// 		return this.orm.em
// 	}
// }
