import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {loading,handleRegister} = useAuth()

  async function handleSubmit(e){
    e.preventDefault() 
    await handleRegister({username,email,password}) 
    navigate('/')    
  }
  return (
   <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="px-6 pt-7 pb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                <span className="text-white font-semibold">IG</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Create account</h1>
                <p className="text-sm text-white/60">Sign up to get started</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="px-6 pb-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              
              <label className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                type="text"
                placeholder="bipin_devkota"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="bipin@example.com"
                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 pr-20 text-white placeholder:text-white/40 outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 my-1 px-3 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  Show
                </button>
              </div>
            </div>

            

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-red-800 text-black font-semibold py-3  active:scale-95 transition"
            >
              Create account
            </button>

            {/* Footer */}
            <p className="mt-5 text-center text-sm text-white/60">
              Already have an account?{" "}
              <button
                type="button"
                className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition"
              >
               <Link to={'/login'} >Login</Link>
              </button>
            </p>
          </form>
        </div>

        {/* Small note */}
        <p className="mt-4 text-center text-xs text-white/40">
          Use a strong password to keep your account safe.
        </p>
      </div>
    </div>
  )
}

export default Register
