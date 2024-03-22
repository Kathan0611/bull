const mongoose= require('mongoose');
const crypto =require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
   name:{
    type:String,
    require:[true,'A user must have a name']
},    
   email:{
    type:String,
    require:[true,'A user must have a email'],
    unique:true,
    lowercase:true,
    validator:[
        validator.isEmail,
        'please provide a valid email'
    ]

   },
   photo:String,
   role:{
    type:String,
    enum:['user','guide','lead-guide','admin'], 
    default:'user'
   },
   password:{
    type:String,
    require:[true,'A user must have a password'],
    minlength:4,
    select:false
   },
   passwordConfirm:{
    type:String,
    require:[true,'A please confirm your a password'],
    minlength:4,
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
   }
});

userSchema.pre('save',async function(next){
    // console.log('****')
    if(!this.isModified('password')) return next();
    
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
})

userSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');

    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
}
const Users=mongoose.model('User',userSchema);

module.exports=Users                                                                 ;