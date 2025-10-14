#

##

[core-layout]
https://github.com/Hamoria/Hamoria/blob/main/documentation/iteration1.md

[pages]

[content]

### core layout (active view)

- current

https://github.com/coji/shadcn-admin-react-router/tree/main/app

- future
  [tuto v2] https://sergiodxa.com/tutorials/add-additional-data-before-submitting-on-remix

#### base create record

use process.env

- auth with session that have useriD + admin

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

- cookie to find user.

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

auth.register

```ts
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
```

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

#### mx-auto get current page

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

#### dashboard dependencies (use callback, collapsible)

[login-->layout-clientside]

command-menu.tsx

- scroll area and command., callback to run useNavigate || theme

```tsx
import {
  IconArrowRightDashed,
  IconDeviceLaptop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import React from 'react'
import { useNavigate } from 'react-router'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command'
import { useSearch } from '~/context/search-context'
import { sidebarData } from '~/data/sidebar-data'
import { ScrollArea } from './ui/scroll-area'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog
      modal
      open={open}
      onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <ScrollArea
          type='hover'
          className='h-72 pr-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup
              key={group.title}
              heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate(navItem.url as string))
                      }}>
                      <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                        <IconArrowRightDashed className='text-muted-foreground/80 size-2' />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => {
                      runCommand(() => navigate(subItem.url as string))
                    }}>
                    <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                      <IconArrowRightDashed className='text-muted-foreground/80 size-2' />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <IconMoon className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
```

layout/types

- navbased item, collapasble || navlink

```ts
interface User {
  name: string
  email: string
  avatar: string
}

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: string
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  //   user: User
  //   teams: Team[]
  navGroups: NavGroup[]
}

export type {
  NavCollapsible,
  NavGroup as NavGroupProps,
  NavItem,
  NavLink,
  SidebarData,
}
```

search-context.tsx

- children and keydown. client side

```tsx
import React from 'react'
import { CommandMenu } from '~/components/command-menu'

interface SearchContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchContext = React.createContext<SearchContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export function SearchProvider({ children }: Props) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandMenu />
    </SearchContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const searchContext = React.useContext(SearchContext)

  if (!searchContext) {
    throw new Error('useSearch has to be used within <SearchContext.Provider>')
  }

  return searchContext
}
```

sidebar-data.tsx

- with the icons.

```tsx
import type { SidebarData } from '../components/layout/types'

export const sidebarData: SidebarData = {
  navGroups: [{ title: 'Menu', items: links }],
}
```

- auth.login --> navigate

```tsx
  return redirect('/home', {
```

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

#### sidebar layout (head,main props or fixed)

Search.tsx

- type + placeholder

```tsx
import { IconSearch } from '@tabler/icons-react'
import { Button } from '~/components/ui/button'
import { useSearch } from '~/context/search-context'
import { cn } from '~/lib/utils'

interface Props {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({ className = '', placeholder = 'Search' }: Props) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant='outline'
      className={cn(
        'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-40 md:flex-none lg:w-56 xl:w-64',
        className
      )}
      onClick={() => setOpen(true)}>
      <IconSearch
        aria-hidden='true'
        className='absolute top-1/2 left-1.5 -translate-y-1/2'
      />
      <span className='ml-3'>{placeholder}</span>
      <kbd className='bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
        <span className='text-xs'>⌘</span>
      </kbd>
    </Button>
  )
}
```

##### sidebar , head, main

- functionallity scroll to top and fixed optin., offset + scroll listener.

- flex grow

Header

```tsx
import React from 'react'
// import { Separator } from '~/components/ui/separator'
// import { SidebarTrigger } from '~/components/ui/sidebar'
import { cn } from '~/lib/utils'

interface HeaderProps extends React.ComponentPropsWithRef<'header'> {
  fixed?: boolean
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'bg-background flex items-center gap-3 px-4 py-1 sm:gap-4',
        fixed && 'header-fixed peer/header fixed z-50 w-[inherit] rounded-md',
        offset > 10 && fixed ? 'shadow-sm' : 'shadow-none',
        className
      )}
      {...props}>
      {/* <SidebarTrigger
        variant='outline'
        className='scale-125 sm:scale-100'
      />
      <Separator
        orientation='vertical'
        className='h-6'
      /> */}
      {children}
    </header>
  )
}

Header.displayName = 'Header'
```

