import { createBrowserRouter } from "react-router";
import App from "./App";
import Admin from "./admin/Admin";
import MenuItemCard from "./page/MenuItemCard";
import About from "./page/About";
import ContactUs from "./page/ContactUs";
import Feedback from "./page/Feedback";
import DashboardLayout from "./dashborad/DashboardLayout";
import Event from "./page/Event";

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
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<ContactUs/>
      },
      {
        path: 'feedback',
        element: <Feedback/>
      },
      {
        path:'/event',
        element:<Event/>
      }

    ],
    // errorElement:<Error/>
  },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path:'/dashboard',
        element:<DashboardLayout/>
      }
]);