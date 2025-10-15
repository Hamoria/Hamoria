import type { z } from "zod/v4"

import { Port } from "../../common/Port.js"

export const DatabasePort = Port.default(3306)

export type IDatabasePort = z.input<typeof DatabasePort>

export type ODatabasePort = z.output<typeof DatabasePort>
