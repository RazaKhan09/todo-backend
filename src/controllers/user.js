import {User} from '../models/user.js'

const generateRefreshandAccessTokens=async (userid)=>{
        const user=await User.findById(userid)
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken};
    }

const registerUser=async (req,res)=>{
    const {email,password}=req.body
    if(email==="" || password===""){
        return res.status(400).json({
            "error":"Email and Password required!"
        })
    }

const existedUser=await User.findOne({email})
if(existedUser){
    return res.status(400).json({
        "error":"User already exists"
    })
}
const userresponse=await User.create({
    email,
    password
})
const createdUser=await User.findById(userresponse._id).select("-password -refreshToken")
if(!createdUser){
    return res.status(400).json({
        "error":"Registration Failed"
    })
}
return res.status(201).json({createdUser})

}

const loginUser =async(req,res)=>{
    const {email,password}=req.body
    if(email==="" || password===""){
        return res.status(400).json({
            "error":"Email and Password Required!"
        })
    }
    const existingUser=await User.findOne({email})
    const isValidPassword=await existingUser.isPasswordCorrect(password)
    if(!isValidPassword){
        return res.status(400).json({
            "error":"Incorrect Password"
        })
    }
    const {refreshToken,accessToken}=await generateRefreshandAccessTokens(existingUser._id)
    const loggedInUser=await User.findById(existingUser._id).select("-password -refreshToken")
    const options = {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: "lax" // or "none" if cross-site cookies are needed
        };
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({
        user:loggedInUser,accessToken,refreshToken
    })
    
    
}

const logoutUser=async (req,res)=>{
        await User.findByIdAndUpdate(req.user._id,{
            $set:{
                refreshToken:undefined
            }},
            {
                new:true
            }
        )
        const options = {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: "lax" // or "none" if cross-site cookies are needed
        };
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json({
        "task":"Logged Out Successfully"
    })
    }

export {registerUser, loginUser, logoutUser}