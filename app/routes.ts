// import { flatRoutes } from "@react-router/fs-routes"

// export default flatRoutes({
// 	ignoredRouteFiles: ["**/*.test.{ts,tsx}"],
// })

import type { RouteConfig } from '@react-router/dev/routes'
import { prefix } from '@react-router/dev/routes'
import { flatRoutes } from '@react-router/fs-routes'

const [routes, actionRoutes] = await Promise.all([
  flatRoutes({
    rootDirectory: './routes',
    ignoredRouteFiles: ['**/_shared/**', '**/index.ts', '**/*.test.{ts,tsx}'],
  }),
  flatRoutes({
    rootDirectory: './routes/actions',
    ignoredRouteFiles: ['**/_shared/**', '**/index.ts', '**/*.test.{ts,tsx}'],
  }),
])
export default [
  ...routes,
  ...prefix('/actions', actionRoutes),
] satisfies RouteConfig
