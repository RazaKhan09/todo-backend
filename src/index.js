import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './db/connection.js'
import app from './app.js'
dotenv.config({
    path:"./env"
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server listening at port: ${process.env.PORT}`)
    })
    app.get("/", (req, res) => {
    res.send("API is running...");
});
})
.catch((error)=>{
    console.log("MongoDB connection Failed", error)
})