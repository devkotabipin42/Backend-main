import { useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const logout = () => {
    setUser(null)
    localStorage.removeItem('token') 
}
    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}