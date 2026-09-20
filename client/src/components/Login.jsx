import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const { showLogin, setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
  const [state, setState] = useState('Login') // 'Login' or 'Sign Up'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (showLogin) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showLogin])

  if (!showLogin) return null

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('ACCESS GRANTED // SESSION INITIALIZED')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password
        })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success('SYNTHPILOT REGISTERED // ALLOCATION: 5 CREDITS')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md cyber-glass-glow rounded-3xl p-8 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyber-cyan/30 text-[10px] font-mono uppercase text-cyber-cyan mb-3">
            <span>TERMINAL // {state === 'Login' ? 'AUTH.VERIFY' : 'PILOT.REGISTER'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white tracking-wide">
            {state === 'Login' ? 'Pilot Sign In' : 'Forge Access'}
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-1">
            {state === 'Login' ? 'Enter authentication vectors to mount your terminal' : 'Provision a new neural synthesis account'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4 font-mono">
          {state === 'Sign Up' && (
            <div className="bg-black/60 rounded-xl p-3 border border-white/10 flex items-center gap-3 focus-within:border-cyber-cyan/50 transition-colors">
              <span className="text-cyber-cyan text-xs">✦</span>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Pilot Handle"
                required
                className="w-full bg-transparent text-xs text-white placeholder-gray-600 outline-none"
              />
            </div>
          )}

          <div className="bg-black/60 rounded-xl p-3 border border-white/10 flex items-center gap-3 focus-within:border-cyber-cyan/50 transition-colors">
            <span className="text-cyber-cyan text-xs">@</span>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Matrix Identifier (Email)"
              required
              className="w-full bg-transparent text-xs text-white placeholder-gray-600 outline-none"
            />
          </div>

          <div className="bg-black/60 rounded-xl p-3 border border-white/10 flex items-center gap-3 focus-within:border-cyber-cyan/50 transition-colors">
            <span className="text-cyber-cyan text-xs">#</span>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passcode Hash"
              required
              className="w-full bg-transparent text-xs text-white placeholder-gray-600 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-cyber-cyan hover:bg-cyber-lime text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            {state === 'Login' ? 'Authenticate Terminal ✦' : 'Initialize Account ✦'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-mono text-gray-400">
          {state === 'Login' ? (
            <p>
              Unregistered pilot?{' '}
              <button 
                type="button"
                onClick={() => setState('Sign Up')}
                className="text-cyber-cyan hover:text-cyber-lime underline ml-1 transition-colors"
              >
                Provision identity
              </button>
            </p>
          ) : (
            <p>
              Already authenticated?{' '}
              <button 
                type="button"
                onClick={() => setState('Login')}
                className="text-cyber-cyan hover:text-cyber-lime underline ml-1 transition-colors"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Login
