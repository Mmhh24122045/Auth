const { check, validationResult } = require("express-validator");



exports.registerRules = () => [
    check("name","Name field cannot be empty").notEmpty(),
    check("email","Email field should be a valid email adress").isEmail(),
    check("password","Password need to be at least 6 characters").isLength({min:6})
]


exports.requestValidator = (req,res,next)=> {
    const errors = validationResult(req)
console.log(errors)
    errors.isEmpty() ? next() :  res.status(400).json({errors:errors.array()})
}