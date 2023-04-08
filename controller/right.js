const rightModel = require('../model/right')



const getRight = async(req,res)=>{
    try {
        const result = await rightModel.find().populate('staff_id')
        res.send(result)


    } catch (error) {
        res.send(error)
    }
}

const postRight  =async(req,res)=>{
    try {
        
        const right = new rightModel({
            staff_id:req.body.staff_id,
            right:req.body.right
        })
        const result = await right.save()
        res.send(result)




    } catch (error) {
        res.send(error)
    }
}

module.exports = {getRight,postRight}