import type { z } from "zod/v4"

import { Port } from "../../common/Port"

export const ServerPort = Port.default(3000)

export type IServerPort = z.input<typeof ServerPort>

export type OServerPort = z.output<typeof ServerPort>
