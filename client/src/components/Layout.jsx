import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { ConfirmProvider } from "./ConfirmProvider"

export default function Layout() {
  return (
    <ConfirmProvider>
      <Header />
      <Outlet />
      <Footer />
    </ConfirmProvider>
  )
}
