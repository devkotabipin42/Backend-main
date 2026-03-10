import {createBrowserRouter} from 'react-router'
import Login from './auth/pages/Login'
import Register from './auth/pages/Register'
import Protected from './features/Expression/components/Protected'
import Home from './features/home/components/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home/></Protected>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])