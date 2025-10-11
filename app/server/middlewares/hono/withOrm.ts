import { RequestContext } from "@mikro-orm/mongodb"
import { createMiddleware } from "hono/factory"

import { orm } from "../../lib/db/orm"

export const withOrm = () =>
	createMiddleware(async (ctx, next) => {
		ctx.set("orm", orm)

		return RequestContext.create(orm.em, () => next())
	})
