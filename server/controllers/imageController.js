import axios from 'axios'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body
    const userId = req.body.userId

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Please enter a prompt' })
    }

    const user = await userModel.findById(userId)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' })
    }

    // Call Clipdrop API directly
    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    )

    const base64Image = Buffer.from(data, 'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    return res.json({
      success: true,
      message: 'Image generated successfully',
      resultImage,
    })
  } catch (error) {
    console.error('Generation Error:', error.message)
    return res.status(500).json({ success: false, message: error.message })
  }
}