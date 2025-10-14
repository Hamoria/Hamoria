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
