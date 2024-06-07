import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name must be mandatory"],
        minLength:4
    },
    email:{
        type:String,
        unique:true,
        required:[true,"the email must be mandatory"]
    },
    password:{
        type:String,
        required:[true,"the email must be mandatory"],
        minLength:6
    }
})

userSchema.pre("save",async function(){
    const saltRounds=10
    const passHash=await bcrypt.hash(this.password,saltRounds)
    this.password=passHash
})

userSchema.methods.correctPasword=async function(password,passwordDB){
    return await bcrypt.compare(password,passwordDB)
}

const UserModel=mongoose.model("User",userSchema)


export default UserModel