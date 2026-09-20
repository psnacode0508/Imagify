// import React, { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import SettingsModal from './SettingsModal'

// const Navbar = () => {
//   const { user, setShowLogin, logout } = useContext(AppContext)
//   const [showSettings, setShowSettings] = useState(false)

//   return (
//     <>
//       <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
//         <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//           {/* Brand */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
//               ✦
//             </div>
//             <span className="font-mono font-bold tracking-wider text-white text-lg">
//               IMAGIFY
//             </span>
//           </Link>

//           {/* Auth / Profile Actions */}
//           <div>
//             {user ? (
//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-mono text-zinc-300">
//                   {user.name}
//                 </span>

//                 {/* Settings Button */}
//                 <button
//                   onClick={() => setShowSettings(true)}
//                   className="text-xs font-mono text-zinc-400 hover:text-cyan-400 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition"
//                   title="Account Settings"
//                 >
//                   Settings
//                 </button>

//                 <button
//                   onClick={logout}
//                   className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setShowLogin(true)}
//                 className="text-xs font-mono font-bold bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded transition"
//               >
//                 Login / Sign Up
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Settings Modal */}
//       <SettingsModal 
//         isOpen={showSettings} 
//         onClose={() => setShowSettings(false)} 
//       />
//     </>
//   )
// }

// export default Navbar
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import SettingsModal from './SettingsModal'

const Navbar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              ✦
            </div>
            <span className="font-mono font-bold tracking-wider text-white text-lg">
              IMAGIFY
            </span>
          </Link>

          {/* Auth / Profile Actions */}
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-zinc-300">
                  {user.name}
                </span>

                {/* Settings Button */}
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-xs font-mono text-zinc-400 hover:text-cyan-400 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition"
                  title="Account Settings"
                >
                  Settings
                </button>

                <button
                  onClick={logout}
                  className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-xs font-mono font-bold bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded transition"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  )
}

export default Navbar