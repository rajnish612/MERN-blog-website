























import express from "express";
import { Readable } from "stream";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import connectDB from "./connection.js";
import path from "path";
import { GridFsStorage } from "multer-gridfs-storage";
import User from "./models/user.js";
import dotenv from "dotenv";
import multer from "multer";

import passport from "passport";
import cors from "cors";
import jwt from "jsonwebtoken";
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import OTP from "./models/otp.js";
import ObjectId from "mongodb"
import Grid from "gridfs-stream";
import mongoose, { Types } from "mongoose";
import blogs from "./models/Blogs.js";



dotenv.config();
const app = express();
const tempUserStorage = {};

const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    
}));
app.use(passport.initialize());

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URL);

const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once("open", () => {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads"); 
    console.log("GridFS Initialized Successfully!");
});


const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
 
console.log(authHeader)
        if (!authHeader) {
            return res.status(401).json({ message: "Access Denied: No Token Provided!" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ message: "User Not Found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token!" });
    }
};
app.post("/uploadProfilePic", verifyToken, upload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
       const id = req.user._id.toString()
        const user = req.user; // Retrieved from token
        const filename = `${Date.now()}-${user.username}.jpg`;

        // Convert Buffer to Readable Stream
        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);

        // Upload Stream to GridFS
        const uploadStream = gridFSBucket.openUploadStream(filename, {
            contentType: "image/jpeg",
        });

        readableStream.pipe(uploadStream);

        uploadStream.on("finish", async () => {
            const imgId = uploadStream.id; // File ID in GridFS
            
            // Update User Profile with the Image ID
            await User.findByIdAndUpdate(user._id, { img: imgId }, { new: true });
             await blogs.updateMany({userId: id},{$set:{profilePic: imgId}});
            
            res.status(200).json({ 
                message: "Profile picture uploaded successfully", 
                profilePicUrl: `/api/image/${imgId}` 
            });
        });

        uploadStream.on("error", (error) => {
            console.error("Error uploading profile picture:", error);
            res.status(500).json({ message: "Error uploading profile picture" });
        });

    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ message: error.message });
    }
});
app.post("/register", upload.single('profilePic'), async (req, res) => {
    try {
        console.log(req.body)
        const { username, fname, lname, password } = req.body;

        if (!username || !lname || !fname || !password) {
            return res.status(400).json({ message: "PLEASE FILL ALL YOUR CREDENTIALS" });
        }

        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        console.log(req.file)
        
        if (req.file) {
            tempUserStorage[username] = {
                profilePic: req.file.buffer, 
               
            };
        }
     console.log(tempUserStorage[username])
        await OTP.create({
            email: req.body.username,
            otp: otp,
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        });

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: username,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        res.status(200).json({ message: 'Successfully sent otp' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
});


app.post("/register/verifyOTP", async (req, res) => {
    try { 
        
        const { fname, lname, username, password } = req.body;
       const {profilePic} = tempUserStorage[username]|| ""
        const otp = await OTP.findOne({ otp: req.body.OTP });
        if (!otp) {
            return res.status(400).json({ message: "OTP did not match" });
        }

        
        let user = await User.create({
            fname: fname,
            lname: lname,
            username: username,
            password: await bcrypt.hash(password, 10),
            img:  null 
        });
    
    
    

    
        
        
        

    

    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
   
    
        
        if (profilePic) {
            const filename = `${Date.now()}-${username}.jpg`; 

            
            const readableStream = new Readable();
            readableStream.push(profilePic);
            readableStream.push(null);

            
            const uploadStream = gridFSBucket.openUploadStream(filename, {
                filename: filename,
                contentType: 'image/jpeg',
            });

            readableStream.pipe(uploadStream);

            uploadStream.on("finish", async () => {
                const imgId = uploadStream.id; 
                
                await User.findByIdAndUpdate(user._id, { img: imgId }, { new: true });
                
                delete tempUserStorage[username];
                res.status(200).json({ message: 'User registered and profile picture uploaded successfully' });
            });

            uploadStream.on("error", (error) => {
                console.error("Error uploading profile picture:", error);
                res.status(500).json({ message: "Error uploading profile picture" });
            });
        } else {
            
            delete tempUserStorage[username];
            res.status(200).json({ message: 'User registered successfully without a profile picture' });
        
    }
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


    app.post("/login", async (req, res) => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ message: "PLEASE FILL ALL YOUR CREDENTIALS" });
            }
    
            let user = await User.findOne({ username });
    
            if (!user) {
                return res.status(400).json({ message: "Invalid username or password" });
            }
    
            
            if (user.googleId) {
                return res.status(400).json({ message: "Login with Google or set a password via registration" });
            }
    
            if (!user.password) {
                return res.status(400).json({ message: "No password set for this account. Reset or register again." });
            }
    
            
            let isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Password did not match" });
            }
    
            
            const token = jwt.sign(
                { id: user._id, fname: user.fname, lname: user.lname, picture: user.img },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
    
            return res.status(200).json({ message: "Welcome to our app", token });
    
        } catch (err) {
            console.error("Login Error:", err);
            return res.status(500).json({ message: "Server error. Please try again later." });
        }
    });
    
    
   

app.get("/blog", verifyToken, async (req, res) => {
    try {
        const { blogId } = req.query; 

        if (!blogId) {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: "Invalid Blog ID" });
        }

        
        const blog = await blogs.findById(blogId);
        console.log(blog)
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        
        res.status(200).json({
            blog,
            user: req.user._id.toString(),
        });

    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ message: "Server Error" });
    }
});











        


        




        







