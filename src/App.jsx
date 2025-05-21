import React from 'react'
import Login from './admin/Login'
import { AuthProvider } from './utils/AuthProvider'
import AddItem from './admin/AddItem'
import MenuItemCard from './page/MenuItemCard'
import { Outlet } from 'react-router'
import Navbar from './page/Navbar'
import Footer from './page/Footer'

function App() {
  return (
    <div>
       <Navbar/>
       <Outlet/>
       <Footer/>
    </div>
  )
}

export default App