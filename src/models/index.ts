// require mongoose package
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const devDB: string = 'mernAuth'
const MONGODB_URI: string = process.env.MONGODB_URI || `mongodb://127.0.0.1/${devDB}`

mongoose.connect(MONGODB_URI)

const db = mongoose.connection

// Connection methods
db.once('open', (): void => {
  console.log(`🔗 Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (err: any): void => {
  console.error(`🔥 Datacenter burned down:\n${err}`)
})

module.exports = {
  User: require('./User')
}