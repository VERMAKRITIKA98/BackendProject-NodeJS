import {asyncHandler} from '../utils/asyncHandler.js';


const registerUser = asyncHandler(async(req, res)=>{
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
  
  
  
  
  res.status(200).json({
    messsage: "ok"
  })  
})

export{
  registerUser,
}