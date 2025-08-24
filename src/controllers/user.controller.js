import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async(req, res)=>{
  // -----steps to follow-------------
  // get user details from frontend
  // validation - not empty, password email
  // check if user already exists
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - crate entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response


  // if data coming from a form or object can find from req.body
  const {fullname, email, username, password}=req.body
  console.log("email: ", email)
  // if(fullname===""){
  //   throw new ApiError(400, "fullname is required");
  // }
  if([fullname, email, username, password].some((field)=>field?.trim === "")){
    throw new ApiError(400, "all fields are required");
  }
  const ExistingUSer = User.findOne({
    $or : [{ userName }, { email }]
  })

  if(ExistingUSer){
    throw new ApiError(409, "UserName already exists")
  }

  const avatarLocalPath = req.files?.avatar[0].path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage : coverImage.url,
    email,
    password,
    username : username.toLowerCase()    
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  )
  if(!createdUser){
    throw new ApiError(500, "User doesn't get registered");
  }
  res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered successfully.")
  )
  // res.status(200).json({
  //   messsage: "ok"
  // })  
})

export{
  registerUser,
}