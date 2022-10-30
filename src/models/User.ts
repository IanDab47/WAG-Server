// require mongoose ODM
import mongoose, { Document, Schema } from 'mongoose'
import { UserType } from '../../typings'

export interface UserModel extends UserType, Document{}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  scores: {
    type: [Number]
  }
}, {
  timestamps: true
})

export default mongoose.model<UserModel>('User', UserSchema)