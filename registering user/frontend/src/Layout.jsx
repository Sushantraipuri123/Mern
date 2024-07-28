import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './utilities/Header'
import Footer from './utilities/Footer'
function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout