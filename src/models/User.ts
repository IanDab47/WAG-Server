// require mongoose ODM
import { number, string } from 'joi'
import mongoose, { Document, Schema } from 'mongoose'
import { UserType, ScoreType } from '../../typings'

export interface ScoreModel extends ScoreType, Document {}
export interface UserModel extends UserType, Document {}

const ScoreSchema: Schema = new Schema({
  game: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

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
  scores: [ScoreSchema]
  }, {
  timestamps: true,
})

export default mongoose.model<UserModel>('User', UserSchema)