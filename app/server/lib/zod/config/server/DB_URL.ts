import { z } from "zod/v4"

// import { Port } from "../../common/Port"

export const db_url = z.string().trim().optional().default("mongodb://172.22.224.1 :27017")

export type IName = z.input<typeof db_url>

export type OName = z.output<typeof db_url>
