import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { SessionProvider } from "../../contexts/session.context"
import Footer from '../Footer/Footer'

const Layout = () => {
    return (
    <SessionProvider>
    <NavBar />
    <Outlet />
    <Footer />
    </SessionProvider>
    )
}

export default Layout