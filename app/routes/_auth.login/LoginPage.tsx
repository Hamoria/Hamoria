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
