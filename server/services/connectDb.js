import mongoose from "mongoose";
async function connectDb(url){
    try {
        await mongoose.connect(url)
        console.log("conectado a la base de datos");
    } catch (error) {
        console.log("error al conectarse a la base de datos");
        
    }
}

export default connectDb