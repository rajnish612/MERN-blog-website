
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TextField, Button, AppBar, Box, Typography, Avatar } from "@mui/material";
import Slide from "@mui/material/Slide";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/register.css";

function Register() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const[clickPass,setClickPass] = useState(false)
  const [checked, setChecked] = useState(true);
  const [formData, setForm] = useState({});
  const [otp, setOTP] = useState("");
  const [click, setClick] = useState(false);
 
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null); 
  const [profilePicPreview, setProfilePicPreview] = useState(null); 

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 1000);
  }, []);

  async function handleSubmit() {

    setClick(true);
    const data = new FormData(); 
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("username", formData.username);
    data.append("password", formData.password);
    if (profilePic) {
        data.append("profilePic", profilePic); 
    }

    console.log("Submitting data:", data); 

    try {
        let res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        console.log(res);
        alert(res.data.message);
        setMessage(res.data.message);
        if (message) {
            setClick(false);
        }
    } catch (err) {
        setClick(false);
        console.error("Error during registration:", err); 
        alert(err.response?.data?.message || "An error occurred");
    }
}

  async function handleGoogleLogin() {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  }

  function handleOTP(e) {
    setOTP(e.target.value);
  }

  async function handleOTPsubmit() {
    try {
      let res = await axios.post(`${import.meta.env.VITE_API_URL}/register/verifyOTP`, { OTP: otp, username: formData.username, password: formData.password, fname: formData.fname, lname: formData.lname });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0]; 
    setProfilePic(file); 

    
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result); 
    };
    if (file) {
      reader.readAsDataURL(file); 
    } else {
      setProfilePicPreview(null); 
    }
  }
