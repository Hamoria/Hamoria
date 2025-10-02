export function loader() {
  return null
}
import { useLocation } from 'react-router'
const useGetCurrentPage = () => {
  // Used to retrieve the url
  const location = useLocation()
  // Gets the current path name (url)
  const url = location.pathname
  return {
    // Ends with login? We are on the login page
    isAllPurchasePage: url.endsWith('/all-purchases'),
    // Ends with register? We are on the register page
    isPurchasPage: url.endsWith('/purchas'),
    // Ends with forgot password? we are on the forgot password page
    isForgotPasswordPage: url.endsWith('/cart'),
    isCheckoutdPage: url.endsWith('/checkout'),
    isOrdersPage: url.endsWith('/orders'),
  }
}
import { Outlet } from 'react-router'
import AllPurchases from '~/pages/purshase/AllPurshas'
import Cart from '~/pages/purshase/Cart'
import Checkout from '~/pages/purshase/Checkout'
import Orders from '~/pages/purshase/Orders'
export default function Component() {
  const { isAllPurchasePage, isPurchasPage } = useGetCurrentPage()
  console.log('here')
  if (isAllPurchasePage) return <AllPurchases />
  if (isAllPurchasePage) return <Cart />
  if (isAllPurchasePage) return <Checkout />
  if (isAllPurchasePage) return <Orders />
}
