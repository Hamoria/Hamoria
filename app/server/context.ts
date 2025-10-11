import type { Context } from "hono"
import { createContext, RouterContextProvider } from "react-router"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "~/env.server"
import { authContext } from "./contexts/auth"
import { matchesContext } from "./contexts/matches"
import { ormContext } from "./contexts/orm"
import { resHeadersContext } from "./contexts/resHeaders"
import { getRouteMatches } from "./lib/utils/routes"
export const globalAppContext = createContext<LoadContext>()

type OptionsWithBuild = {
	build: {
		routes: any // Use correct type for your routes structure
		basename?: string
	}
	// ... other options as needed
}

export const getAppContext = async (ctx: Context, options: OptionsWithBuild) => {
	// get the locale from the context
	const locale = i18next.getLocale(ctx)
	// get t function for the default namespace
	const t = await i18next.getFixedT(ctx)
	// get the server environment
	const env = getServerEnv()

	const context = new RouterContextProvider()

	context.set(authContext, ctx.var.auth)
	context.set(ormContext, ctx.var.orm)
	context.set(resHeadersContext, ctx.var.resHeaders)

	const matches = getRouteMatches(options.build.routes, ctx.req.url, options.build.basename)

	context.set(matchesContext, matches ?? [])

	return {
		lang: locale,
		t,
		isProductionDeployment: env.APP_ENV === "production",
		env,
		clientEnv: getClientEnv(),
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: ctx.body,
		context,
	}
}

export const getLoadContext = async (c: Context, options: OptionsWithBuild) => {
	const ctx = new RouterContextProvider()
	const globalCtx = await getAppContext(c, options)
	ctx.set(globalAppContext, globalCtx)
	return ctx
}

interface LoadContext extends Awaited<ReturnType<typeof getAppContext>> {}

/**
 * Declare our loaders and actions context type
 */
declare module "react-router" {
	interface AppLoadContext extends Omit<LoadContext, "body"> {}
}
