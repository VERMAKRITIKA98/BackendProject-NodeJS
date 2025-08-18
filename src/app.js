import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express()

app.use(cors(           //for security we use middleware
    {
        origin: process.env.CORS_ORIGIN,
        credentials : true
    }
))

//middleware
app.use(express.json({limit:"16kb"}))

//for url encoder
app.use(express.urlencoded({extended: true, limit : "16kb"})) //extended for creating nested object in level

//to store static file in server - it will store all the static files inside the public store
app.use(express.static("public")) //public folder name

// to access and store the cookies of user  -----generally no need of it.
app.use(cookieParser())

export {app}