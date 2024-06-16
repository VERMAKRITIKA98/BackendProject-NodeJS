import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";//will give error if not specify the file extension



const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host ${connectionInstance?.connection?.host}`)  //to know connection host
        console.log('aaa>>>>>>>>>', connectionInstance);
    }
    catch(error){
        console.log("MongoDB connection failed", error)
         process.exit(1)
    }
}

export default connectDB