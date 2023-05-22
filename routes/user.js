const express = require("express")
const { register, login } = require("../controllers/user.controller")
const { registerRules, requestValidator } = require("../middlewares/validator")
const verifyAuth = require("../middlewares/auth")

const router = express.Router()

router.post("/register",registerRules(),requestValidator,register)
router.post("/login",login)
router.get("/Profile",verifyAuth)


module.exports = router

