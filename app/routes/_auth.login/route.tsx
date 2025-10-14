import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { redirect } from "react-router"
import { commitSession, getSession } from "~/middlewares/session"
// import { findUser } from "~/models/user.server"; // mock file

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("cookie"))
	// redirect to / if the user is logged-in
	if (session.has("userId")) return redirect("/")
	return null
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	//   let user = await findUser({
	//     email: formData.get('email'),
	//     password: formData.get('password'),
	//   })

	const session = await getSession(request.headers.get("cookie"))
	//   session.set('userId', user.id)
	//   session.set('role', user.role)

	return redirect("/home", {
		headers: { "set-cookie": await commitSession(session) },
	})
}

import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4"
import type { FC } from "react"
import { Form, useNavigate } from "react-router"

import { AdminLogInInput } from "../../server/lib/zod/admin/AdminLogInInput"
// import type { Route } from "./+types/route.ts"

// export const AdminLoginPage: FC<Route.ComponentProps> = ({ actionData }) => {
export default function ({ actionData }) {
	// const [form, fields] = useForm({
	// 	lastResult: actionData,
	// 	constraint: getZodConstraint(AdminLogInInput as unknown as any),

	// 	onValidate: ({ formData }) => parseWithZod(formData, { schema: AdminLogInInput as unknown as any }),
	// })

	const navigate = useNavigate()

	return (
		<Form
			// {...getFormProps(form)}
			method="post"
			action="/admin/login"
			className="flex h-full items-center justify-center"
		>
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
				<fieldset className="flex flex-col gap-2">s</fieldset>
			</div>
		</Form>
	)
}
