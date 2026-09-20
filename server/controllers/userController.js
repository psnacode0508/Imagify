import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Razorpay from 'razorpay'
import userModel from '../models/userModel.js'
import transactionModel from '../models/transactionModel.js'

// Razorpay Instance
let razorpayInstance = null
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && process.env.RAZORPAY_KEY_ID !== 'mock_razorpay_key_id') {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
}

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing required credentials' })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists with this email' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
      creditBalance: 5
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      token,
      user: { name: user.name }
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({ success: false, message: 'Email and password are required' })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({
      success: true,
      token,
      user: { name: user.name }
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Get User Credit Balance
export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body

    const user = await userModel.findById(userId)
    if (!user) {
      return res.json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name }
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Create Razorpay Payment Order
export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body

    const userData = await userModel.findById(userId)
    if (!userData || !planId) {
      return res.json({ success: false, message: 'Invalid transaction parameters' })
    }

    let credits, plan, amount
    switch (planId) {
      case 'Basic':
        plan = 'Basic'
        credits = 100
        amount = 10
        break
      case 'Advanced':
        plan = 'Advanced'
        credits = 500
        amount = 50
        break
      case 'Business':
        plan = 'Business'
        credits = 5000
        amount = 250
        break
      default:
        return res.json({ success: false, message: 'Plan not recognized' })
    }

    const date = Date.now()
    const transactionData = { userId, plan, amount, credits, date }
    const newTransaction = await transactionModel.create(transactionData)

    // Fallback Mock Order if keys are missing or development test
    if (!razorpayInstance || process.env.RAZORPAY_KEY_ID === 'mock_razorpay_key_id') {
      return res.json({
        success: true,
        isMock: true,
        order: {
          id: 'order_mock_' + Date.now(),
          amount: amount * 100,
          currency: 'INR',
          receipt: newTransaction._id.toString()
        }
      })
    }

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || 'INR',
      receipt: newTransaction._id.toString()
    }

    const order = await razorpayInstance.orders.create(options)
    res.json({ success: true, isMock: false, order })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Verify Razorpay Payment and Credit Allocation
export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body
    const receiptId = req.body.receiptId || req.body.receipt

    // Handle mock local test verification
    if (razorpay_order_id && razorpay_order_id.startsWith('order_mock_')) {
      let transactionData = null

      if (receiptId) {
        transactionData = await transactionModel.findById(receiptId)
      } else {
        // Fallback: look up the latest uncompleted transaction
        const userId = req.body.userId || req.user?.id
        transactionData = await transactionModel.findOne({ userId, payment: false }).sort({ date: -1 })
      }

      if (!transactionData) {
        return res.status(400).json({ success: false, message: 'Transaction record not found' })
      }
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already processed' })
      }

      const userData = await userModel.findById(transactionData.userId)
      if (!userData) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }

      const creditBalance = (userData.creditBalance || 0) + transactionData.credits

      await userModel.findByIdAndUpdate(userData._id, { creditBalance })
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

      return res.json({
        success: true,
        credits: creditBalance,
        message: 'Credits allocated successfully [DEV MODE]'
      })
    }

    if (!razorpayInstance) {
      return res.status(500).json({ success: false, message: 'Payment gateway unavailable' })
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt)
      if (transactionData.payment) {
        return res.json({ success: false, message: 'Payment already processed' })
      }

      const userData = await userModel.findById(transactionData.userId)
      const creditBalance = userData.creditBalance + transactionData.credits

      await userModel.findByIdAndUpdate(userData._id, { creditBalance })
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

      res.json({ success: true, credits: creditBalance, message: 'Credits allocated successfully' })
    } else {
      res.json({ success: false, message: 'Payment verification failed' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// Update User Name
export const updateProfile = async (req, res) => {
  try {
    const { name, userId } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name cannot be empty' })
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name: name.trim() },
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: { name: updatedUser.name }
    })
  } catch (error) {
    console.error('Update Profile Error:', error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}