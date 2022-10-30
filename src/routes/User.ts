import express from 'express'
import controller from '../controllers/users'
// import model from '../models/User'
import { Schemas, ValidateJoi } from '../middleware/joi'

const router = express.Router()

router.post('/create', ValidateJoi(Schemas.user.create), controller.createUser)
router.get('/:userId', controller.getUser)
router.get('/', controller.getAllUsers)
router.patch('/:userId', ValidateJoi(Schemas.user.update), controller.updateUser)
router.delete('/:userId', controller.deleteUser)

export default router