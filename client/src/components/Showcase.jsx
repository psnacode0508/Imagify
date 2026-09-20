import React from 'react'
import { showcaseData } from '../assets/assets'
import { toast } from 'react-toastify'

const Showcase = ({ onForkPrompt }) => {
  const handleFork = (prompt, style) => {
    if (onForkPrompt) {
      onForkPrompt(prompt, style)
    }
    const consoleEl = document.getElementById('console')
    if (consoleEl) {
      consoleEl.scrollIntoView({ behavior: 'smooth' })
    }
    toast.info('PARAMETERS FORKED TO CONSOLE')
  }

  return (
    <section id="showcase" className="py-24 border-t border-white/5 bg-black/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Showcase Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyber-cyan mb-2">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan"></span>
              <span>LATEST STREAM CLUSTERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              Synth Feed // Showcase
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm font-mono text-gray-400 max-w-md">
            All artworks produced under 400ms on the cluster. Click "Fork" on any art to inject prompt &amp; hyperparameters directly into your console.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              className="group rounded-2xl overflow-hidden cyber-glass border border-white/10 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-1 shadow-2xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                  <p className="text-xs font-mono text-gray-200 line-clamp-2 mb-3">"{item.prompt}"</p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleFork(item.prompt, item.style)}
                      className="text-xs font-mono font-bold bg-cyber-cyan hover:bg-cyber-lime text-black px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Fork Prompt ✦
                    </button>
                    <span className="text-[10px] font-mono text-cyber-cyan">{item.model}</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-semibold">{item.title}</span>
                <span className="text-gray-500">{item.author}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Showcase
