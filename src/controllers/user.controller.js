import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessAndRefreshToken = async(userId)=>{
  try {
    const user = await User.findById(userId);
    const refreshToken = User.generateAccessToken()
    const accessToken = User.generateAccessToken();
    user.refreshtoken = refreshToken;
    await user.save({validateBeforeSave:false});
    return {refreshToken, accessToken};
  } catch (error) {
    throw new ApiError(500, "Something went wrong not able to generate access token adn refresh token");
  }
}


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
  const {fullName, email, userName, password}=req.body
  // if(fullname===""){
  //   throw new ApiError(400, "fullname is required");
  // }
  if([fullName, email, userName, password].some((field)=>field?.trim === "")){
    throw new ApiError(400, "all fields are required");
  }
  // if ([fullname, email, userName, password].some((field) => !field || field.trim() === "")) {
  //   throw new ApiError(400, "All fields are required");
  // }
  
  const ExistingUSer = await User.findOne({
    $or : [{ userName }, { email }]
  })

  if(ExistingUSer){
    throw new ApiError(409, "UserName already exists")
  }
  console.log("BODY >>>", req.body);
  console.log("FILES >>>", req.files);
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
    fullName,  // or fullName consistently everywhere
    avatar: avatar.url,
    coverImage: coverImage?.url,
    email,
    password,
    userName
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

const loginUSer = asyncHandler(async(req, res)=>{
  // Steps-----------------------
  // req body --> what data is coming
  // check based on username or email
  // password check
  // After password checking generate access token and refresh token
  // send token in secure cookies
  const { userName, email, password } = req.body

  if(!userName || !email){
    throw new ApiError(400, 'userName or Emaill is required.')
  }

  const userExist = await User.findOne({
    $or : [{ userName }, { email }]
  })
  if(!userExist){
    throw new ApiError(404, "user not found")
  }
  const isPassWordValiid = await userExist.isPasswordCorrect(password);
  if(!isPassWordValiid){
    throw new ApiError(401, "Invalid user credentials");
  }
})

export{
  registerUser,
}