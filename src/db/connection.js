import mongoose from 'mongoose'
const connectDB=async ()=>{
    try{
        const response=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB connected! DB host: ${response.connection.host}`)
    }
    catch(error){
        console.log("MongoDB error", error)
        process.exit(1)
    }
}
export default connectDB