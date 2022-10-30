import { ObjectId } from "mongoose"

export interface UserType {
  name: string
  username: string
  email: string
  password: string
  scores: Array<number>
}