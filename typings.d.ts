import { ObjectId } from "mongoose"

export interface ScoreType {
  game: string
  score: number
}

export interface UserType {
  name: string
  username: string
  email: string
  password: string
  scores: ScoreType[]
}