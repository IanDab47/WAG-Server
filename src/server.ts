import express from 'express'
import morgan from 'morgan'
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(morgan('dev')) // Comment out to remove request logging

app.get('/', (req, res) => {
  res.json({ msg: 'hello backend 🐀🐀🐀' })
})

// controllers
app.use('/api-v1/users', require('./controllers/api-v1/users.js'))

app.listen(PORT, () => {
  console.log(`is that port ${PORT} I hear? 🐀`)
})