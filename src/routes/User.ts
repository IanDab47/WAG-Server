import express from 'express'
import controller from '../controllers/users'
import model from '../models/User'
// import { Schemas, ValidateJoi } from '../middleware/joi'

const router = express.Router()

router.post('/create', controller.createUser(model))
router.get('/:userId', controller.getUser(model))
router.get('/', controller.getAllUsers(model))
router.patch('/:userId', controller.updateUser(model))
router.delete('/:userId', controller.deleteUser(model))

export default router