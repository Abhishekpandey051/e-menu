import { createBrowserRouter } from "react-router";
import App from "./App";
import Admin from "./admin/Admin";
import AddItem from "./admin/AddItem";
import MenuItemCard from "./page/MenuItemCard";
import About from "./page/About";
import Dashboard from "./admin/Dashboard";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <MenuItemCard />
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: '/add-item',
        element: <AddItem />
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/ap',
        element:<Dashboard/>
      },

    ],
    // errorElement:<Error/>
  },
]);