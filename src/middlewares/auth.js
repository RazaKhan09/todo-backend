import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
export const verifyJWT=async(req,res,next)=>{
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

     if (!token) {
            throw new Error(401, "Unauthorized request")
        }
    const decodedToken=await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user =await User.findById(decodedToken._id).select("-password -refreshToken")
    req.user=user
     next()
}