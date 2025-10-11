import { csrf } from "hono/csrf"
import { createHonoServer } from "react-router-hono-server/node"
import { i18next } from "remix-hono/i18next"
import i18nextOpts from "../localization/i18n.server"
import { getLoadContext } from "./context"

import type { auth } from "./lib/auth/auth.ts"
import config from "./lib/config"
import type { orm } from "./lib/db/orm"
import { withAuth } from "./middlewares/hono/withAuth"
import { withOrm } from "./middlewares/hono/withOrm"
import { withResponseHeaders } from "./middlewares/hono/withResponseHeaders"

export interface Variables {
	orm: typeof orm
	auth: typeof auth
	resHeaders: Headers
}

export interface Env {
	Variables: Variables
}

export default await createHonoServer({
	port: config.server.port,
	configure(server) {
		server
			.use(withResponseHeaders())
			.use(csrf()) // TODO: specify origin for production
			.use(withOrm())
			.use(withAuth())

		server.use("*", i18next(i18nextOpts))
	},
	defaultLogger: false,
	getLoadContext,
	// listeningListener: ({ port }) => console.log("🥕 Listening on http://localhost:%s", port),
})
