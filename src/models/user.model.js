import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const UserSchema = new Schema({
    userName:{
        type : String,
        required :  true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required :  true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName:{
        type : String,
        required :  true,
        trim : true,
        index : true
    },
    avatar:{
        type : String, //cloudinary url
        required :  true,
    },
    coverImage:{
        type : String,
    },
    watchHistory:[{   //it's an array, for this we will use mongoose-aggregate-paginate
        type : Schema.Types.ObjectId,
        ref :"Video"
    }],
    password:{
        type : String,
        required: [true, 'Password is requuired']
    },
    refreshtoken:{
        type: String,
    }
}, {timestamps:true})

//it will save by default whenever user save but we only want to hash only save password
// if(this.isModified("password"))
UserSchema.pre("save", async function(next){
    if(this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)  //10 rounds
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)  //this.password is encrypted password
}

UserSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

UserSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", UserSchema)