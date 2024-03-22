const Review=require('../model/reviewModel');
const catchAsync=require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory');
// exports.getAllReviews=catchAsync(async(req,res,next)=>{
//   const reviews=await Review.find();
//   const filter ={}
//   if(req.params.tourId) filter.tour=req.params.tourId;
//   console.log(reviews)

//     res.status(200).json({
//         status:'success',
//         result:reviews.length,
//          data:{
//             reviews
//          }
//     })
// })

exports.sendTour=catchAsync(async(req,res,next)=>{
    if(!req.body.tour) req.body.tour=req.params.tourId;
    if(!req.body.user) req.body.user=req.user.id;
    
    next();
})
//     const newReview= await new Review(req.body);
    
// //    console.log(newReview)
//       await newReview.save()
//     res.status(201).json({
//         status:'success',
//         data:{
//             review:newReview
//         }
//     })
// })
exports.getReview=handlerFactory.getOne(Review)
exports.getAllReviews=handlerFactory.getAll(Review)
exports.createReview=handlerFactory.CreateOne(Review)
exports.UpdateReview=handlerFactory.UpdateOne(Review)
exports.deleteReview =handlerFactory.deleteOne(Review)