app.get("/image/:id", async (req, res) => {
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id); 

        const file = await gfs.files.findOne({ _id: fileId }); 

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        
        const readStream = gridFSBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        console.error("Error retrieving image:", error);
        res.status(500).json({ message: "Error retrieving image" });
    }
});

app.post("/login", async(req,res)=>{
    
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message: "PLEASE FILL ALL YOUR CREDENTIALS"})
        }
   
       
let user = await User.findOne({username: req.body.username})
if(!user){
    res.status(400).json({message: "unable to find user"})
}
if(user){
    let isMatch = await bcrypt.compare(req.body.password, user.password)
if(!isMatch){
    return res.status(400).json({message: "password did not match"})
}
    if(isMatch){
        const token = jwt.sign({id: user._id,fname: user.fname,lname: user.lname,picture: user.img }, process.env.JWT_SECRET,)
      console.log(token)
        res.status(200).json({message: "Welcome to our app",token  })
        req.user = token
      
return
        
    }
}
if(!user){
    res.status(400).json({message: "invalid username or password"})
}

    } catch(err){
     res.status(400).json({message: err.message})
     console.log(err)
    }
})
app.post("/edit", async (req, res) => {
    try {
      const { blogId, userId } = req.body;
  
      
      if (!blogId || !userId) {
        return res.status(400).json({ message: "Missing blogId or userId" });
      }
  
      
      const blog = await blogs.findOne({ _id: blogId, userId });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  })
  app.post('/create', verifyToken, upload.single("image"), async (req, res) => {
    try {
        const { title, content, description } = req.body;
        console.log(req.body);

        if (!title || !content || !description) {
            return res.status(400).json({ message: "Please Fill All Fields" });
        }

        
        let imgId = null;

        
        if (req.file) {
            const readableStream = new Readable();
            readableStream.push(req.file.buffer);
            readableStream.push(null);

            const filename = `${Date.now()}-${req.file.originalname}`;
            const uploadStream = gridFSBucket.openUploadStream(filename, {
                contentType: req.file.mimetype,
            });

            readableStream.pipe(uploadStream);

            uploadStream.on("finish", async () => {
                imgId = uploadStream.id; 
                createBlogEntry(title, content, description, imgId, req, res);
            });
        } else {
            
            createBlogEntry(title, content, description, imgId, req, res);
        }
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/blogs",verifyToken,async(req,res)=>{

    const blog = await blogs.find()
    res.status(200).json({blogs: blog,userId: req.user._id,picture: req.user.img})
})
async function createBlogEntry(title, content, description, imgId, req, res) {
    try {
        let blog = await blogs.create({
            title,
            content,
            description,
            author: `${req.user.fname} ${req.user.lname}`,
            userId: req.user._id,
            profilePic: req.user.img,
            img: imgId 
        });

        res.status(200).json({ message: "Blog Created Successfully", blog });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Server Error" });
    }
}


app.patch("/edit/blog/:id", verifyToken, upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content,description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Blog ID" });
        }

        const blog = await blogs.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to edit this blog" });
        }

        
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.description = description || blog.description;

        
        if (req.file) {
            const readableStream = new Readable();
            readableStream.push(req.file.buffer);
            readableStream.push(null);

            const filename = `${Date.now()}-${req.file.originalname}`;
            const uploadStream = gridFSBucket.openUploadStream(filename, {
                contentType: req.file.mimetype,
            });

            readableStream.pipe(uploadStream);

            uploadStream.on("finish", async () => {
                blog.img = uploadStream.id; 
                await blog.save();
                res.status(200).json({ message: "Successfully updated", blog });
            });
        } else {
            await blog.save();
            res.status(200).json({ message: "Successfully updated", blog });
        }

    } catch (err) {
        console.log("Error updating blog:", err);
        res.status(500).json({ message: "Server Error" });
    }
});
;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, async function (accessToken, refreshToken, profile, cb) {
    try {
        console.log(profile)
        let user = await User.findOne({ username: profile.emails[0].value });
        console.log(user)
     
        if (!user) {
            user = await User.create({
                fname: profile.name.givenName,
                lname: profile.name.familyName,
                username: profile.emails[0].value,
                googleId: profile.id,
                
            });
        }

        return cb(null, user);
    } catch (err) {
        return cb(err, null);
    }
}));
app.post("/remove/account", verifyToken,async(req,res)=>{
    try {
 
      const {username} = req.body
     if(req.user.username !== username){
        return res.status(400).json({message: "Enter Your Correct Email"})
     }
        if (!username ) {
            return res.status(400).json({ message: "PLEASE FILL  YOUR EMAIL" });
        }

        let existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "email is wrong" });
        }

        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        
        
   

        await OTP.create({
            email: req.body.username,
            otp: otp,
        
        });

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: username,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        res.status(200).json({ message: 'Successfully sent otp' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }

})
app.delete("/remove",verifyToken,async(req,res)=>{
    try{
    const otp = await OTP.findOne({ otp: req.body.OTP });
    const id = req.user._id.toString()
    if (!otp) {
        return res.status(400).json({ message: "OTP did not match" });
    }
    await User.deleteOne({username: otp.email})
    await blogs.deleteMany({userId: id})
    res.status(200).json({message: "account succesfully deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
     
})
app.post("/reset/account", async(req,res)=>{
    try {
 
      const {username} = req.body
   
        if (!username ) {
            return res.status(400).json({ message: "PLEASE FILL  YOUR EMAIL" });
        }

        let existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "email is wrong" });
        }

        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        
        
   

        await OTP.create({
            email: req.body.username,
            otp: otp,
        
        });

        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: username,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });

        res.status(200).json({ message: 'Successfully sent otp' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }

})
app.patch("/reset",async(req,res)=>{
    try{
    const otp = await OTP.findOne({ otp: req.body.OTP });
   
    if (!otp) {
        return res.status(400).json({ message: "OTP did not match" });
    }
    let user = await User.findOneAndUpdate({username: otp.email},{$set: {password: await bcrypt.hash(req.body.password,10)}})
   console.log(user)
    res.status(200).json({message: "password is successfully changed"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
     
})
app.get("/blog",verifyToken, async (req, res) => {
    try {
        const { blogId } = req.query;
        if (!blogId) return res.status(400).json({ message: "Blog ID is required" });

        const blog = await blogs.findById(blogId);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.json({ blog, user: req.userId }); 
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

app.get("/api/auth/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL}/register` }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id, email: req.user.username, picture: req.user.img }, process.env.JWT_SECRET);
        res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    }
);


app.listen(port, () => console.log(`Server started at port ${port}`));
