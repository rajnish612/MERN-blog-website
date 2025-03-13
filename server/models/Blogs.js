import mongoose from "mongoose";
let blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String,required: true},
    content: {type: String,required: true},
    author: {type: String,required: true},
    userId: {type: String,required: true},
    profilePic: {data: Buffer, type: String} ,
    img: { type: String },

})

let blogs = mongoose.model("Blogs",blogSchema)
export default blogs;