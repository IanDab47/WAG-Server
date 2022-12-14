import express from 'express'
import controller from '../controllers/users'
// import model from '../models/User'
import { Schemas, ValidateJoi } from '../middleware/joi'
import authLockedRoute from './authLockedRoute'

const router = express.Router()

router.post('/create', ValidateJoi(Schemas.user.create), controller.createUser)
router.post('/login', controller.loginUser)
router.get('/:userId', controller.getUser)
router.get('/', controller.getAllUsers)
router.patch('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser)
router.patch('/:userId/score', controller.addScore)
router.delete('/:userId', controller.deleteUser)

// auth-locked route example
router.get('/auth-locked', authLockedRoute, controller.lockingRouteExample)

export = router