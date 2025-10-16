import type { Context } from "hono"
import { createContext, RouterContextProvider } from "react-router"
import { i18next } from "remix-hono/i18next"
import { getClientEnv, getServerEnv } from "~/env.server"
// import { authContext } from "./contexts/auth"
import { matchesContext } from "./contexts/matches"
import { ormContext } from "./contexts/orm"
import { resHeadersContext } from "./contexts/resHeaders"
import { getRouteMatches } from "./lib/utils/routes"
// export const globalAppContext = createContext<LoadContext>()
export const globalAppContext = createContext<AppContext>()
type OptionsWithBuild = {
	build: {
		routes: any // Use correct type for your routes structure
		basename?: string
	}
	// ... other options as needed
}

// export const getAppContext = async (ctx: Context, options: OptionsWithBuild) => {
// 	// get the locale from the context
// 	const locale = i18next.getLocale(ctx)
// 	// get t function for the default namespace
// 	const t = await i18next.getFixedT(ctx)
// 	// get the server environment
// 	const env = getServerEnv()

// 	const context = new RouterContextProvider()

// 	// context.set(authContext, ctx.var.auth)
// 	context.set(ormContext, ctx.var.orm)
// 	context.set(resHeadersContext, ctx.var.resHeaders)

// 	const matches = getRouteMatches(options.build.routes, ctx.req.url, options.build.basename)

// 	context.set(matchesContext, matches ?? [])

// 	return {
// 		lang: locale,
// 		t,
// 		isProductionDeployment: env.APP_ENV === "production",
// 		env,
// 		clientEnv: getClientEnv(),
// 		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
// 		body: (ctx as any).body,
// 		context,
// 	}
// }
import { authContext } from "./contexts/auth"
export const getLoadContext = async (c: Context, options: OptionsWithBuild) => {
	const context = new RouterContextProvider()

	// Gather all context data here
	const lang = i18next.getLocale(c)
	const t = await i18next.getFixedT(c)
	const env = getServerEnv()
	const matches = getRouteMatches(options.build.routes, c.req.url, options.build.basename)

	// Set all needed contexts into the single provider
	context.set(authContext, c.var.auth)
	context.set(ormContext, c.var.orm)
	context.set(resHeadersContext, c.var.resHeaders)
	context.set(matchesContext, matches ?? [])
	context.set(globalAppContext, {
		lang,
		t,
		env,
		clientEnv: getClientEnv(),
		isProduction: env.APP_ENV === "production",
		body: (c as any).body,
	})

	return context
}

// export const getLoadContext = async (c: Context, options: OptionsWithBuild) => {
// 	const ctx = new RouterContextProvider()
// 	const globalCtx = await getAppContext(c, options)
// 	ctx.set(globalAppContext, globalCtx)
// 	return ctx
// }

// interface LoadContext extends Awaited<ReturnType<typeof getAppContext>> {}
export interface AppContext {
	lang: string
	t: Awaited<ReturnType<typeof i18next.getFixedT>> // resolved TFunction from getFixedT
	env: ReturnType<typeof getServerEnv>
	clientEnv: ReturnType<typeof getClientEnv>
	isProduction: boolean
	body: unknown
}
/**
 * Declare our loaders and actions context type
 */
// declare module "react-router" {
// 	interface AppLoadContext extends Omit<LoadContext, "body"> {}
// }
declare module "react-router" {
	interface AppLoadContext extends ReturnType<typeof getServerEnv> {}
}

// export interface AppContext {
// 	lang: string
// 	t: ReturnType<typeof i18next.getFixedT> // ReturnType<typeof i18next.getFixedT>
// 	env: ReturnType<typeof getServerEnv>
// 	clientEnv: ReturnType<typeof getClientEnv>
// 	isProduction: boolean
// 	body: unknown
// }
