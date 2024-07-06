const mongoose=require("mongoose")
const plm =require("passport-local-mongoose")
const userSchema = mongoose.Schema({
    email:{
        type:String,
       
    },
    username:{
        type: String,
        unique:true
    },
    password:String,
    mobilenum:{
        type: Number,
       
    }

})
userSchema.plugin(plm)

const userModel=mongoose.model("user", userSchema)
module.exports=userModel