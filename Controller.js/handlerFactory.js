const catchAsync = require('./../utils/catchAsync');    
const AppError = require('./../utils/appError');
exports.deleteOne=Model=>
    catchAsync(async(req,res,next)=>{
        const doc =await Model.findByIdAndDelete(req.params.id);

        if(!doc){
            return next(new AppError('no doc found', 404))
        }
        res.status(200).json({
            status:'sucess',
            data:null
        })
    
    })

exports.UpdateOne=Model=>
    catchAsync(async(req,res,next)=>{
        const doc =await Model.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });

        if(!doc){
            return next(new AppError('no doc found', 404))
        }
        res.status(200).json({
            status:'sucess',
            data:doc
        })
    
    })
    exports.CreateOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = new Model(req.body);
        const newDoc = await doc.save();

        if (!newDoc) {
            return next(new AppError('Failed to create document', 400));
        }

        res.status(201).json({
            status: 'success',
            data: newDoc
        });
    });

exports.getOne=(Model,popOptions)=>catchAsync(async(req,res,nexr)=>{
    const  query  =await Model.findById(req.params.id)
    if(popOptions) query= query.populate(popOptions);
    const doc =await query;
 
    if(!doc){
        return next(new AppError('no doc found', 404))
    }

    res.status(200).json({
        status:'success',
        data:{
            data: doc
        }
    })
})


exports.getAll=(Model)=>catchAsync(async(req,res)=>{
   const doc =await  Model.find();
//    .filter()
//    .sort()
//    .limitFields()
//    .paginate();

//    const doc=await features.query;
    res.status(200).json({
        status:'sucess',
        result:doc.length,
        data:{
            doc
        }
    })
})
