// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express"
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"; 

//it's a way to make consistency of environment file

dotenv.config({
    path:'./env'
})



connectDB().then(()=>{
    app.listen(process.env.PORT || 80)
}
)
.catch((err)=>{
    console.log("mongo DB connection error>>>>>>>> ", err)
})

// This is 1st approach to connect database in index file

// const app = express();
// // better to apply ifi method 

// ;(async()=>{
//     try{
//         await mongoose.connect(`${process?.env?.MONGODB_URL}/${DB_NAME}`) //database name and url to connect database server
//         app.on("error", (error)=>{
//             console.log("Error: ", error)
//             throw error
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on ${process.env.PORT}`)
//         })
//     }
//     catch(error){
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()