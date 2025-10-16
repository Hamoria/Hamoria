import { redirect } from "react-router"
// import { findUser } from "~/models/user.server"; // mock file

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("cookie"))
	// redirect to / if the user is logged-in
	if (session.has("userId")) return redirect("/")
	return null
}

import { parseWithZod } from "@conform-to/zod"
import { APIError } from "better-auth"
import type { LoaderFunctionArgs } from "react-router" //ActionFunctionArgs
import { data, replace } from "react-router"
import { getSession } from "~/middlewares/session"
import { authContext } from "~/server/contexts/auth.js"
import { AdminLogInInput } from "~/server/zod/admin/AdminLogInInput"
export const action = async ({ request, context }: Route.ActionArgs) => {
	const auth = context.get(authContext)

	const submission = await parseWithZod(await request.formData(), {
		schema: AdminLogInInput,
		async: true,
	})

	if (submission.status !== "success") {
		return data(submission.reply(), 422)
	}

	try {
		const response = await auth.api.signInEmail({
			asResponse: true,
			body: submission.value,
		})

		throw replace("/home", {
			headers: response.headers,
		})
	} catch (error) {
		if (!(error instanceof APIError)) {
			throw error
		}

		if (error.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
			return data(
				submission.reply({
					formErrors: ["Invalid email or password"],
				}),

				{
					status: 401,
				}
			)
		}

		if (error.body?.code === "INVALID_EMAIL") {
			return data(
				submission.reply({
					fieldErrors: {
						email: ["Invalid email"],
					},
				}),

				{
					status: 422,
				}
			)
		}

		throw error
	}
}

import type { Route } from "./+types/route"
import { ADMIN_LOGIN_PAGE_TITLE } from "./title"
export const meta: Route.MetaFunction = () => [
	{
		title: ADMIN_LOGIN_PAGE_TITLE,
	},
]

export { default } from "./LoginPage"
