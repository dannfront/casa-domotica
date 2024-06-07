import express from 'express'
import { getUser, login, protect, register } from '../controller/authController.js'

const routerAuth = express.Router()



routerAuth.post("/login",login)

routerAuth.post("/register",register)

routerAuth.get("/getUser",protect,getUser)


export default routerAuth