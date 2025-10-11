// import type { MiddlewareFunction, RouterContextProvider } from "react-router"
// import { createContext } from "react-router"
// import type { APIClient } from "~/clients/server-api"

// import { getAccessToken } from './refresh'

// const apiContext = createContext<APIClient>()

// export const apiClientMiddleware: MiddlewareFunction<Response> = async ({ context }, next) => {
// 	//   let accessToken = getAccessToken(context)
// 	const context1 = context as RouterContextProvider

// 	//context.set(apiContext, new APIClient(accessToken))
// 	return await next()
// }

// export function getAPIClient(context: RouterContextProvider) {
// 	return context.get(apiContext)
// }
