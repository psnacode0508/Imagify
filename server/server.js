import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

// Initialize Express App
const app = express()
const PORT = process.env.PORT || 4000

// Connect Database
await connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

// Healthcheck Route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'IMAGIFY CYBER CLUSTER API ONLINE // v3.4 TURBO' })
})

// Listen
app.listen(PORT, () => {
  console.log(`⚡ [SERVER] Cyber Diffusion Matrix Running on Port ${PORT}`)
})
