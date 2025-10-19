import { describe, expect, it } from "vitest" // or jest
import { Config } from "~/server/lib/zod/Confg"

describe("Config schema", () => {
	it("successfully validates valid config", () => {
		const validInput = {
			app: { name: "Hamoria" },
			auth: { secret: "secret", cookiePrefix: undefined },
			server: { port: "3000", db: "mongodb://localhost:27017/db" },
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
			app: {},
			// 	auth: { secret: "secret", cookiePrefix: undefined },
			// 	server: { port: "3000", db: "mongodb://localhost:27017/db" },
		}

		const parseResult = Config.safeParse(invalidInput)
		expect(parseResult.success).toBe(false)
		if (!parseResult.success) {
			// Inspect errors if needed
			expect(parseResult.error.flatten().fieldErrors).toHaveProperty("app")
		}
	})
})
