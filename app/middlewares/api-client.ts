import type { MiddlewareFunction } from 'react-router'
import { createContext, RouterContextProvider } from 'react-router'
import { APIClient } from '~/clients/server-api'
// import { getAccessToken } from './refresh'

const apiContext = createContext<APIClient>()

export const apiClientMiddleware: MiddlewareFunction<Response> = async (
  { context },
  next
) => {
  //   let accessToken = getAccessToken(context)
  //   context.set(apiContext, new APIClient(accessToken))
  return await next()
}

export function getAPIClient(context: RouterContextProvider) {
  return context.get(apiContext)
}
