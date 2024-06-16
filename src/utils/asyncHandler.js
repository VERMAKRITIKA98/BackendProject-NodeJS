const asyncHandler =(requestHandler) =>{
    (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}

export {asyncHandler}



//higher order function , next for middleware
// const asyncHandler = (fn) => async(req, res, next)=>{
//     try{
//         await fn(req, res, next) //making a wrapper function which we use everywhere
//     }catch(error){
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }