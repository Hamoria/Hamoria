import { expectTypeOf, test } from "vitest"

import type { MaybeUndefined } from "~/lib/types/MaybeUndefined"

test("return T | undefined union for given type parameter", () => {
	expectTypeOf<MaybeUndefined<string>>().toEqualTypeOf<string | undefined>()
})
