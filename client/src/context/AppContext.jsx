import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [credit, setCredit] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/credits`, {
        headers: { token }
      })
      if (data.success) {
        setCredit(data.credits)
        setUser(data.user)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      )

      if (data.success) {
        loadCreditsData()
        return data.resultImage
      } else {
        toast.error(data.message)
        loadCreditsData()
        if (data.creditBalance === 0) {
          navigate('/buy')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    setCredit(0)
    toast.info('Session terminated')
  }

  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  }, [token])

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    backendUrl,
    navigate,
    logout,
    loadCreditsData,
    generateImage
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
