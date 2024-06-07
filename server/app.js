import express from "express"
import routerAuth from "./routes/authRoute.js"
const app=express()

app.use(express.json()) //middleware para que express pueda entender json

app.use("/api/v1/casa-domotica",routerAuth)

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
    next()
})

export default app