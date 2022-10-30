// const express = require('express')
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose'
import { UserType } from '../../typings'
import User, { UserModel } from '../models/User';
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// const db = require('../../models')
// import authLockedRoute from './authLockedRoute'
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const authLockedRoute = require('./authLockedRoute')

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, username, email, password } = req.body

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    username,
    email,
    password
  })

  return user
    .save()
    .then((result: any) => res.status(201).json({ result }))
    .catch((error: any) => res.status(500).json({ error }))
}

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  return User
    .findById({ userId })
    .then(result => res.status(200).json({ result }))
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
  deleteUser
}

// GET /users - test endpoint
// router.get('/', (req: any, res: any) => {
//   res.json({ msg: 'welcome to the users endpoint' })
// })

// POST /users/register - CREATE new user
// router.post('/register', async (req: any, res: any) => {
//   try {
//     // check if user exists already
//     const findUser = await db.User.findOne({
//       email: req.body.email
//     })

//     // don't allow emails to register twice
//     if(findUser) return res.status(400).json({ msg: 'email exists already' })

//     // hash password
//     const password = req.body.password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds)

//     // create new user
//     const newUser = new db.User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })

//     await newUser.save()

//     // create jwt payload
//     const payload = {
//       name: newUser.name,
//       email: newUser.email,
//       id: newUser.id
//     }

//     // sign jwt and send back
//     const token = await jwt.sign(payload, process.env.JWT_SECRET)

//     res.json({ token })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: 'server error'  })
//   }
// })

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