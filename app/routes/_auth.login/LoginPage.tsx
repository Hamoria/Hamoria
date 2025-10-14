import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4"
import { Fingerprint } from "lucide-react"
import type { FC } from "react"
import { Form, useNavigate } from "react-router"
import { useEvent } from "react-use-event-hook"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { authClient } from "~/lib/auth"
import type { Route } from "./+types/route.ts"
import { AdminLogInInput } from "./admin/AdminLogInInput"

const AdminLoginPage: FC<Route.ComponentProps> = ({ actionData }) => {
	const [form, fields] = useForm({
		lastResult: actionData,
		constraint: getZodConstraint(AdminLogInInput),

		onValidate: ({ formData }) => parseWithZod(formData, { schema: AdminLogInInput as unknown as any }),
	})

	const navigate = useNavigate()

	const logInWithPassKey = useEvent(async () => {
		const response = await authClient.signIn.passkey()

		if (response?.error) {
			toast.error("Can't log in")
		} else {
			await navigate("/admin", { replace: true })
		}
	})
	return (
		<Form
			{...getFormProps(form)}
			method="post"
			action="/admin/login"
			className="flex h-full w-full items-center justify-center p-4"
		>
			<Card className="mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3">
				<CardHeader>
					<CardTitle>Login</CardTitle>

					<CardDescription>You need to log in to your account to access this page</CardDescription>
				</CardHeader>

				<CardContent className="grid gap-5">
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
				</CardContent>

				<CardFooter className="flex-col gap-4">
					<Button type="submit">Log in</Button>

					<Separator />

					<Button type="button" variant="secondary" onClick={logInWithPassKey}>
						<Fingerprint />

						<span>Use Passkey</span>
					</Button>
				</CardFooter>
			</Card>
		</Form>
	)
}

export default AdminLoginPage
