import { useContext } from "react";
import { login,register } from "../services/auth.service";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



export const  useAuth =()=>{
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading, logout} = context
    const navigate = useNavigate()
    const handleLogin = async (email, password) => {
  setLoading(true)
  try {
    const response = await login(email, password)
    setUser(response.user)
    localStorage.setItem('token', response.token) 
    navigate('/dashboard')
  } catch (err) {
    throw err  // page pe error dikhane ke liye
  } finally {
    setLoading(false)
  }
}


    const handleRegister = async (username, email, password) => {
  setLoading(true)
  try {
    const response = await register(username, email, password)
    console.log('Response:', response)
    setUser(response.user)
    localStorage.setItem('token', response.token) 
    navigate('/dashboard')
  } catch (err) {
    throw err
  } finally {
    setLoading(false)
  }
}
    return{
        user,loading,handleLogin,handleRegister,logout
    }
}