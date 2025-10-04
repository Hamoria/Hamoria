import { Form, Outlet, redirect, useNavigation, useSubmit } from 'react-router'
import type { Route } from './+types/_dashboard._courses'
// import { getAllTodos, getUser, type TodoRecord } from '~/db'
import Content from '~/components/Content'
import React, { useEffect, useRef } from 'react'
// import TodoList from '~/components/TodosList'
import { getSession } from '~/middlewares/session'
// import { useAuth } from '~/context/AuthProvider'
// import type { User } from '~/db'

type Data = {
  // todos: TodoRecord[]
  query: string
  // user: User
} | null

export async function loader({ params, request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  if (session.get('userId')) {
    const id = session.get('userId')
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const user = 'user' //await getUser(id!)
    // const data = await getAllTodos(id!, q || '')
    return { user: user, query: q }
  } else {
    return null
  }
}
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const data = loaderData as unknown as Data | undefined
  // const { isAuthenticated, handleAuth } = useAuth()
  const navigation = useNavigation()
  const year = new Date().getFullYear()
  const submit = useSubmit()
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')
  // const searchRef = useRef(
  //   document.querySelector('input[name="q"]')
  // ) as React.RefObject<HTMLInputElement>
  const searchRef = useRef<HTMLInputElement>(null)
  // If you need to focus or interact with the input:
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])
  // useEffect(() => {
  //   if (data?.todos) {
  //     handleAuth({ isAuthenticated: true, user: data.user })
  //   }
  // }, [data])
  // !isAuthenticated ? 'md:grid-cols-1' : 'md:grid-cols-[auto_1fr]'

  return (
    <div>
      <div
        className={`grid px-4 sm:px-8 row-[2] grid-cols-1 w-full lg:w-5xl  mx-auto pt-12 pb-20 gap-8 place-items-center transition-all linear duration-300 
          
          `}>
        {
          <div className='px-4 sm:px-0 md:row-[1]'>
            <Form
              className='flex flex-row items-center relative mb-8'
              method='get'
              onSubmit={(e) => {
                e.preventDefault()
                //check if the form is valid
                if (e.currentTarget.checkValidity()) {
                  if (e.currentTarget.q.value) {
                    submit(e.currentTarget, { method: 'get' })
                  }
                }
              }}
              onChange={(e) => {
                //check if the form is valid
                if (e.currentTarget.checkValidity()) {
                  if (e.currentTarget.q.value !== '') {
                    submit(e.currentTarget, { method: 'get' })
                  } else {
                    submit(e.currentTarget, { method: 'get' })
                  }
                }
              }}
              role='search'>
              <button
                type='submit'
                className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6 absolute left-2 z-2'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
              <input
                ref={searchRef}
                type='search'
                name='q'
                placeholder='Search year'
                aria-label='Search todos'
                className='border-none rounded-full px-1 py-2 outline-1 pl-12'
                id='q'
                pattern={`^(?!.*\S)|201[9]|202[0-${String(year).slice(3)}]`}
                defaultValue={data?.query || ''}
              />
              <div
                aria-hidden
                hidden={!searching}
                id='search-spinner'
              />
            </Form>

            {/* {data && data?.todos && (
              <TodoList
                todos={data?.todos}
                search={searchRef}
              />
            )} */}
          </div>
        }
        <Form
          method='post'
          action='/actions/ping'>
          <button type='submit'>Ping API and Redirect</button>
        </Form>
        <Content>
          {navigation.state === 'loading' ? (
            <div className='loader'></div>
          ) : (
            <Outlet />
          )}
        </Content>
      </div>
    </div>
  )
}
