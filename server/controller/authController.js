
import util from 'node:util'
import UserModel from '../models/userModel.js'
import jwt from "jsonwebtoken"
import { log } from 'node:console'

function sendToken(id) {
    return jwt.sign({ id }, process.env.SECRET_JWT, {
        expiresIn: process.env.EXPIRE_JWT
    })
}

export async function protect(req, res, next) {
    console.log(req.headers);
    try {
        let token
        if (req.headers.authorization && req.get("authorization").startsWith("Bearer"))
            token = req.get("authorization").split(" ")[1]

        if (!token) next("Token invalid")

        const decoded = await util.promisify(jwt.verify)(token, process.env.SECRET_JWT)
        console.log(decoded);
        const user = await UserModel.findById(decoded.id)

        if (!user) next("user is not found")

        req.user = user
        next()
    } catch (error) {
        next(error.message)
    }
}

export async function login(req, res, next) {
    const { email, password } = req.body

    if (!email || !password) next("password and email are required")

    const user = await UserModel.findOne({ email }).select("password")

    if (!user || !user.correctPasword(password, user.password)) next("The user is not found")
    const jwt = sendToken(user.id)
    res.status(200).json({
        status: "succes",
        user,
        jwt
    })
}

export async function register(req, res, next) {

    try {
        const user = await UserModel.create(req.body)
        const jwt = sendToken(user.id)
        res.status(200).json({
            status: "succes",
            user,
            jwt
        })
    } catch (error) {
        next(error.message)
    }
}

export function getUser(req,res){
    res.status(200).json({
        user:req.user
    })
}