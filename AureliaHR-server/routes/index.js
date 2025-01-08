import express from 'express'
import  userRouters from './userRouters'
import taskRouters from './taskRoutes'

const router = express.Router()

router.use("/user", userRouters)
router.use('/task', taskRouters)

export default router