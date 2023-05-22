const express = require("express")
const connectDB = require("./config/connectDB")
const user = require("./routes/user")
const app = express()


app.use(express.json())

connectDB()
// user routes
app.use("/user",user)
// product routes
// app.use("/products",product)



const PORT = 5000

app.listen(PORT, err=>err?console.log(err):console.log(`server is running on port ${PORT}`))