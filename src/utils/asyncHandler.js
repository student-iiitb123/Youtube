const asyncHandler = (requestHandler) => {
   return  (req,res,next) => {
           // function is return a Promise 
           Promise.resolve(requestHandler(req,res,next)).catch((err) => {
            next(err)
           })
}


}

export {asyncHandler}