// const express = require('express')
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose'
import { UserType } from '../../typings';
import User, { UserModel } from '../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authLockedRoute from '../routes/authLockedRoute'


// testing createUser (works but no auth)
// const createUser = (req: Request, res: Response, next: NextFunction) => {
//   const { name, username, email, password } = req.body

//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name,
//     username,
//     email,
//     password
//   })

//   return user
//     .save()
//     .then((result: any) => res.status(201).json({ result }))
//     .catch((error: any) => res.status(500).json({ error }))
// }

// creates a new user in db with hashedpassword and jwt token
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email, password } = req.body

    const findUser = await User.findOne({
      email: email
    })
  
    if (findUser) return res.status(400).json({msg: 'email exists already, please login'})
  
    // hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    
  
    // creates new user
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      username,
      email,
      password: hashedPassword
    })
  
    await user.save()

    // create jwt payload
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id
    }
  
    const token = await jwt.sign(payload, process.env.JWT_SECRET)
  
    res.json(token)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'server error'})
  }
}


const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  return User
    .findById(userId)
    .then((result) => (result ? res.status(200).json({ result }) : res.status(404).json({message: 'Not Found'})))
    .catch(error => res.status(500).json({ error }))
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  console.log('Getting all users for ' + User.name)

  return User.find<any>()
    .then((results: any) => res.status(200).json({ results }))
    .catch((error: any) => res.status(500).json({ error }))
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  return User
    .findById({ userId })
    .then((user) => {
      if(user) {
        user.set(req.body)

        return user
          .save()
          .then(result => res.status(200).json({ result }))
          .catch(error => res.status(500).json({ error }))
      } else {
        return res.status(404).json({ message: 'not found' })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

const addScore = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId 

  return User
  .findById(userId)
  .then((user) => {
    if(user) {
      user.scores.push({ game: req.body.game, score: req.body.score })

      return user
        .save()
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(500).json({ error }))
    } else {
      return res.status(404).json({ message: 'not found' })
    }
  })
  .catch(error => res.status(500).json({ error }))
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User
    .findByIdAndDelete(userId)
    .then((user) => {(
      user ?
        res.status(201).json({ user, message: 'Deleted' })
        :
        res.status(404).json({ message: 'not found'
      }))
    })
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  addScore
}




// // POST /users/login -- validate login credentials
// router.post('/login', async (req: any, res: any) => {
//   try {
//     // try to find user in the db
//     const foundUser = await db.User.findOne({
//       email: req.body.email
//     })

//     const noLoginMessage = 'Incorrect username or password'

//     // if the user is not found in the db, return and sent a status of 400 with a message
//     if(!foundUser) return res.status(400).json({ msg: noLoginMessage })

//     // check the password from the req body against the password in the database
//     const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)

//     // if provided password does not match, return an send a status of 400 with a message
//     if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

//     // create jwt payload
//     const payload = {
//       name: foundUser.name,
//       email: foundUser.email,
//       id: foundUser.id
//     }

//     // sign jwt and send back
//     const token = await jwt.sign(payload, process.env.JWT_SECRET)

//     res.json({ token })
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({ msg: 'server error'  })
//   }
// })


// // GET /auth-locked - will redirect if bad jwt token is found
// router.get('/auth-locked', authLockedRoute, (req: any, res: any) => {
//   res.json( { msg: 'welcome to the private route!' })
// })

// module.exports = router