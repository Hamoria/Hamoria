import { expectTypeOf, test } from "vitest"

import type { Maybe } from "~/lib/types/Maybe"

test("creates nullish for given type parameter", () => {
	expectTypeOf<Maybe<unknown[]>>().toEqualTypeOf<unknown[] | null | undefined>()

	// expectTypeOf<Maybe<unknown[]>>().toMatchTypeOf<unknown[] | null | undefined>()
})
