// // Utility for compile-time assertions:
// type AssertTrue<T extends true> = T
// type AssertFalse<T extends false> = T

// // Your IsAny type, for ref:
// type IsAny<T> = 0 extends 1 & T ? true : false

// Tests:
// export type Test1 = AssertTrue<IsAny<any>> // Should compile fine
// export type Test2 = AssertFalse<IsAny<string>> // Should compile fine
// export type Test3 = AssertFalse<IsAny<unknown>> // Should compile fine

import { expect, test } from "vitest"

type IsAny<T> = 0 extends 1 & T ? true : false

test("IsAny any", () => {
	const result: IsAny<any> = true
	expect(result).toBe(true)
})

test("IsAny string", () => {
	const result: IsAny<string> = false
	expect(result).toBe(false)
})

test("IsAny unknown", () => {
	const result: IsAny<unknown> = false
	expect(result).toBe(false)
})