Main

```tsx
import type React from 'react'
import { cn } from '~/lib/utils'

interface MainProps extends React.ComponentPropsWithRef<'main'> {
  fixed?: boolean
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-6',
        fixed && 'fixed-main flex grow flex-col overflow-hidden'
      )}
      {...props}
    />
  )
}

Main.displayName = 'Main'
```

app-sidebar

```ts
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '~/components/ui/sidebar'
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='icon'
      variant='floating'
      {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup
            key={props.title}
            {...props}
          />
        ))}

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail /> */}
      sidebar
    </Sidebar>
  )
}
```

#### navgroups setup (sidebar, check active)

navgroups

- sidebar Menusub buttons

```tsx
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { Badge } from '~/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '~/components/ui/sidebar'
import type { NavCollapsible, NavGroupProps, NavItem, NavLink } from './types'

export function NavGroup({ title, items }: NavGroupProps) {
  const { state } = useSidebar()
  const { pathname: href } = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`

          if (!item.items)
            return (
              <SidebarMenuLink
                key={key}
                item={item}
                href={href}
              />
            )

          if (state === 'collapsed')
            return (
              <SidebarMenuCollapsedDropdown
                key={key}
                item={item}
                href={href}
              />
            )

          return (
            <SidebarMenuCollapsible
              key={key}
              item={item}
              href={href}
            />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
)

const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.title}>
        <Link
          to={item.url}
          onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarMenuCollapsible = ({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) => {
  const { setOpenMobile } = useSidebar()
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='CollapsibleContent'>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}>
                  <Link
                    to={subItem.url}
                    onClick={() => setOpenMobile(false)}>
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.title}</span>
                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

const SidebarMenuCollapsedDropdown = ({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) => {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.title}
            isActive={checkIsActive(href, item)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='right'
          align='start'
          sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem
              key={`${sub.title}-${sub.url}`}
              asChild>
              <Link
                to={sub.url}
                className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}>
                {sub.icon && <sub.icon />}
                <span className='max-w-52 text-wrap'>{sub.title}</span>
                {sub.badge && (
                  <span className='ml-auto text-xs'>{sub.badge}</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || // /endpint?search=param
    href.split('?')[0] === item.url || // endpoint
    !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item?.url?.split('/')[1])
  )
}
```

sidebar-data

```tsx
interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}
```

### pages (seg, var)

#### sidebar data into nav coom/lay (page segments)

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

### variable style

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

##### dashboard query selector (sidebar- svh + calc dockument sett)

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

### Content (match ref, api client)

##### search (content wrapp focos ref)

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

##### goal (search + prop include)

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

##### test perform action (api client)

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

LOADER root triggered - 1.12ms
ERROR routes/actions/ping threw an error!
ERROR No value found for context
Error: No value found for context
at RouterContextProvider.get (file:///home/fallow/base-stack/node_modules/.pnpm/react-router@7.9.1_react-dom@19.1.1_react@19.1.1__react@19.1.1/node_modules/react-router/dist/development/chunk-B7RQU5TL.mjs:397:11)
at getAPIClient (/home/fallow/base-stack/app/middlewares/

#### end iteration

##### build environment

auth.server.ts

- hmm how to instanciate

```ts
import { OAuth2Strategy } from 'remix-auth-oauth2'

export type Tokens = OAuth2Strategy.VerifyOptions['tokens']

export default await OAuth2Strategy.discover<Tokens>(
  new URL('/.well-known/oauth-authorization-server', process.env.ISSUER_HOST),
  {
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    redirectURI: 'http://localhost:3000/auth',
    scopes: ['openid', 'contacts:read:own', 'contacts:write:own'],
    audience: process.env.AUDIENCE,
  },
  async ({ tokens }) => tokens
)
// export async function createOAuth2Strategy() {
//   return OAuth2Strategy.discover<Tokens>(
//     new URL('/.well-known/oauth-authorization-server', process.env.ISSUER_HOST),
//     {
//       clientId: process.env.CLIENT_ID!,
//       clientSecret: process.env.CLIENT_SECRET!,
//       redirectURI: 'http://localhost:3000/auth',
//       scopes: ['openid', 'contacts:read:own', 'contacts:write:own'],
//       audience: process.env.AUDIENCE,
//     },
//     async ({ tokens }) => tokens
//   )
// }
```

app.config.server.ts

- get envrionments of diff microservices

```ts
import { Environment } from '../../models'

