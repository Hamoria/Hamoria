import { z } from "zod"
import { DatabaseHost } from "./orm/DatabaseHost"
import { DatabaseName } from "./orm/DatabaseName"
import { DatabasePort } from "./orm/DatabasePort"
import { DatabaseUserName } from "./orm/DatabaseUserName"
import { DatabaseUserPassword } from "./orm/DatabaseUserPassword"
// import { Debug } from "./orm/Debug.js"

export const Orm = z
	.object({
		// debug: Debug,
		host: DatabaseHost,
		port: DatabasePort,
		dbName: DatabaseName,
		user: DatabaseUserName,
		password: DatabaseUserPassword,
	})
	.transform((value) => Object.freeze(value))

export type IOrm = z.input<typeof Orm>

export type OOrm = z.output<typeof Orm>
