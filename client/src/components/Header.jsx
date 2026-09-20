import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Header = ({ onSynthesize, isSynthesizing, activePrompt, setActivePrompt }) => {
  const { credit, setShowLogin, user } = useContext(AppContext)
  const [selectedStyle, setSelectedStyle] = useState('Ultra Photoreal')
  const [selectedRatio, setSelectedRatio] = useState('16:9')
  const [selectedModel, setSelectedModel] = useState('FLUX.1-Prism')

  const stylePresets = [
    { label: '⚡ Photoreal', value: 'Ultra Photoreal' },
    { label: '✦ Synthwave', value: 'Synthwave 80s' },
    { label: '🧬 Biomorphic', value: 'Biomorphic 3D' },
    { label: '🎌 Cyber Anime', value: 'Cyber Anime' },
    { label: '🌌 Dark Fantasy', value: 'Dark Fantasy' },
  ]

  const aspectRatios = ['16:9', '1:1', '9:16', '21:9']

  const fastPresets = [
    'Neon drenched blade runner street market, glowing umbrella reflections in puddle, rain splash in 8k octane',
    'Hyper realistic biomechanical panther with glowing cyan LED circuitry resting on obsidian monolith',
    'Floating futuristic brutalist pyramid enveloped in violet auroras and quantum particle streams'
  ]

  const handlePresetClick = (preset) => {
    setActivePrompt(preset)
    toast.info('PROMPT INJECTED TO TERMINAL')
  }

  const handleStyleClick = (styleVal) => {
    setSelectedStyle(styleVal)
    toast.info(`STYLE MATRIX: ${styleVal.toUpperCase()}`)
  }

  const handleRatioClick = (ratioVal) => {
    setSelectedRatio(ratioVal)
    toast.info(`CANVAS GEOMETRY: ${ratioVal}`)
  }

  const handleTrigger = () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    if (!activePrompt.trim()) {
      toast.warn('ENTER A VALID SYNTHESIS PROMPT')
      return
    }
    if (onSynthesize) {
      onSynthesize(activePrompt, selectedStyle, selectedRatio, selectedModel)
    }
  }

  return (
    <section className="relative pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden" id="console">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase text-gray-300 mb-5">
            <span className="text-cyber-cyan">⚡ FLUX.1 PRISM</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Latency: 380ms</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-white leading-none mb-5">
            Synthesize The <br />
            <span className="text-iridescent">Unreal Realm</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 font-sans max-w-xl mx-auto leading-relaxed">
            Neural generative rendering for digital visionaries. Enter high-dimensional prompts to forge instant, hyper-resolution photorealism.
          </p>
        </div>

        {/* High-Voltage Prompt Dock */}
        <div className="max-w-5xl mx-auto">
          <div className="cyber-glass-glow rounded-3xl p-3 sm:p-5 rainbow-border shadow-2xl relative">

            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs font-mono text-gray-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="text-[11px] text-gray-400 ml-1">TERMINAL // prompt_dock.synth</span>
              </div>

              {/* Model Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase text-gray-500 hidden sm:inline">Engine:</span>
                <select
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value)
                    toast.info(`ENGINE MOUNTED: ${e.target.value}`)
                  }}
                  className="bg-black/80 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-cyber-cyan font-mono outline-none focus:border-cyber-cyan transition-colors"
                >
                  <option value="FLUX.1-Prism">FLUX.1 Prism (8K High-Adherence)</option>
                  <option value="SDXL-Quantum">SDXL Quantum v4.2</option>
                  <option value="Imagify-Neural-X">Imagify Neural-X Ultra</option>
                </select>
              </div>
            </div>

            {/* Prompt Textarea */}
            <div className="relative bg-black/60 rounded-2xl p-4 border border-white/10 group focus-within:border-cyber-cyan/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-cyber-cyan mt-1 select-none font-mono text-sm">✦</div>
                <textarea
                  rows="2"
                  value={activePrompt}
                  onChange={(e) => setActivePrompt(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base font-mono text-white placeholder-gray-600 outline-none resize-none"
                  placeholder="Enter high-dimensional synthesis prompt..."
                />
              </div>

              {/* Parameter Controls Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">

                {/* Style Matrix */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase mr-1">Style Matrix:</span>
                  {stylePresets.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleStyleClick(s.value)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${selectedStyle === s.value
                          ? 'bg-cyan-400/10 border border-cyber-cyan/40 text-cyber-cyan'
                          : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Aspect Ratio & Synthesize CTA */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

                  {/* Aspect Ratio Buttons */}
                  <div className="flex items-center bg-black/80 rounded-xl p-1 border border-white/10 text-xs font-mono">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => handleRatioClick(ratio)}
                        className={`px-2.5 py-1 rounded-lg transition-all ${selectedRatio === ratio
                            ? 'text-cyber-cyan bg-cyan-400/10 font-bold'
                            : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>

                  {/* Synthesize CTA Button */}
                  <button
                    disabled={isSynthesizing}
                    onClick={handleTrigger}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyber-cyan hover:bg-cyber-lime text-black font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50"
                  >
                    <span>{isSynthesizing ? '⚡' : '✦'}</span>
                    <span>{isSynthesizing ? 'SAMPLING...' : 'Synthesize'}</span>
                  </button>

                </div>
              </div>
            </div>

            {/* Quick Fast Presets */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px] font-mono text-gray-400">
              <span className="text-gray-600 uppercase">Load:</span>
              {fastPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(preset)}
                  className="whitespace-nowrap px-2 py-0.5 rounded bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:text-cyber-cyan transition-colors"
                >
                  [✦ {preset.slice(0, 24)}...]
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Header