// import { getRequiredServerEnvVar } from './utils.server'

export const environment = getRequiredServerEnvVar<Environment>('NODE_ENV')
export const sessionSecret = getRequiredServerEnvVar(
  'SESSION_SECRET',
  'MY_SECRET_KEY'
)
export const stripePublishableKey = getRequiredServerEnvVar(
  'STRIPE_PUBLISHABLE_KEY'
)
export const authAPIUrl = getRequiredServerEnvVar(
  'AUTH_API_URL',
  'http://localhost:8081'
)
export const orderAPIUrl = getRequiredServerEnvVar(
  'ORDER_API_URL',
  'http://localhost:8082'
)
export const productAPIUrl = getRequiredServerEnvVar(
  'PRODUCT_API_URL',
  'http://localhost:8083'
)

function getRequiredEnvVarFromObj<T>(
  obj: Record<string, string | undefined>,
  key: string,
  devValue: unknown = `${key}-dev-value`
) {
  let value = devValue
  const envVal = obj[key]
  if (envVal) {
    value = envVal
  } else if (obj.ENVIRONMENT !== Environment.Development) {
    throw new Error(`${key} is a required env variable`)
  }
  return value as T
}

export function getRequiredServerEnvVar<T = string>(
  key: string,
  devValue?: unknown
) {
  return getRequiredEnvVarFromObj<T>(process.env, key, devValue)
}
```

security.server.ts

- content security

```ts
import { Environment } from '../../models'

import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const replaceNewLinesWithSpaces = (str: string) => {
  return str.replace(/\s{2,}/g, ' ').trim()
}

export const classnames = (...inputs: ClassValue[]) => {
  return twMerge(replaceNewLinesWithSpaces(clsx(inputs)))
}

import { environment } from './app.config.server'

const localDomains =
  environment === Environment.Development
    ? '127.0.0.1:* localhost:* ws://localhost:*'
    : ''
const appDomains = 'https://*.projectx.com'
const trustedDomains = [appDomains, localDomains].filter(Boolean).join(' ')

export const defaultSrc = replaceNewLinesWithSpaces(`
  ${trustedDomains}
  https://*.stripe.com
`)

export const scriptSrc = replaceNewLinesWithSpaces(`
  ${defaultSrc}

`)

export const frameSrc = replaceNewLinesWithSpaces(`
  ${defaultSrc}
`)

export const connectSrc = replaceNewLinesWithSpaces(`
  ${defaultSrc}
`)
export const mediaSrc = replaceNewLinesWithSpaces(`
  ${defaultSrc}
`)

export const imgSrc = replaceNewLinesWithSpaces(`
  ${defaultSrc}
  https://*.unsplash.com
  https://placehold.co
  https://gravatar.com
  https://*.githubusercontent.com\
  https://tailwindui.com
`)

export const contentSecurityPolicy = replaceNewLinesWithSpaces(`
  default-src 'self' data: blob: ${defaultSrc};
  script-src 'self' 'unsafe-inline' data: blob: ${scriptSrc};
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://rsms.me;
  object-src 'none';
  base-uri 'self';
  connect-src 'self' ${connectSrc};
  font-src 'self' data: https://rsms.me https://fonts.gstatic.com;
  frame-src 'self' ${frameSrc};
  img-src 'self' data: blob: ${imgSrc};
  manifest-src 'self';
  media-src 'self' blob: ${mediaSrc};
  worker-src 'self' blob:;
  form-action 'self';
`)

