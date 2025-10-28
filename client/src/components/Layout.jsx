import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { ConfirmProvider } from "./ConfirmProvider"
import DemoBanner from "./DemoBanner"

export default function Layout() {
  return (
    <ConfirmProvider>
      <DemoBanner />
      <Header />
      <Outlet />
      <Footer />
    </ConfirmProvider>
  )
}
