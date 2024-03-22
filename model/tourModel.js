const mongoose = require('mongoose');

const tourSchema =new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'],
      unique:true
    },
    rating:{
      type:Number,
      default:4.5
      },
    price:{
      type:Number,
      required:[true,'A tour must have a price']
    }
  ,
    guides:[
      {
        type:mongoose.Schema.ObjectId,
        ref:'User'
      }
    ],
    // startLocation:{
    //   type:{
    //     type:String,
    //     default:'Point',
    //     enum:['Point']
    //   },
    //   coordinates:[Number],
    //   address:String,
    //   description:String
    // },
  },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  }) 

  tourSchema.index({price:1,rating:-1});
  tourSchema.index({startLocation:'2dsphere'})
  tourSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'tour',
    localField:'_id'  
  });
  const Tours=mongoose.model('Tour',tourSchema);

  module.exports=Tours;