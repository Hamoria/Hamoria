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
