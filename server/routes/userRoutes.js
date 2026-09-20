import express from 'express'
import {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
  updateProfile
} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// Support both GET and POST for credits
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/credits', userAuth, userCredits)

userRouter.post('/pay-razor', userAuth, paymentRazorpay)
userRouter.post('/verify-razor', userAuth, verifyRazorpay)
userRouter.post('/update-profile', userAuth, updateProfile)

export default userRouter