export const securityHeaders: Record<string, string> = {
  // X-DNS-Prefetch-Control
  'X-DNS-Prefetch-Control': 'on',
  // Strict-Transport-Security
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  // X-XSS-Protection
  'X-XSS-Protection': '1; mode=block',
  // X-Frame-Options
  'X-Frame-Options': 'SAMEORIGIN',
  // X-Content-Type-Options
  'X-Content-Type-Options': 'nosniff',
  // Referrer-Policy
  'Referrer-Policy': 'origin-when-cross-origin',
  // Content Security Policy
  'Content-Security-Policy': contentSecurityPolicy,
}
```

env.server.ts

```ts
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),

  ISSUER: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  SESSION_SECRET: z.string(),

  RESOURCE_HOST: z.string().url(),
  ISSUER_HOST: z.string().url(),
  AUDIENCE: z.string(),
  APP_DEPLOYMENT_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('staging'),
})
```

test router ctx provider

```ts
import { test, expect, vi } from 'vitest'
import { getSession } from './session'
import { refreshMiddleware } from './refresh'
import { RouterContextProvider } from 'react-router'

test('returns a response', async () => {
  let request = new Request('https://example.com')
  let params = {}
  let context = new RouterContextProvider()

  let next = vi.fn().mockResolvedValue(new Response(null))

  let response = await refreshMiddleware({ request, params, context }, next)

  expect(response).toBeInstanceOf(Response)
  let session = getSession(context as unknown as any)

  expect(session).toBeDefined()
  // Your `isSession` function can be checked here as well
})
test('calls the next function', async () => {
  let request = new Request('https://example.com')
  let params = {}
  let context = new RouterContextProvider()

  // Replace Bun's mock with Vitest's `vi.fn()`
  let next = vi.fn().mockImplementation(() => new Response(null))

  let response = await refreshMiddleware({ request, params, context }, next)

  expect(next).toHaveBeenCalledTimes(1)
})

// test('commits the session in the response headers', async () => {
//   let request = new Request('https://example.com')
//   let params = {}
//   let context = new RouterContextProvider()

//   let next = vi.fn().mockImplementation(() => new Response(null))

//   let response = await refreshMiddleware({ request, params, context }, next)

//   // Expect a set-cookie header string to be present
//   expect(response.headers.get('Set-Cookie')).toBeTypeOf('string')
// })
```

##### some requirements difficult to resolve

api-client.ts

- the client need access token

```ts
let accessToken = getAccessToken(context as RouterContextProvider)
context.set(apiContext, new APIClient(accessToken))
```

refresh.ts

- unset and has refresh

```ts
import type { MiddlewareFunction } from 'react-router'
import {
  href,
  redirect,
  createContext,
  RouterContextProvider,
} from 'react-router'
import auth, { type Tokens } from '~/auth'
import { getSession } from './session'

const accessTokenContext = createContext<string>()

export const refreshMiddleware: MiddlewareFunction<Response> = async (
  { context },
  next
) => {
  //   const auth = await createOAuth2Strategy()
  // @ts-expect-error
  let session = await getSession(context)

  let refreshToken = session.get('refresh')

  if (!refreshToken) throw redirect('/_auth/login')

  let tokens: Tokens | null = null

  try {
    tokens = await auth.refreshToken(refreshToken)
  } catch {
    // If the refresh token is invalid, we need to redirect to the login page
    // to get a new one.
    session.unset('refresh')
    session.unset('email')
    throw redirect('/_auth/login')
  }

  if (tokens.hasRefreshToken()) {
    session.set('refresh', tokens.refreshToken())
  }

  context.set(accessTokenContext, tokens.accessToken())

  return await next()
}

export function getAccessToken(context: RouterContextProvider) {
  return context.get(accessTokenContext)
}
```

session.ts

```ts
type SessionData = {
  userId: string
  role: 'user' | 'admin'
  refresh?: string
  email?: string
}
```

root.tsx

```ts
import { apiClientMiddleware, getAPIClient } from '~/middlewares/api-client'
import { refreshMiddleware } from '~/middlewares/refresh'
export const middleware = [
  refreshMiddleware,
  apiClientMiddleware,
] satisfies Route.MiddlewareFunction[]
```

$.tsx

```ts
export async function loader() {
  return null
}
```

\_index.tsx

```ts
throw redirect('/home')
```

actions\ping.ts

```ts
import { apiClientMiddleware } from '~/middlewares/api-client'
export const middleware = [
  // refreshMiddleware,
  apiClientMiddleware,
] satisfies Route.MiddlewareFunction[]

export async function loader({ context }: Route.LoaderArgs) {
  return null
}
```

```

```
