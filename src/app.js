import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
const app = express()
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true               // allow cookies

}))
app.use(express.json({
    limit: "16kb",

}))
app.use(cookieparser())


import userRouter from './routes/user.js'
app.use(express.urlencoded({ extended: true }));
app.use("",userRouter)

import todoRouter from './routes/todo.js'
app.use(express.urlencoded({ extended: true }));
app.use("",todoRouter)
export default app