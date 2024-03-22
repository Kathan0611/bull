const User =require('./../model/userModel');
const catchAsync =require('./../utils/catchAsync')
const handlerFactory = require('./handlerFactory');
  
  // exports.getAllUsers = async (req, res) => {
  //   const users =await User.find();
  //   console.log(users)
  //   res.status(200).json({
  //     status: "sucess",
  //     results:users.length,
  //     data:{
  //       users
  //     }
  //   });
  // };

  exports.getMe =(req,res,next)=>{
    req.params.id=req.user.id;
    console.log(req.user.id)
    next();
  }
  exports.getUser = handlerFactory.getOne(User)
  
  // exports.createUser = (req, res) => {
  //   res.status(200).json({
  //     status: "error",
  //     message: "This route is not yet defined",
  //   });
  // };
  exports.getAllUsers=handlerFactory.getAll(User)
  exports.createUser=handlerFactory.CreateOne(User)
  exports.updateUser =handlerFactory.UpdateOne(User)
  
  exports.deleteUser =handlerFactory.deleteOne(User)