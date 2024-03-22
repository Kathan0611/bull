const experss =require('express');
const reviewController =require('../Controller.js/reviewController');
const authController=require('../Controller.js/authController')
// const sendTour=require(./)
// const  

const router=experss.Router({mergeParams:true});

router.route('/')
.get(reviewController.getAllReviews)
.post(authController.protect,authController.restrictTo('admin,user'),reviewController.sendTour,reviewController.createReview)

router.route('/:id').delete(reviewController.deleteReview).patch(reviewController.UpdateReview).get(reviewController.getReview)

module.exports=router;