import { Header } from '~/components/layout/Header'
import { Main } from '~/components/layout/Main'
import { Search } from '~/components/Search'
export function loader() {
  return null
}

export default function Component() {
  return (
    <>
      <Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
        </div>
      </Header>

      <Main>{/* Main content goes here */}</Main>
    </>
  )
}
