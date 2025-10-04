import { Outlet } from 'react-router'
// import { AppSidebar } from '~/components/layout/app-sidebar'
// import { SidebarProvider } from '~/components/ui/sidebar'
import { SearchProvider } from '~/context/search-context'
import { cn } from '~/lib/utils'

import type { Route } from '../+types/root'
// import { getAllTodos, getUser, type TodoRecord } from '~/db'
import Content from '~/components/Content'
import React, { useEffect, useRef } from 'react'
// import TodoList from '~/components/TodosList'
import { CustomLink } from '~/components/Custom-link'
import { getSession } from '~/middlewares/session'

import { AppSidebar } from '~/components/layout/app-sidebar'
import { SidebarProvider } from '~/components/ui/sidebar'
// import { SearchProvider } from '~/context/search-context'

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
import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'
import { Link } from 'react-router'
import { TopNav } from '~/components/layout/top-nav'

const topNav = [
  {
    title: 'Overview',
    href: '/home',
    disabled: false,
  },
  {
    title: 'Customers',
    href: '/purchases',
    disabled: true,
  },
  {
    title: 'Products',
    href: '/all-purchases',
    disabled: true,
  },
  {
    title: 'Settings',
    href: '/cart',
    disabled: true,
  },
]
import { ProfileDropdown } from '~/components/profile-dropdown'
import { Search } from '~/components/Search'
import { ThemeSwitch } from '~/components/theme-switch'
export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SearchProvider>
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
            Link to <CustomLink to='../purshases'>acceptance</CustomLink>
            <Outlet />
          </Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
