import express, { Express, Request, Response } from 'express';
import http from 'http'
import mongoose from 'mongoose';
import userRoutes from './routes/User'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { config } from './config/config'


// May need to change line 5 in package.json back from
//    "main": "src/server.ts",
// to
//    "main": "dist/server.js",
// initial switch to "src/server.ts" was have 'nodemon' available instead of npm run start




dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('connected')
  })
  .catch(error => {
    console.log(error)
  })

app.use(express.urlencoded({ extended: true })) // from RESTFUL API IN-Depth 2022 video
app.use(express.json())
app.use(morgan('dev')) // Comment out to remove request logging

// API rules (from 16:48 in RESTFUL API IN-Depth 2022 video)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, UPDATE, DELETE, GET');
    return res.status(200).json({})
  }

  next()
})

app.get('/', (req, res) => {
  res.json({ msg: 'hello backend 🐀🐀🐀' })
})

// controllers
app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log(`is that port ${PORT} I hear? 🐀`)
})