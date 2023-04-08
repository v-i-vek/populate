const staffModel = require('../model/staff')


const staffGet = async(req,res)=>{
    try {
        const result = new staffModel.find()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}

const staffPost = async(req,res)=>{
    try {
        const result  = new staffModel(req.body)
        const check = await result.save();
        res.send(check)

    } catch (error) {
        res.send(error)
        
    }
}

module.exports ={staffGet,staffPost}