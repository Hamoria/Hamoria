import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'
import { Search } from '~/components/Search'
import { Link } from 'react-router'
export function loader() {
  return null
}
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
export default function Component() {
  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
        </div>
      </Header>

      <Main>
        <div>courses home</div>
        Link to <Link to='../purshases'>acceptance</Link>
      </Main>
    </>
  )
}
