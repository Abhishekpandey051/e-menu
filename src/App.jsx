import React from 'react'
import Login from './admin/Login'
import { AuthProvider } from './utils/AuthProvider'
import AddItem from './admin/AddItem'
import MenuItemCard from './page/MenuItemCard'

function App() {
  return (
    <div>
      {/* <AuthProvider>
      <Login />
      </AuthProvider> */}
      
       {/* <AddItem/> */}
       <MenuItemCard/>
    </div>
  )
}

export default App