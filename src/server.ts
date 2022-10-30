import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/User'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(morgan('dev')) // Comment out to remove request logging

app.get('/', (req, res) => {
  res.json({ msg: 'hello backend 🐀🐀🐀' })
})

// controllers
app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`is that port ${PORT} I hear? 🐀`)
})