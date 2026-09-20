import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import Home from './pages/Home'
import Result from './pages/Result'


const App = () => {
  return (
    <div className="cyber-grid relative min-h-screen flex flex-col font-sans bg-cyber-black text-gray-100 selection:bg-cyber-cyan selection:text-cyber-black">
      {/* Ambient Aurora Backdrops */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10 aurora-blur-1"></div>
      <div className="fixed top-1/3 right-0 w-[550px] h-[450px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none -z-10 aurora-blur-2"></div>
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Global Auth Modal */}
      <Login />

      {/* Persisted Top Navigation */}
      <Navbar />

      {/* Routes Viewport */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        {/* <Route path="/buy" element={<BuyCredit />} /> */}
      </Routes>

      {/* Persisted Footer */}
      <Footer />

      {/* Global Notifications */}
      <ToastContainer position="bottom-right" theme="dark" autoClose={2500} />
    </div>
  )
}

export default App
