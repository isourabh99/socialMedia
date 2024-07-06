const mongoose =require("mongoose")
exports.connectionDB=async ()=>{
    try {
        const connectDB=await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGO db connection succesfull :${connectDB.connection.host} `);
    } catch (error) {
        console.log(error.message);
        console.log("database crashed or connection failed");
    }
}
