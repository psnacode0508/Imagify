import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

// Only authenticated users can generate images
imageRouter.post('/generate-image', userAuth, generateImage)

export default imageRouter