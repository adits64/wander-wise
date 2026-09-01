import Footer from '@/components/landingComponents/Footer'
import Navbar from '@/components/landingComponents/Navbar'
import AppNavbar from '@/components/shared/AppNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <AppNavbar />
        <Outlet />
        <Footer />

    </div>
  )
}

export default AppLayout