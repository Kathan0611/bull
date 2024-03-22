// const sendErrorDev = (err, req, res) => {
//  res.status(err.statusCode).json({
//    status: err.status,
//    message: err.message,
//    error: err,
//    stack: err.stack,
//  });



// }
const handleJWTError=err=>{
 console.log('Invalid token,please log in again', 401)
}
const handleJWTExpiredError=err=>{
  console.log('you token has expired, please log in again', 401)
  
}
// const sendErrorProd = (err, req, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {

//     if(err.isOperational){

//         console.error("Error", err);
//         res.status(500).json({
//           status: "error",
//           message: "something went wrong",
//         });
//       }
//       else{
//         console.error("Error", err);
//         res.status(500).json({
//           status: "error",
//           message: "something went wrong",
//         });
      
//       }
//     }
// };
module.exports =(err,req,res,next)=>{
    console.log(err.stack)
    err.statusCode =err.statusCode || 500;
    err.status =err.status || 'error'
  if(err.name==="JsonWebTokenError") err=handleJWTError();
  if(err.name==="TokenExpiredError") err =handleJWTExpiredError();
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message
    })
  }