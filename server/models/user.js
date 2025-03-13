import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String,required: true},
    username: {type: String,required: true,unique: true},
    password: {type: String,required: function() { return !this.googleId; }},
    googleId: {type: String},
    img: {data: Buffer, type: String },
})
  
let User = mongoose.model("user",userSchema)
export default User;