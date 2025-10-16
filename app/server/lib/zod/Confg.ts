import { z } from "zod/v4"

import { App } from "./config/App"
import { Auth } from "./config/Auth"
// import { Orm } from "./config/Orm"
import { Server } from "./config/Server"

export const Config = z
	.object({
		app: App,
		server: Server,
		// orm: Orm,
		auth: Auth,
	})
	.transform((value) => Object.freeze(value))

export type IConfig = z.input<typeof Config>

export type OConfig = z.output<typeof Config>
