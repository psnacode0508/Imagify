import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CanvasViewport = ({ 
  currentImage, 
  activePrompt, 
  isSynthesizing, 
  progress, 
  stepCount, 
  ratio, 
  model 
}) => {
  const [downloading, setDownloading] = useState(false)

  const copyPrompt = () => {
    if (!activePrompt) return
    navigator.clipboard.writeText(activePrompt)
      .then(() => toast.info('PROMPT COPIED TO CLIPBOARD'))
      .catch(() => toast.error('CLIPBOARD ACCESS RESTRICTED'))
  }

  const simulateUpscale = () => {
    toast.info('DISPATCHING 8K LATENT UPSCALER...')
    setTimeout(() => {
      toast.success('8K ARTIFACT ENHANCED (+400% RES)')
    }, 1200)
  }

  const handleDownload = () => {
    if (!currentImage) return
    setDownloading(true)
    const link = document.createElement('a')
    link.href = currentImage
    link.download = `imagify-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('SYNTH IMAGE DOWNLOADED')
    setDownloading(false)
  }

  // Dynamic aspect ratio geometry class mapping
  const getRatioContainerClass = () => {
    switch (ratio) {
      case '1:1':
        return 'w-full max-w-lg mx-auto aspect-square rounded-xl'
      case '9:16':
        return 'w-full max-w-sm mx-auto aspect-[9/16] rounded-xl'
      case '21:9':
        return 'w-full aspect-[21/9]'
      case '16:9':
      default:
        return 'w-full aspect-[16/9]'
    }
  }

  const getResolutionMeta = () => {
    switch (ratio) {
      case '1:1': return '1024 × 1024 (1:1)'
      case '9:16': return '1080 × 1920 (9:16)'
      case '21:9': return '2560 × 1080 (21:9 Cinema)'
      case '16:9':
      default: return '1920 × 1080 (16:9)'
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
      <div className="border border-white/10 rounded-2xl bg-black/90 overflow-hidden relative shadow-2xl">
        
        {/* Canvas Meta Header */}
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono bg-black/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyber-cyan font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
              <span>{model || 'FLUX.1-Prism'}</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">{getResolutionMeta()}</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-400 hidden sm:inline">Steps: 28/28</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={copyPrompt}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan text-gray-300 hover:text-white transition-colors text-[11px] flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <span>Copy Prompt</span>
            </button>
            <button 
              onClick={simulateUpscale}
              className="px-2.5 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all text-[11px] font-bold"
            >
              8K Upscale
            </button>
          </div>
        </div>

        {/* Dynamic Image Viewport */}
        <div className={`relative overflow-hidden flex items-center justify-center transition-all bg-neutral-950 ${getRatioContainerClass()}`}>
          
          <img 
            src={currentImage} 
            alt="Synthesized AI Output" 
            className="w-full h-full object-cover transition-all duration-700 filter brightness-95 contrast-105"
          />

          {/* Diffusion Latent Denoising Overlay */}
          {isSynthesizing && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-20">
              <div className="relative w-16 h-16">
                <div className="w-16 h-16 rounded-full border-2 border-cyber-cyan border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-cyber-cyan">✦</div>
              </div>
              <div className="text-center font-mono">
                <p className="text-sm font-bold text-white tracking-widest uppercase">Sampling Latent Tensors...</p>
                <p className="text-xs text-cyber-cyan mt-1">Denoising Step {stepCount} / 28 [Euler Ancestral]</p>
              </div>
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyber-lime transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* HUD Floating Bottom Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end justify-between font-mono text-xs">
            <div className="max-w-xl">
              <p className="text-white text-xs sm:text-sm font-medium line-clamp-1 drop-shadow">
                "{activePrompt || 'Awaiting prompt specification...'}"
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                <span className="text-cyber-cyan">Seed: 914028401</span>
                <span>•</span>
                <span>CFG: 7.0</span>
                <span>•</span>
                <span>Sampler: Euler-A</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleDownload}
                disabled={downloading || isSynthesizing}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md transition-colors"
                title="Download Image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default CanvasViewport
