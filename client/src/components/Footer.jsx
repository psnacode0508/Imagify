import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black py-12 text-xs font-mono text-gray-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-gray-300">ALL CLUSTERS OPERATIONAL (99.99%)</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#console" className="hover:text-cyber-cyan transition-colors">API Docs</a>
          <a href="#showcase" className="hover:text-cyber-cyan transition-colors">Discord Synth Guild</a>
          <a href="#specs" className="hover:text-cyber-cyan transition-colors">Safety Ethics</a>
          <a href="#specs" className="hover:text-cyber-cyan transition-colors">Model Checkpoints</a>
        </div>

        <div>
          <span>IMAGIFY STUDIO // 2026</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
