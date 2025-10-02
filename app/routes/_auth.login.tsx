import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'
import { Form, redirect } from 'react-router'
import { getSession, commitSession } from '~/middlewares/session'

// import { findUser } from "~/models/user.server"; // mock file

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get('cookie'))
  // redirect to / if the user is logged-in
  if (session.has('userId')) return redirect('/')
  return null
}

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData()

  //   let user = await findUser({
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //   })

  let session = await getSession(request.headers.get('cookie'))
  //   session.set('userId', user.id)
  //   session.set('role', user.role)

  return redirect('/home', {
    headers: { 'set-cookie': await commitSession(session) },
  })
}

export default function Component() {
  return (
    <Form
      method='post'
      className='flex h-full items-center justify-center'>
      <div className='mx-auto flex h-full w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
        <h1 className='mb-2 text-center text-6xl text-black lg:mb-4'>Login</h1>
        <p className='text-center'>Login below</p>
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

        <button>Log In</button>
      </div>
    </Form>
  )
}
