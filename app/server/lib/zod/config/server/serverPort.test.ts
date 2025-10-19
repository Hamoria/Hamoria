import { describe, expect, it } from "vitest"
import { ServerPort } from "./ServerPort"

describe("ServerPort schema", () => {
	it("accepts a valid port number", () => {
		const result = ServerPort.safeParse(8080)
		expect(result.success).toBe(true)
		expect(result.data).toBe(8080)
	})

	it("defaults to 3000 when undefined", () => {
		const result = ServerPort.safeParse(undefined)
		expect(result.success).toBe(true)
		expect(result.data).toBe(3000)
	})

	it("rejects invalid values", () => {
		const result = ServerPort.safeParse("not-a-number")
		expect(result.success).toBe(false)
		if (!result.success) {
			expect(result.error.issues).toBeDefined()
		}
	})

	it("rejects negative ports or out-of-range values", () => {
		const result = ServerPort.safeParse(-1)
		expect(result.success).toBe(false)
	})
})
