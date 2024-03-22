const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const dotenv =require('dotenv');
const mongoose=require('mongoose');
const AppError = require('./utils/appError'); 
const sendEmail =require('./nodemailer')
const golbalErrorHandler = require('./Controller.js/errorController');
const path =require('path');
const ejs =require('ejs');
// const userRouter=express.Router();
dotenv.config({path:'./config.env'});
const tourRouter=require('./Router/tourRouter');
const userRouter=require('./Router/UserRouter');
const reviewRouter=require('./Router/reviewRouter');
app.use(express.json());
app.use(morgan("dev"));

app.set('view engine','ejs');

// app.set('views',`${__dirname}\views`);
// console.log(path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'views')));
app.get('/',(req,res)=>{
  res.status(200).render('home',{
    tour:'The Forest Hiker',
    user:'Sachin'
  });
});

// app.get('/overview',(req,res)=>{
//   res.status(200).render('overview',{
//     title:'All Tours'
//   });
// });

// app.get('/tour',(req,res)=>{
//   res.status(200).render('tour',{
//     title:'The Forest Hiker'
//   });
// })

app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/reviews',reviewRouter);


app.use((req,res,next)=>{
  console.log(req.headers)
  
  console.log('hello from the middleware')
  next();
})
app.get('/', (req, res) => { 

	// The render method takes the name of the HTML 
	// page to be rendered as input. 
	// This page should be in views folder in 
	// the root directory. 
	// We can pass multiple properties and values 
	// as an object, here we are passing the only name 
	res.render('home', { name: 'Akashdeep' }); 
}); 

// const server = app.listen(4000, function () { 
// 	console.log('listening to port 4000') 
// });


app.all('*',(req,res,next)=>{
  // const err =new Error(`Cannot find ${req.originalUrl} on this server`);
  // err.status='fail';
  // err.statusCode=404;
  next(new AppError(`Cannot find ${req.originalUrl} on this server`,404));
});

app.use(golbalErrorHandler);
const DB =process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,
  useUnifiedTopology:true
})
.then((con)=>console.log('DB connection successful'))
.catch(err=>console.log(err));


app.listen(process.env.port, () => {
  console.log(`server running in port ${process.env.port} `);
});

