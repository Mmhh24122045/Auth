const jwt = require('jsonwebtoken')
const config = require("config")
const User = require('../models/User')
const secret = config.get("secret")




const verifyAuth = async(req,res,next) => {
    const token = req.headers.authorization
     
    if(!token) return res.status(400).json({msg:"Unauthorized"})

    try {
        const decoded =await jwt.verify(token,secret)
        console.log(decoded)
        if (!decoded) return res.status(400).json({msg:"no user"})
        const user = await User.findById(decoded.id).select("-password")
        if (!user) return res.status(400).json({msg:"no user"})
         else {
            res.send(user)
         }
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}


module.exports = verifyAuth