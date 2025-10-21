import mongoose from "mongoose";


async function dbConnect(){
    try {
        const db=await mongoose.connect(process.env.MONGODB_URI || " ",{ dbName: 'adityaportfolio'})
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("DB Connection Failed",error);
        process.exit(1)
    }

} 
export default dbConnect;