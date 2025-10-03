#

##

###

#### base create record

use process.env

button.ts

```ts
@@ -0,0 +1,58 @@
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

auth.tsx

```ts
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

  return redirect('/', {
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
```

auth.login

auth.register

session.ts

```ts
import { createCookieSessionStorage } from 'react-router'

type SessionData = { userId: string; role: 'user' | 'admin' }

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    // Name of the session cookie, use whatever you want here
    name: 'session',
    // This configures the cookie so it's not accessible with `document.cookie`
    httpOnly: true,
    // This configures the cookie so it's only sent over HTTPS when running in
    // production. When running locally, it's sent over HTTP too
    secure: process.env.NODE_ENV === 'production',
    // This configures the path where the cookie will be available, / means
    // everywhere
    path: '/',
    // This secrets are used to sign the cookie, preventing any tampering
    secrets: [process.env.SESSION_SECRET ?? 's3cr3t'],
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
```

#### mx-auto

```ts
<div
  className={cn(
    'z-10 w-full p-8 transition-transform md:w-1/2 lg:p-0',
    isRegisterPage && 'md:-translate-x-full',
    isForgotPasswordPage && '-translate-x-1/2'
  )}>
  <Outlet />
</div>
```

```ts
xport function AuthFooter() {
  const { isForgotPasswordPage, isLoginPage, isRegisterPage } =
    useGetCurrentPage()
  const key = isLoginPage ? 'Login' : 'Register'

  return (
    <div
      className={cn(
        // Color of the box, add what you want!
        'bg-gradient-to-br from-10% from-indigo-500 via-30% via-sky-500 to-90% to-emerald-500',
        'z-20 flex h-full w-full origin-left scale-x-100 flex-col items-center justify-center p-4 px-8 transition-all md:w-1/2 lg:px-20',
        // On register page this box will be on the right side
        isRegisterPage && 'md:translate-x-full',
        // On forgot password page this block will be hidden
        isForgotPasswordPage && ' scale-x-0'
      )}>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='!text-6xl text-center text-black'>{key} Title</h1>
        <p className='font-semibold text-black'>{key} Description</p>

        <Link to={isLoginPage ? href('/register') : href('/login')}>
          <Button>{key === 'Login' ? 'Register' : 'Login'}</Button>
        </Link>
      </div>
    </div>
  )
}
```

#### dashboard dependencies

command-menu.tsx

layout/types

searcj-context.tsx

sidebar-data.tsx

- auth.login --> navigate

\_index-browser.test.tsx

```tsx
export const loader = ({ request }: Route.LoaderArgs) => {
  const timezoneDate = convertDateToUserTz(new Date(), request)
  throw redirect('/login')

  // const userId = await requireUserId(request)
  const user = 'user'
  if (!user) {
    const requestUrl = new URL(request.url)
    const loginParams = new URLSearchParams([
      ['redirectTo', `${requestUrl.pathname}${requestUrl.search}`],
    ])
    const redirectTo = `/login?${loginParams}`
    // await logout({ request, redirectTo })
    return redirect(redirectTo)
  }

  throw redirect('/')
```

####

Search

Header

Main

app-sidebar

```

```

#### navgroups setup

navgroups

```tsx

```

sidebar-data

```tsx

```

#### sidebar data into nav coom/lay

\_dashboard.\_content.\_curriculum.courses.$course.ts

```tsx
export function loader() {
  return null
}
import { Outlet } from 'react-router'
import { useLocation } from 'react-router'

const useGetCurrentPage = () => {
  // Used to retrieve the url
  const location = useLocation()
  // Gets the current path name (url)
  const url = location.pathname
  return {
    // Ends with login? We are on the login page
    isCrudPage: url.endsWith('/crud'),
    // Ends with register? We are on the register page
    isDomainPage: url.endsWith('/domain'),
    // Ends with forgot password? we are on the forgot password page
    isTuplePage: url.endsWith('/tuple'),
    isPlacePage: url.endsWith('/place'),
    isItemPage: url.endsWith('/item'),

    isSheckPage: url.endsWith('/Shock'),
    // Ends with register? We are on the register page
    isDenialPage: url.endsWith('/Denial'),
    // Ends with forgot password? we are on the forgot password page
    isAngerPage: url.endsWith('/Anger'),
    isBargainPage: url.endsWith('/Bargain'),
    isDepressionPage: url.endsWith('/Depression'),
    isTestingPage: url.endsWith('/Testing'),
    isAcceptingPage: url.endsWith('/Acceptance'),

    isExpositionPage: url.endsWith('/Exposition'),
    // Ends with register? We are on the register page
    isRisingPage: url.endsWith('/Rising'),
    // Ends with forgot password? we are on the forgot password page
    isClimaxPage: url.endsWith('/Climax'),
    isFallingPage: url.endsWith('/Falling'),
    isDenouementPage: url.endsWith('/Denouement'),
  }
}

import Crud from '~/pages/crud'
import Domain from '~/pages/domain'
import Tuple from '~/pages/tuple'
import Place from '~/pages/place'
import Item from '~/pages/item'
export default function Component() {
  const { isCrudPage, isDomainPage, isTuplePage, isPlacePage, isItemPage } =
    useGetCurrentPage()
  if (isCrudPage) return <Crud />
  if (isDomainPage) return <Domain />
  if (isTuplePage) return <Tuple />
  if (isPlacePage) return <Place />
  if (isItemPage) return <Item />
  const {
    isSheckPage,
    isAngerPage,
    isBargainPage,
    isDenialPage,
    isTestingPage,
    isAcceptingPage,
  } = useGetCurrentPage()
  if (isSheckPage) return <Crud />
  if (isAngerPage) return <Domain />
  if (isBargainPage) return <Tuple />
  if (isDenialPage) return <Place />
  if (isTestingPage) return <Item />

  const {
    isExpositionPage,
    isRisingPage,
    isClimaxPage,
    isFallingPage,
    isDenouementPage,
  } = useGetCurrentPage()
  if (isExpositionPage) return <Crud />
  if (isRisingPage) return <Domain />
  if (isClimaxPage) return <Tuple />
  if (isFallingPage) return <Place />
  if (isDenouementPage) return <Item />
}
```

pages...

#### relative routes

- all purchases

#### feature support

layout.css

reset.css

root.tsx

tailwind.css

```css
@utility border-scaffold {
  border: var(--border-width) var(--border-style) var(--border-color);
  border-radius: var(--radius);
}

.card {
  @apply border-scaffold;
}
/*
.card {
  background: var(--color-pink-500);
  color: var(--color-pink-900);
} */
```

vite.config.ts

import { browserslistToTargets, Features } from 'lightningcss'

#### 3 composed modules

##### dashboard query selector

- effect on client

\_dashboard.tsx

```tsx
<SidebarProvider>
  <AppSidebar />
  <div
    id='content'
    className={cn(
      'ml-auto w-full max-w-full',
      'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
      'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
      'transition-[width] duration-200 ease-linear',
      'flex h-svh flex-col',
      'group-data-[scroll-locked=1]/body:h-full',
      'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
    )}>
    <Header>
      <TopNav links={topNav} />
      <div className='ml-auto flex items-center space-x-4'>
        <Search />
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>

    <Main>
      <div>courses home</div>
      Link to <Link to='../purshases'>acceptance</Link>
      <Outlet />
    </Main>
  </div>
</SidebarProvider>
```

theme-switch.tsx

```tsx
import { IconCheck, IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='scale-95 rounded-full'>
          <IconSun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <IconMoon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light{' '}
          <IconCheck
            size={14}
            className={cn('ml-auto', theme !== 'light' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
          <IconCheck
            size={14}
            className={cn('ml-auto', theme !== 'dark' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
          <IconCheck
            size={14}
            className={cn('ml-auto', theme !== 'system' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

theme-provider.tsx

```tsx
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

##### search

\_dashboard.\_courses.tsx

```tsx
import { Form, Outlet, redirect, useNavigation, useSubmit } from 'react-router'
import type { Route } from '../+types/root'
// import { getAllTodos, getUser, type TodoRecord } from '~/db'
import Content from '~/components/Content'
import React, { useEffect, useRef } from 'react'
import TodoList from '~/components/TodosList'
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
```

```tsx
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
    <Content>
      {navigation.state === 'loading' ? (
        <div className='loader'></div>
      ) : (
        <Outlet />
      )}
    </Content>
  </div>
</div>
```

Content.tsx

- a nested main?

```tsx
import type React from 'react'

export default function Content({
  cn,
  children,
}: {
  cn?: string
  children: React.ReactNode
}) {
  return (
    <main
      className={`px-0 place-self-stretch min-h-[30vh] flex flex-col items-center justify-center ${
        cn ? cn : ''
      }`}>
      {children}
    </main>
  )
```

profile-dropdown.tsx

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

export function ProfileDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src='/avatars/01.png'
              alt='@shadcn'
            />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>Mizoguchi Coji</p>
            <p className='text-muted-foreground text-xs leading-none'>
              coji@techtalk.jp
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

#### content in 2 layers

##### goal

TodoList.tsx

```tsx
import { NavLink } from 'react-router'
// import type { TodoRecord } from '~/db'
import { formatDate } from '~/utils/utils'

export default function TodoList({
  todos,
  search,
}: {
  todos?: any[]
  search?: React.RefObject<HTMLInputElement>
}) {
  const list =
    search?.current?.value &&
    (todos?.filter(
      (todo) =>
        todo.createdAt.includes(search?.current?.value) ||
        todo.updatedAt?.includes(search?.current?.value)
    ) as any[])
  const filteredListAfterUpdate =
    list && (list?.filter((todo) => !todo.updatedAt) as any[])
  const displayList =
    list && search?.current?.value
      ? filteredListAfterUpdate!.length < list.length
        ? filteredListAfterUpdate
        : list
      : (todos as any[])
  return (
    <div
      className={`todos pt-8 max-w-lg flex flex-col gap-2 ${
        search?.current?.value ? 'block' : 'hidden md:block'
      }`}>
      {displayList &&
        displayList.length > 0 &&
        displayList?.map((todo: any) => {
          //if updated show latest year in the url
          const year =
            Number(new Date(todo.updatedAt!).getFullYear()) >
            Number(new Date(todo.createdAt).getFullYear())
              ? new Date(todo.updatedAt!).getFullYear().toString()
              : new Date(todo.createdAt).getFullYear().toString()
          return (
            <NavLink
              to={`/todo/${year}/${todo.id}`}
              viewTransition
              className={({ isActive }) =>
                `${
                  isActive ? 'dark:bg-blue bg-blue/50 pointer-events-none' : ''
                } block p-2 rounded w-fit`
              }
              key={todo.id}>
              {todo.updatedAt
                ? formatDate(todo.updatedAt)
                : formatDate(todo.createdAt!)}
            </NavLink>
          )
        })}
    </div>
  )
}
```

dashboard.\_courses/home.tsx

```tsx
export async function action() {
  return null
}
```

#####

\_dashboard_courses.tsx

```tsx
import type { Route } from './+types/_dashboard._courses'
;<Form
  method='post'
  action='/actions/ping'>
  <button type='submit'>Ping API and Redirect</button>
</Form>
```

clients\server\api.ts

```ts
import { APIClient as BaseClient } from '@edgefirst-dev/api-client'
import { z } from 'zod'
// import * as Contact from '~/entities/contact'

export const Schema = z.object({
  id: z.number(),
})
export class APIClient extends BaseClient {
  constructor(protected accessToken: string) {
    super(new URL(process.env.RESOURCE_HOST || 'http://localhost:5100/api'))
  }

  //   override async before(request: Request) {
  //     request.headers.set('Authorization', `Bearer ${this.accessToken}`)
  //     return request
  //   }

  override async after(_: Request, response: Response) {
    if (response.ok) return response
    let data = await response.json()
    let { error } = z.object({ error: z.string() }).parse(data)
    throw new Error(error)
  }

  async ping(query?: string) {
    let response = query
      ? await this.get(`/docs?q=${encodeURIComponent(query.trim())}`)
      : await this.get('/docs')
    let data = await response.json()
    return z.object({ contacts: data }) // z.array(Contact.Schema) }).parse(data).contacts
  }
}
```

contexts\server-aci

```ts
import { createContext } from 'react-router'
import type { APIClient } from '~/clients/server-api'

export const apiContext = createContext<APIClient>()
```

entries\ping.ts

```ts
import { z } from 'zod'

export const Schema = z.object({
  id: z.number(),
})
export type Type = z.infer<typeof Schema>
// export type InputType = z.infer<typeof InputSchema>
```

routes\actions\ping.ts

```ts
import { getAPIClient } from '~/middlewares/api-client'
import { redirect } from 'react-router'
import type { Route } from '../+types/_dashboard._courses'
export async function action({ request, context }: Route.ActionArgs) {
  let api = getAPIClient(context as unknown as any)
  let formData = await request.formData()
  // let input = Contact.InputSchema.parse(Object.fromEntries(formData))
  let contact = await api.ping()
  return redirect('/home')
}
```
