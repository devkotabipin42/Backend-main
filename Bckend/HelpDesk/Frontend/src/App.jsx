import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.route.jsx'

const App = () => {
  return (
   <AuthProvider>
    <RouterProvider router={router} />
   </AuthProvider>
  )
}

export default App
