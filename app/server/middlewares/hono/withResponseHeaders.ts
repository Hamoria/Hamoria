import { createMiddleware } from "hono/factory"

import type { Env } from "../../../server"

export const withResponseHeaders = () =>
	createMiddleware<Env>(async (ctx, next) => {
		const headers = new Headers()

		ctx.set("resHeaders", headers)
		try {
			await next()
		} finally {
			headers.forEach((value, name) => {
				if (!ctx.res.headers.get(name) || ctx.res.headers.has("set-cookie")) {
					ctx.res.headers.set(name, value)
				}
			})
		}
	})
// export const withResponseHeaders = () =>
// 	createMiddleware<Env>(async (ctx, next) => {
// 		const headers = new Headers()
// 		ctx.set("resHeaders", headers)

// 		console.log("Middleware start: headers initialized")

// 		try {
// 			await next()
// 			console.log("Middleware after next(): response headers before setting:", ctx.res.headers)
// 		} catch (err) {
// 			console.error("Error in middleware or downstream:", err)
// 			throw err // rethrow so Hono upstream can handle it
// 		} finally {
// 			headers.forEach((value, name) => {
// 				console.log(`Setting header: ${name} = ${value}`)
// 				if (!ctx.res.headers.get(name) || ctx.res.headers.has("set-cookie")) {
// 					ctx.res.headers.set(name, value)
// 				}
// 			})
// 			console.log("Middleware end: headers set")
// 		}
// 	})
