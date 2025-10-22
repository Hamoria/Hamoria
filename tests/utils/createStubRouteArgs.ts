import { RouterContextProvider } from "react-router"
import type { Replace } from "~/lib/types/Replace"
import { authContext } from "~/server/contexts/auth"
import { ormContext } from "~/server/contexts/orm"
import { resHeadersContext } from "~/server/contexts/resHeaders"
import { auth } from "~/server/lib/auth/auth"
import { orm } from "~/server/lib/db/orm"
import type { ActionArgs } from "~/server/lib/types/Action"
import type { LoaderArgs } from "~/server/lib/types/Loader"

interface CreateStubRouteArgsInput<TParams extends Record<string, unknown> = Record<string, unknown>> {
	params?: TParams
	request?: Request
	context?: RouterContextProvider
}

const createStubRouteArgs =
	<T extends LoaderArgs | ActionArgs>() =>
	<TParams extends Record<string, unknown> = Record<string, unknown>>({
		params,
		request,
		context = new RouterContextProvider(),
	}: CreateStubRouteArgsInput<TParams> = {}): Replace<
		T,
		{
			params: TParams
		}
	> => {
		const headers = new Headers()

		context.set(ormContext, orm)
		context.set(authContext, auth)
		context.set(resHeadersContext, headers)

		return {
			request: request ?? new Request("http://localhost"),
			context,
			params: params ?? ({} as TParams),
		} as any // TypeScript complains about the type, but everything is ok in practice. We can ignore this warning
	}

/**
 * Creates stub arguments for `loader`
 */
export const createStubLoaderArgs = createStubRouteArgs<LoaderArgs>()

/**
 * Creates stub arguments for `action`
 */
export const createStubActionArgs = createStubRouteArgs<ActionArgs>()

export const createStubMiddlewareArgs = createStubRouteArgs<LoaderArgs | ActionArgs>()
