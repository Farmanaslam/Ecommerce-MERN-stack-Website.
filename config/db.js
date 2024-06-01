import {mongoose} from 'mongoose'
import  Color  from 'colors'
const connectDb=async()=>{
    try{
    const conn= await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to mongodb ${conn.connection.host}`)
    }catch(err){
       console.log(`Error in DB ${err}`.bgRed.white)
    }
}
export default connectDb