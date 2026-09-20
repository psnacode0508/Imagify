import React from 'react'

const TechSpecs = () => {
  return (
    <section id="specs" className="py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase text-cyber-lime tracking-wider mb-2">RAW ARCHITECTURAL PERFORMANCE</div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white">Engineered For Zero Friction</h2>
          <p className="text-sm font-mono text-gray-400 mt-3">Next-generation hardware scheduling running on H100 Tensor-Core arrays.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl cyber-glass border border-white/10 hover:border-cyber-cyan/50 transition-all group">
            <div className="text-2xl text-cyber-cyan font-mono font-bold mb-3">&lt;380ms</div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mb-1">Sub-Second Inference</h3>
            <p className="text-xs font-mono text-gray-400 leading-relaxed">Pipelined FlashAttention-3 diffusion kernel executes generation before you release your fingertips.</p>
          </div>

          <div className="p-6 rounded-2xl cyber-glass border border-white/10 hover:border-cyber-magenta/50 transition-all group">
            <div className="text-2xl text-cyber-magenta font-mono font-bold mb-3">100% RAW</div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mb-1">Text Adherence</h3>
            <p className="text-xs font-mono text-gray-400 leading-relaxed">Bidirectional spatial cross-attention prevents visual hallucinations and renders legible typography flawlessly.</p>
          </div>

          <div className="p-6 rounded-2xl cyber-glass border border-white/10 hover:border-cyber-lime/50 transition-all group">
            <div className="text-2xl text-cyber-lime font-mono font-bold mb-3">8K Neural</div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mb-1">Super-Resolution</h3>
            <p className="text-xs font-mono text-gray-400 leading-relaxed">Integrated multi-frequency upscalers interpolate hair, fabric, metal textures without edge blur.</p>
          </div>

          <div className="p-6 rounded-2xl cyber-glass border border-white/10 hover:border-cyber-violet/50 transition-all group">
            <div className="text-2xl text-cyber-violet font-mono font-bold mb-3">REST &amp; WS</div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mb-1">Comfy &amp; Figma API</h3>
            <p className="text-xs font-mono text-gray-400 leading-relaxed">Stream generation frames directly to production pipelines via low-latency WebSocket connections.</p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TechSpecs
