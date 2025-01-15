import express from "express"
import { adminLogin, loginUser, RegisterUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/register', RegisterUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter