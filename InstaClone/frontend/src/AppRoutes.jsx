import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
