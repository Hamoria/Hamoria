// import { getAPIClient } from '~/middlewares/api-client'
import { redirect } from "react-router"
// import type { Route } from "../+types/_dashboard._courses" { request, context }: Route.ActionArgs
export async function action() {
	// let api = getAPIClient(context as unknown as any)
	// let formData = await request.formData()
	// // let input = Contact.InputSchema.parse(Object.fromEntries(formData))
	// let contact = await api.ping()
	return redirect("/home")
}
