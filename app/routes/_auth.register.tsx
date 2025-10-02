import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { Form, redirect } from 'react-router'
import { getSession, commitSession } from '~/middlewares/session'

// mock file

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get('cookie'))
  // redirect to / if the user is logged-in
  if (session.has('userId')) return redirect('/')
  return null
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData()

  // let user = await createUser({
  //   email: formData.get('email'),
  //   password: formData.get('password'), // createUser must encrypt the password
  // })

  let session = await getSession(request.headers.get('cookie'))
  // session.set('userId', user.id)
  // session.set('role', user.role)

  return redirect('/', {
    headers: { 'set-cookie': await commitSession(session) },
  })
}

export default function Component() {
  return (
    <Form method='post'>
      <label id='email'>Email</label>
      <input
        id='email'
        type='email'
        name='email'
        required
      />

      <label id='password'>Password</label>
      <input
        id='password'
        type='password'
        name='password'
        required
      />

      <button>Register</button>
    </Form>
  )
}
