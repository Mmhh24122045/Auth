const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const config = require("config")
const secret = config.get("secret")

exports.register = async(req,res) => {
    const {name,email,phone,password} = req.body
try {
    const existingUser = await User.findOne({email})
    console.log(existingUser)
     if (existingUser) return res.status(400).json({msg:"email address already used."})
    const newUser = new User({
        name,
        email,
        phone,
        password
    })
const salt  = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(newUser.password,salt)
newUser.password = hash
    await newUser.save()
    res.send({
        user:
        {
         name:newUser.name,
         email:newUser.email,
         phone:newUser.phone
        }
    })
} catch (error) {
    res.status(500).json({msg:error.message})
}
}


exports.login = async(req,res) => {
    const {email,password}=req.body
    try {
        const validUser = await User.findOne({email})
        // console.log(validUser)
        if (!validUser) return res.status(400).json({msg:"Email or password Invalid"})
        const validPassword = await bcrypt.compare(password,validUser.password)
        // console.log(validPassword)
      const payload = {
        id: validUser._id
      }
  const token = await jwt.sign(payload,secret)
  res.send({
    token,
    user : {
        id:validUser._id,
        name:validUser.name,
        email:validUser.email,
        phone:validUser.phone
    }
  })


      if (!validPassword) return res.status(400).json({msg:"Email or password Invalid"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}