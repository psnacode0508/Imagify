import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const { user, setShowLogin, backendUrl, token, loadCreditsData } = useContext(AppContext)

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'IMAGIFY CYBER MATRIX',
      description: 'Synthesis Token Allocation Credits',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            response,
            { headers: { token } }
          )
          if (data.success) {
            loadCreditsData()
            toast.success('TRANSACTION VERIFIED // SYNTHS REPLENISHED')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      },
      theme: { color: '#00F0FF' }
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } else {
      toast.error('Razorpay SDK failed to mount')
    }
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      )

      if (data.success) {
        if (data.isMock) {
          toast.info('SIMULATING DEV TRANSACTION...')
          setTimeout(async () => {
            const verifyRes = await axios.post(
              `${backendUrl}/api/user/verify-razor`,
              { razorpay_order_id: data.order.id, receiptId: data.order.receipt },
              { headers: { token } }
            )
            if (verifyRes.data.success) {
              loadCreditsData()
              toast.success('TEST PURCHASE COMPLETE // SYNTHS REPLENISHED')
            }
          }, 800)
        } else {
          initPay(data.order)
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex-grow py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="text-xs font-mono uppercase text-cyber-cyan tracking-wider mb-2">SYNTHESIS ALLOCATION</div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white">Fuel Your Imagination</h1>
        <p className="text-sm font-mono text-gray-400 mt-2">Scale instantly from prototype sandbox to high-throughput GPU cluster.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Basic Plan */}
        <div className="p-8 rounded-3xl cyber-glass border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-gray-400">Tier // Basic</span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-white">$10</span>
              <span className="text-xs font-mono text-gray-500">/ 100 Synths</span>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-3">Starter allocation for exploratory cyber synthesis.</p>
            <ul className="mt-8 space-y-3 text-xs font-mono text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-cyber-cyan">✦</span>
                <span>100 Fast Neural Generations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-cyan">✦</span>
                <span>Standard Latency Node</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-cyan">✦</span>
                <span>Full Personal License</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={() => paymentRazorpay('Basic')}
            className="mt-8 w-full py-3 rounded-xl border border-white/20 hover:border-cyber-cyan font-mono text-xs uppercase font-bold text-white transition-colors"
          >
            Acquire Basic Matrix
          </button>
        </div>

        {/* Advanced Plan */}
        <div className="p-8 rounded-3xl cyber-glass rainbow-border flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,240,255,0.15)] scale-105 bg-black/90">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyber-cyan text-black font-mono font-bold text-[10px] uppercase tracking-wider">
            Most Deployed
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-cyber-cyan font-bold">Tier // Advanced</span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-white">$50</span>
              <span className="text-xs font-mono text-gray-400">/ 500 Synths</span>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-3">High-frequency generation with priority GPU compute.</p>
            <ul className="mt-8 space-y-3 text-xs font-mono text-gray-200">
              <li className="flex items-center gap-2">
                <span className="text-cyber-lime">✦</span>
                <span className="text-white font-bold">500 Turbo Fast Synths</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-lime">✦</span>
                <span>8K Latent Upscaling</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-lime">✦</span>
                <span>Commercial Synthesis Rights</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={() => paymentRazorpay('Advanced')}
            className="mt-8 w-full py-3 rounded-xl bg-cyber-cyan hover:bg-cyber-lime text-black font-mono text-xs uppercase font-bold tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            Deploy Advanced ✦
          </button>
        </div>

        {/* Business Plan */}
        <div className="p-8 rounded-3xl cyber-glass border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-gray-400">Tier // Business</span>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-display font-bold text-white">$250</span>
              <span className="text-xs font-mono text-gray-500">/ 5,000 Synths</span>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-3">Enterprise throughput with dedicated SLA clusters.</p>
            <ul className="mt-8 space-y-3 text-xs font-mono text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-cyber-magenta">✦</span>
                <span>5,000 High-Throughput Synths</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-magenta">✦</span>
                <span>Custom LoRA Weights</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyber-magenta">✦</span>
                <span>24/7 Dedicated Support Node</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={() => paymentRazorpay('Business')}
            className="mt-8 w-full py-3 rounded-xl border border-white/20 hover:border-cyber-cyan font-mono text-xs uppercase font-bold text-white transition-colors"
          >
            Authorize Business Node
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyCredit
