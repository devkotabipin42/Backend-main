import {createBrowserRouter} from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Dashboard from "./feature/ticket/pages/Dashboard";
import AdminDashbord from "./feature/ticket/pages/AdminDashbord";
import TicketDetail from "./feature/ticket/pages/TicketDetail";


export const router = createBrowserRouter([
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
    path: '/dashboard',
    element: <Dashboard/>
    },
    {
        path: '/admin',
        element: <AdminDashbord/>
    },
    {
        path: '/ticket/:id',
        element:<TicketDetail/>
    }
])