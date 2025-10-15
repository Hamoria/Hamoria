import type { z } from "zod/v4"

import { NodeEnv } from "./common/NodeEnv"

export const Env = NodeEnv.default("development")

export type IEnv = z.input<typeof Env>

export type OEnv = z.output<typeof Env>
