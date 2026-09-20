import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('⚡ [DATABASE] MongoDB Atlas Cluster Connected Successfully')
    })
    mongoose.connection.on('error', (err) => {
      console.error('❌ [DATABASE ERROR]', err.message)
    })

    await mongoose.connect(process.env.MONGODB_URI)
  } catch (error) {
    console.error('❌ [DATABASE CONNECTION FAILED]', error.message)
  }
}

export default connectDB
