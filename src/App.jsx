import { Outlet } from 'react-router'
import Navbar from './page/Navbar'
import Footer from './page/Footer'

function App() {
  return (
    <div>
       <Navbar/>
       <Outlet/>
    </div>
  )
}

export default App