console.log(formData)
  return (
    <>
   <Slide direction="down" in={checked} timeout={1000}>
        <AppBar
          position="fixed"
          sx={{
            height: "80px",
            background: "rgba(62, 62, 210, 0.6)",
            padding: "30px",
            display: "flex",
            justifyContent: "center",
            boxShadow: "0px 6px 70px rgba(62, 62, 210, 0.6)",
            alignItems: "center",
          }}
        >
          <div style={{ height: "50px", width: "50px", display: "flex", position: "absolute", left: "20px" }}>
            <Typography variant="h4">GEN</Typography>
            <Typography variant="h3" color="success">BLOG</Typography>
          </div>
          <Button
            variant="text"
            size="large"
            sx={{ color: "white", fontSize: "larger", alignSelf: "flex-end" }}
            href="/login"
          >
            <LoginOutlinedIcon />
            Login
          </Button>
        </AppBar>
      </Slide>

      <Slide direction="up" in={checked} timeout={1000}>
        <div style={{ display: "flex", width: "70%", margin: "140px auto", justifyContent: "center", alignItems: "center", gap: "0px" }}>
          <Box height={100} sx={{ width: "30vw", justifyContent: "center", minHeight: "77vh", borderRadius: "20px", position: "relative", left: "17px", zIndex: "1", display: "flex", fontSize: "larger", alignItems: "center", boxShadow: "-4px 4px 20px rgb(0,0,255),-4px -4px 10px rgba(0,0,255)", overflow: "hidden", backgroundColor: "rgba(0,0,255,0.4)", flexDirection: "column" }}>
            <div style={{ height: "50px", width: "50px", display: "flex", marginRight: "150px", marginBottom: "50px" }}>
              <Box style={{ backgroundColor: "#242535", padding: "5px", borderRadius: "20px" }}>
                <Typography variant="h4" color="white">GEN</Typography>
              </Box>
              <Typography variant="h2" color="success">BLOG</Typography>
            </div>
            <div style={{ marginLeft: '30px', width: "80%" }}>
              <Box sx={{ background: "rgb(25, 25, 91)", borderRadius: "20px", display: "inline-block", width: "300px" }}>
                <Typography variant="h4" color="white" sx={{ fontWeight: "bolder", textDecoration: 'dotted' }}>Create Your New Account</Typography>
              </Box>
            </div>
          </Box>
          <div id="register-container" style={{ zIndex: "2", }}>
            {message === "Successfully sent otp" ? (
              <Box
                sx={{
                  gap: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ height: "60px", gap: "10px" }}>
                  <Typography variant="h4" fontWeight={"bolder"}>CONFIRM OTP</Typography>
                  <Typography variant="h5" fontWeight={"light"}>We just sent you to your email.</Typography>
                </Box>
                <TextField
                  onChange={handleOTP}
                  id="outlined-basic"
                  label="OTP"
                  sx={{
                    width: "70%",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                  size="small"
                  color="primary"
                  name="OTP"
                  variant="outlined"
                />
                <Typography variant="small">resend otp?</Typography>
                <Button
                  onClick={handleOTPsubmit}
                  sx={{ width: '70%', alignSelf: "center", backgroundColor: "black" }}
                  variant="contained"
                >
                  CONFIRM
                </Button>
              </Box>
            ) : click ? (
              <>
                <CircularProgress color="secondary" />
                <Typography variant="h6">Wait a moment, we are sending your OTP. Please check your messages shortly.</Typography>
              </>
            ) : (
              <>
                <Typography variant="h4" style={{ fontWeight: "bolder" }}>Register</Typography>
                
                {/* Avatar for Profile Picture Upload */}
               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px" }}>
                 <input
                    type="file"
                    accept="image/*"

                    onChange={handleFileChange}
                    style={{ display: "none" }} 
                    id="profile-pic-input"
                  />
                  <label htmlFor="profile-pic-input">
                    <Avatar
                      src={profilePicPreview} 
                      sx={{ width: 100, height: 100, cursor: "pointer", marginBottom: "10px" }}
                    />
                  </label>
                  <Typography variant="body2" color="textSecondary">Click on the avatar to upload a profile picture</Typography>
                </div>

                <div className="form-container">
                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <TextField
                      onChange={handleChange}
                      id="outlined-basic"
                      label="First Name"
                      sx={{
                        width: "50%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                      size="small"
                      color="secondary"
                      name="fname"
                      variant="outlined"
                    />
                    <TextField
                      onChange={handleChange}
                      id="outlined-basic"
                      label="Last Name"
                      sx={{
                        width: "50%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                      size="small"
                      color="secondary"
                      name="lname"
                      variant="outlined"
                    />
                  </div>

                  <TextField
                    onChange={handleChange}
                    id="outlined-basic"
                    label="email"
                    name="username"
                    color="secondary"
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                    size="small"
                    variant="outlined"
                  />
{/* <Box  sx={{display: "flex",justifyContent: "center",alignItems: "center",border: "0.2px solid black"}}>
                  <TextField
                    onChange={handleChange}
                    id="filled-multiline-static"
                    label="Password"
 variant='standard'
 
                    sx={{
                      border: "none",
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                    }}
                    size="small"
                    color="secondary"
                    name="password"
                    type="password"
                  
                  />
                        
              <RemoveRedEyeIcon/>
              </Box> */}
              <Box
  sx={{
    margin: "2px auto",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0.1px solid gray",
    borderRadius: "3px",
    padding: "4px",
    backgroundColor: "white",
  }}
>
  <input
    onChange={handleChange}
    id="filled-multiline-static"
    label="Password"
    placeholder='Password'
    variant="filled"  
    style={{
      outline: "none",
      fontFamily: "arial",
      width: "100%",
      backgroundColor: "white",
      border: "none"
    }}
    size="small"
    color="secondary"
    name="password"
    type= {clickPass?"password":""}
  />
  {clickPass?<VisibilityOffIcon onClick={()=>{
    setClickPass((prev)=>{
      return !prev
    })
    }} />:<RemoveRedEyeIcon onClick={()=>{
  setClickPass((prev)=>{
    return !prev
  })
  }} />}
</Box>
                  <Button variant="text" href="/login" sx={{textAlign: "center",margin: "2px auto"}}>
                    Already have an account? Sign In
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "black", alignSelf: "center" }}
                    variant="contained"
                  >
                    Register
                  </Button>

                  <Typography variant="h6" sx={{ alignSelf: "center", margin: 0 }}>
                    OR
                  </Typography>

                  <Button
                    onClick={handleGoogleLogin}
                    sx={{
                      backgroundColor: "white",
                      color: "blue",
                      alignSelf: "center",
                      fontSize: "x-small",
                      width: 180,
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    variant="outlined"
                  >
                    <GoogleIcon />
                    <p style={{ fontFamily: "sans-serif" }}>Sign up with Google</p>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Slide>
    </> 
  );
}

export default Register;















 