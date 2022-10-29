// require mongoose ODM
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)