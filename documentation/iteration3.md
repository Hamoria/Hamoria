#

##

###

####

```sh
pnpm add @conform-to/react
pnpm add  @conform-to/zod

pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add separator
```

zod\admni login/password

```tsx
import { z } from "zod"

import { AdminPassword } from "./AdminPassword"

export const AdminLogInInput = z.object({
	email: z.string().email(),
	password: AdminPassword,
})

export type IAdminLogInInput = z.input<typeof AdminLogInInput>

export type OAdminLogInInput = z.output<typeof AdminLogInInput>
```

####

_auth.login\route.tsx

- but login in collocated route folder

```tsx
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
```

LoginPage.tsx

- complete next commit


    at renderNodeDestructive (/home/fallow/base-stack/node_modules/.pnpm/react-dom@19.1.1_react@19.1.1/node_modules/react-dom/cjs/react-dom-server.node.development.js:5941:11)
    at finishFunctionComponent (/home/fallow/base-stack/

```tsx
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4"
import type { FC } from "react"
import { Form, useNavigate } from "react-router"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { AdminLogInInput } from "../../server/lib/zod/admin/AdminLogInInput"
import type { Route } from "./+types/route.ts"
export const AdminLoginPage: FC<Route.ComponentProps> = ({ actionData }) => {
	const [form, fields] = useForm({
		lastResult: actionData,
		constraint: getZodConstraint(AdminLogInInput as unknown as any),

		onValidate: ({ formData }) => parseWithZod(formData, { schema: AdminLogInInput as unknown as any }),
	})

	const navigate = useNavigate()

	return (
		<Form
			{...getFormProps(form)}
			method="post"
			action="/admin/login"
			className="flex h-full items-center justify-center"
		>
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
				<fieldset className="flex flex-col gap-2">
					<Label htmlFor={fields.email.id}>E-mail</Label>

					<Input
						{...getInputProps(fields.email, { type: "email" })}
						errors={fields.email.errors || form.errors}
						placeholder="me@example.com"
						className="placeholder:lowercase"
					/>
				</fieldset>
				<Separator />
				<fieldset className="flex flex-col gap-2">
					<Label htmlFor={fields.password.id}>Password</Label>

					<Input
						{...getInputProps(fields.password, { type: "password" })}
						errors={fields.password.errors || form.errors}
						placeholder="Your password"
						className="placeholder:lowercase"
					/>
				</fieldset>
			</div>
		</Form>
	)
}
```

AdminLoginInput.ts

```ts
import { z } from "zod"

import { AdminPassword } from "./AdminPassword"

export const AdminLogInInput = z.object({
	email: z.string().email(),
	password: AdminPassword,
})

export type IAdminLogInInput = z.input<typeof AdminLogInInput>

export type OAdminLogInInput = z.output<typeof AdminLogInInput>
```