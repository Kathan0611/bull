const fs = require("fs");
const Tours = require("../model/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const handlerFactory = require('./handlerFactory');
const express =require('express');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tour.json`));
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sendEmail = require("../nodemailer");
const { query } = require("express");
const { nextTick } = require("process");




// exports.getAllTours = async (req, res) => {
//   try {
//     const page = req.query.page * 1 || 1;

//     const limit = req.query.limit * 1 || 4;
//       console.log(page, limit)
//     const skip = (page - 1) * limit;
//     const query = await Tours.find().limit(limit).skip(skip);
//        console.log(query)
//     res.status(200).json({
//       status: "sucess",
//       data: {
//         tours: query,
//       },
//     });
//   } catch (err) {
//     // console.log(err);
//     res.status(404).json({
//       status: "fail",
//       message: "not found",
//     });
//   }
// };
exports.getAllTours=handlerFactory.getAll(Tours)
exports.createTour =handlerFactory.CreateOne(Tours);
// // exports.createTour = catchAsync(async (req, res) => {
// //   const newTour = await new Tours(req.body);
// //   newTour.save();
// //   await sendEmail("sachin@yopmail.com", "vdshdshbdbzcnciwuhfuhhfuahc");

// //   res.status(201).json({
// //     status: "Success",
// //     data: {
// //       tour: newTour,
// //     },
// //   });
// // });
exports.singleTour=handlerFactory.getOne(Tours)
// // exports.singleTour = catchAsync(async (req, res, next) => {
// //   const { id } = req.params;
// //   const findTour = await Tours.findById(id).populate('reviews');
// //   console.log(findTour)
// //   if (!findTour) {
// //     return next(new AppError("no tour found with that id", 404));
// //   }
// //   res.status(200).json({
// //     findTour,
// //   });
// // });

exports.UpdateTour = handlerFactory.UpdateOne(Tours)
// // exports.UpdateTour = catchAsync(async (req, res) => {
// //   const { id } = req.params;
// //   const updateTour = await Tours.findByIdAndUpdate(id, req.body, { new: true });

// //   // console.log(tour.name=req.body.name)
// //   // console.log(tour)
// //   res.status(200).json({
// //     status: "sucess",
// //     data: {
// //       tour: updateTour,
// //     },
// //   });
// // });
// exports.getTourWithin = catchAsync(async(req,res,next)=>{
//   const {distance, latlng, unit}=req.params;
//   const [lat,lng]=latlng.split(',');
//   const radius=unit==='mi'?distance/3963.2:distance/6378.1;
//   // console.log(radius)
//   if(!lat || !lng){
//     next(new AppError('please provide latitude and longitude in the format lat,lng',400))
//   }
//   //  const tours = new Tours({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}})
//   const tours=await Tours.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}})
//   console.log(tours)
//   res.status(200).json({
//     status:'sucess',
//     result:tours.length,
//     data:{
//       data:tours
//     }
//   })
// })

// exports.getDistances=catchAsync(async(req,res,next)=>{
//   const {distance, latlng, unit}=req.params;
//   const [lat,lng]=latlng.split(',');
//   const radius=unit==='mi'?distance/3963.2:distance/6378.1;
//   // console.log(radius)
//   if(!lat || !lng){
//     next(new AppError('please provide latitude and longitude in the format lat,lng',400))
//   }

//   //  const tours = new Tours({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}})
//   // const tours=await Tours.find({startLocation:{$geoWithin:{$centerSphere:[[lng,lat],radius]}}})
//   // console.log(tours)
//   const distances=await Tours.aggregate([{

//     $geoNear:{
//       near:{
//         type:'Point',
//         coordinates:[lng*1,lat*1]
//       },
//       distanceField:'distance',
//       distanceMultiplier:0.001
//     },
   
//   }])
//   res.status(200).json({
//     status:'sucess',
//     result:tours.length,
//     data:{
//       data:tours
//     }
//   })
// })

exports.deleteTour =handlerFactory.deleteOne(Tours)
// exports.deleteTour = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const tour = await Tours.findByIdAndDelete(id);
//   res.status(204).json({
//     status: "sucess",
//     data: tour,
//   });
// });

// Tours.findOne({name:'The Northern Lights'}).populate('reviews')


// mongoose.connect(`mongodb+srv://adalajakathan06:9tp2nSRob4r6bte8@cluster0.7ydagn2.mongodb.net/Narutos?retryWrites=true`,{
//   useNewUrlParser:true,
//   useCreateIndex:true,
//   useFindAndModify:false,
//   useUnifiedTopology:true,
//   maxIdleTimeMS:100000
//  })
// .then((con)=>console.log('DB connection successful'))
//  .catch(err=>console.log(err));

// const importData =async(req,res)=>{
//   try{
//      await new Tours (tours)
//     console.log("data imported")
//     res.json({
//       status: "sucess",
//       message: "data imported",
//     });
//   }
//   catch(err){
//     console.log(err)
//     // res.status(404).json({
//     //   status: "fail",
//     //   message: "not imported",
//     // });
//   }
// }

// const deleteData =async(req,res)=>{
//   try{
//     await Tours.deleteMany()
//     console.log("data deleted")
//     // res.json({
//     //   status: "sucess",
//     //   message: "data deleted",
//     // });
//   }
//   catch(err){
//     console.log(err)
//   }
// }
// console.log(process.argv)

// if(process.argv[2]==="--import"){
//   importData();
// }
// else if(process.argv[2]==="--delete"){
//   deleteData();
// }
