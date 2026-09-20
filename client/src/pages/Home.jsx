import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user, setShowLogin, backendUrl, token } = useContext(AppContext)

  const handleGenerate = async (e) => {
    e.preventDefault()

    if (!user) {
      setShowLogin(true)
      return
    }

    if (!prompt.trim()) {
      toast.warn('Please enter a description for your image')
      return
    }

    try {
      setLoading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      )

      if (data.success) {
        setImage(data.resultImage)
        toast.success('Image generated!')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-950 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-6">

        {/* Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Image Studio
          </h1>
          <p className="text-sm text-zinc-400 mt-2 font-mono">
            Type any prompt below to synthesize high-resolution imagery.
          </p>
        </div>

        {/* Preview Screen */}
        <div className="w-full aspect-square max-w-md rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden flex items-center justify-center relative shadow-xl">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono text-zinc-400">Rendering visual matrix...</p>
            </div>
          ) : image ? (
            <img
              src={image}
              alt="Synthesized Visual"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-zinc-600 font-mono text-sm px-4">
              Enter a prompt to preview output
            </div>
          )}
        </div>

        {/* Input Dock */}
        <form onSubmit={handleGenerate} className="w-full max-w-md flex flex-col gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Woman in black jacket floating in neon-lit alleyway..."
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition font-sans"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-lg text-sm transition disabled:opacity-50 font-mono"
          >
            {loading ? 'SYNTHESIZING...' : 'GENERATE IMAGE ✦'}
          </button>
        </form>

        {image && !loading && (
          <a
            href={image}
            download="imagify-render.png"
            className="text-xs font-mono text-zinc-400 hover:text-cyan-400 underline transition"
          >
            Download Render
          </a>
        )}
      </div>
    </div>
  )
}

export default Home