import { createBrowserRouter } from "react-router";
import App from "./App";
import Admin from "./admin/Admin";
import AddItem from "./admin/AddItem";
import MenuItemCard from "./page/MenuItemCard";

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

    ],
    // errorElement:<Error/>
  },
]);