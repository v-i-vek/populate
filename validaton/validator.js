const {body , validatorResult, validationResult}=require('express-validator')


const signUpValidation=()=>{
    return [
        //user must not be empty
        body(firstName).notEmpty().trim(),
        body(lastName).notEmpty().trim(),
        body(emailId).notEmpty().trim().isEmail(),
        body(password).notEmpty().isLength({min:6}).withMessage('password must be atleaast 6 character long'),body('confirmPassword').custom((value,req)=>{
            if(value !==req.body.password){
                throw new Error('Passwords do not match');
            }
        
        })
       
    ]
}

const validate = (req,res, next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }
    const extractedError =[]
    errors.array.map(err => extractedError.push({[err.param]:err.msg }))
    return res.status(422).json({
        errors:extractedError,
    })
}

module.exports={
    signUpValidation,
    validate
}