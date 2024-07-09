const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const userSchema = mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: {
    fileId: String,
    url: {
      type: String,
      default: "https://ik.imagekit.io/lmh4shp8d/1?updatedAt=1720341746483",
    },
    thumbnailUrl: String,
  },
  mobilenum: {
    type: Number,
  },
  otp: {
    type: Number,
    default: 0,
  },
});
userSchema.plugin(plm)

const userModel = mongoose.model("user", userSchema)
module.exports = userModel