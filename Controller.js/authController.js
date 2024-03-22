const util=require('util');
const User=require('./../model/userModel');
const AppError = require('./../utils/appError');
// const sendEmail = require('./../utils/email');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})

const signToken=(id,role)=>{
    return jwt.sign({id, role:role},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
exports.signup=async(req,res,next)=>{
 const newUser = await new User({...req.body});

    const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET,{

        expiresIn:process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
    status:"success",
    token,
    data:{
        user:newUser
    }
    })
    await newUser.save();
}

exports.login=async(req,res,next)=>{
    const {email,password}=req.body;
     if(!email || !password){
        return next(new AppError('please provide email and password',400))
     }

    const user=await User.findOne({email:email}).select('+password')
    if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401))
    }
    // console.log(user.id)
    const token= jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
     res.status(200).json({
        status:"success",
        token
     })
}

exports.protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
        // console.log(token)
    }

    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access',401))
    }
     const verifyAsync = util.promisify(jwt.verify);
     const decoded = await verifyAsync(token,process.env.JWT_SECRET)
     const freshUser=await User.findById(decoded.id);
    //  console.log(freshUser,'freshUser')
     if(!freshUser){
        return next(new AppError('The user belonging to this token does no longer exist',401))
     }
     req.user=freshUser;
    //  console.log(req.user.id)
    next();
}


exports.restrictTo=(...roles)=>{
  return (req,res,next)=>{
    console.log(req.user.role,'kkkkk')
    if(!roles.includes('admin,user')){
        return next(new AppError('You do not have permission to perform this action',403))
    }
    next();
  }
}

exports.forgotPassword =async(req,res,next)=>{
    const user =await User.findOne({email:req.body.email});
    console.log(user)
    if(!user){
        return next(new AppError('There is no user with email address',404))
    }

    const resetToken=user.createPasswordResetToken();
    // console.log(resetToken,'resetToken')
    await user.save({validateBeforeSave:false})

    const resetURL=`${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
  
    const message=`Forgot your password? Submit a patch request with your new password and passwordConfirm to:${resetURL}.\nIf you didn't forget your password, please ignore this email!`
    try{
        await sendEmail({
            email:user.email,
            subject:'Your password reset token (valid for 10 min)',
        })
        
        res.status(200).json({
            status:'success',
            message:'Token sent to email!'
        })
    }
    catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save({validateBeforeSave:false})

        return next(new AppError('There was an error sending the email. Try again later!',500))
    }
   
}