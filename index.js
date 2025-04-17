const express=require('express')
const {StatusCodes} = require('http-status-codes')
require('dotenv').config()
const PORT=process.env.PORT
const app=express()
const connectdb=require("./db/db-connect")
const cookieParser=require("cookie-parser")
const path=require('path')



const cors = require('cors')




app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT,PATCH, DELETE",
    credentials: true  // allow session cookies across domains
  })
)
app.use(express.static("./build"))

app.use(cookieParser(process.env.SECRET_KEY))



// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//index route
app.get("/",async(req,res)=>{
    if(process.env.MODE==="development"){
    return res.status(StatusCodes.ACCEPTED).json({ message:"welcome to auth api"})}
    if(
        process.env.MODE==="production"
    ){
        res.sendFile("index.html",{root:path.join(__dirname,"/build")})
    }
})

//api route
app.use(`/api/auth`,require('./route/auth.route'))
app.use(`/api/book`,require('./route/book.route'))
app.use(`/api/review`,require('./route/review.route'))

//default routes
app.all("/*",async(req,res)=>{
    return res.status(StatusCodes.NOT_FOUND).json({ message:"requested path not found"})
})
app.listen(PORT,function(){
    connectdb()
    console.log(`Server is running at http://localhost:${PORT}`)
})