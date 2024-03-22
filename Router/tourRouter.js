const express =require('express');
const tourRouter=express.Router();
const tourController=require('../Controller.js/tourController');
const authController=require('../Controller.js/authController');
const reviewController=require('../Controller.js/reviewController');
const multer=require('multer');
const path =require('path');
express.static(`${__dirname}/public`);
// const reviewController =require('../Controller.js/reviewController');

// tourRouter.use('/',tourController)
// const app=require('app')
// dotenv.config({ path: "./config.env" });


// const multerStorage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     console.log(file,"dir")
//     cb(null,path.join(__dirname,'../Public/img'),function(err,success)
//   {
//       if(err){
//        throw err
//       }
//     })
//   },
//   filename:(req,file,cb)=>{
//     const name=`tour-${Date.now()}-${file.originalname}`;
//     cb(null,name,function(err,success)
//     {
//       if(err){
//         throw err
//       }
//     })
//   }

// })

// const upload =multer({storage:multerStorage})

// tourRouter.post('/create-store',upload.single('logo'),tourController.createTour)
// const reviewRouter=require('./reviewRouter');
// tourRouter.use('/:tourId/reviews',reviewRouter);
// tourRouter.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// tourRouter.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getTourWithin);
tourRouter.route("/").get(authController.protect,tourController.getAllTours).post(tourController.createTour)
  tourRouter.route("/:id")
  .get(tourController.singleTour)
  .patch(tourController.UpdateTour)
  .delete(authController.protect,authController.restrictTo('admin','user'),tourController.deleteTour);
  tourRouter.route('/:tourId/reviews')
  .post(authController.protect,authController.restrictTo('user'),reviewController.createReview)



module.exports=tourRouter;