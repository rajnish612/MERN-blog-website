import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    fname: {type: String},
    lname: {type: String},
    username: {type: String},
    password: {type: String},
    createdAt: {type: Date, expires: "3m", default: Date.now}
})
const OTP = mongoose.model('OTP', otpSchema)
export default OTP;