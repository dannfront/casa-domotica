import app from "./app.js";
import mongoose from "mongoose";
import dontenv from "dotenv"
import connectDb from "./services/connectDb.js";
dontenv.config()

connectDb(process.env.CONNECTION_DB)

const port=3000
app.listen(port,"localhost",()=>{
    console.log("servidor encendido");
})