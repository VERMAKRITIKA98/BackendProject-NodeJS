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

//to store static file in server
app.use(express.static("public")) //public folder name

app.use(cookieParser())

export {app}