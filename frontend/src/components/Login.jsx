import { TextField, Button, AppBar, Box, Container,Typography } from "@mui/material";
import Slide from '@mui/material/Slide';

import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import axios from "axios";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from "@mui/icons-material/Menu";
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
 
  const navigate = useNavigate()
  const[formdata,setForm] = useState({})
   function handleChange(e){
      const {name,value} = e.target
  setForm((prev)=>{
    return {
      ...prev,
      [name]: value
    }
  })
   }
   async function handleGoogleLogin(){
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`

    }
 async  function handleClick(){
  try{
    console.log(formdata)
    let res = await axios.post(import.meta.env.VITE_API_URL+"/login",formdata)
  const token = res.data.token
  localStorage.setItem("token",token)
  console.log(token)
  alert(res.data.message)
  setTimeout(()=>{
    navigate("/dashboard")
  },500)

 
  }catch(err){
alert(err.response.data.message)
  }
   }
    let [checked,setChecked] = useState(true)
    useEffect(()=>{
        setTimeout(() => {
            setChecked(true); 
          }, 1000); 
    })
  return (
    <>
   <Slide direction="down" in={checked} timeout={1000} >
      <AppBar
        position="fixed"
        sx={{
          height: "80px",
          background: "rgba(62, 62, 210, 0.6)",
          boxShadow: "0px 6px 70px rgba(62, 62, 210, 0.6)",
       
          padding: "30px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="text"
          size="large"
          style={{
            color: "white",
            fontSize: "larger",
           
          }}
          href="/register"
        >
    <HowToRegIcon/> Register
        </Button>
      
<ul style={{
    position: "absolute",
    right: "170px",
    listStyleType: "none", 
    padding: 0,
    margin: 0,
}}>
    <li style={{
        display: "inline-block", 
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        borderRadius: "25px", 
        padding: "10px 20px", 
        transition: "background-color 0.3s, transform 0.3s", 
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", 
    }}>
        <a href="aboutus" style={{
            color: "white",
            fontSize: "x-large",
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            textDecoration: "none",
            display: "block", 
            textAlign: "center", 
        }}>
            About Us
        </a>
    </li>
</ul>
<Button
    variant="contained" 
    size="small"
    sx={{
        background: "linear-gradient(90deg, #4B4BCF, #6A11CB)", 
        fontWeight: "bold", 
        borderRadius: "20px",
        padding: "10px 20px", 
        position: "absolute",
        right: "20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", 
        color: "white", 
        fontSize: "larger",
        transition: "transform 0.3s, box-shadow 0.3s", 
        '&:hover': {
            transform: "translateY(-2px)", 
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)", 
        },
    }}
    href="/dashboard"
>
    BLOGS <BookOutlinedIcon />
</Button>

        

      </AppBar>
      </Slide>
      <Slide direction="up" in={checked} timeout={1000}>
      <div style={{display: "flex",width: "70%",margin: "140px auto",justifyContent: "center",alignItems: "center",gap: "0px"}}>
      <Box height={100} sx={{width: "30vw",justifyContent: "center",minHeight: "77vh",borderRadius: "20px",position: "relative",left: "17px",zIndex: "1", display: "flex",fontSize: "larger",alignItems: "center", boxShadow: "-4px 4px 20px rgb(0,0,255),-4px -4px 10px rgba(0,0,255)",overflow: "hidden",backgroundColor:"rgba(0,0,255,0.4)",flexDirection: "column"}}>
      <div style={{height: "50px",width: "50px",display: "flex",marginRight:"150px",marginBottom:"50px" }}><Box style={{backgroundColor:"#141624",padding:"5px",borderRadius:"20px"}}> <Typography variant="h4" color="white" >GEN</Typography></Box>
    <Typography variant="h2" color="success">BLOG</Typography>
   

    </div>
    <div style={{marginLeft:'30px',width:"80%"}}>
   <Box sx={{background: "rgb(25, 25, 91)",borderRadius:"20px",display:"inline-block",width:"320px"}}>  <Typography variant="h4" color="white" sx={{ fontWeight:"bolder",textDecoration:'dotted'}}>WELCOME BACK !</Typography></Box>
    
    </div>
    </Box>
    <div id="register-container" style={{zIndex: "2",}}>
     
          <h2 style={{marginBottom: "50px"}}>Login To Your Account </h2>

 
        <div className="form-container"  style={{gap: "30px"}}>
     
         
          <TextField
          onChange={handleChange}
            id="outlined-basic"
            label="email"
            name="username"
            color="secondary" 
            sx={{ width: "100%", backgroundColor: "white",borderRadius: "10px"}}
            size={"small"}
            variant="outlined"
          />
       
         
          <TextField
               onChange={handleChange}
            id="outlined-basic"
            label="password"
            sx={{ width: "100%",backgroundColor: "white",borderRadius: "10px" }}
            size={"small"}
            color="secondary"
            name="password"
            variant="outlined"
          />
          <Button variant="text" href="/register">
            {" "}
            Dont have an account? Register
          </Button>
          <Button onClick={handleClick}
            sx={{ backgroundColor: "black", alignSelf: "center",gap: "10px" }}
            variant="contained"
          >
           <LoginIcon /> Login
          </Button>
          <Button onClick={handleGoogleLogin}
                  sx={{ backgroundColor: "white",color: "blue", alignSelf: "center",fontSize: "x-small",width: 180,padding: 0,display: "flex",justifyContent: "center",alignItems: "center",gap: "10px" }}
                  variant="outlined"
                >
                
                <GoogleIcon/><p style={{fontFamily: "arial"}}>sign in with google</p>
                </Button>
        </div>
      
      </div>
  
      </div>
      </Slide>
    </>
  );
}

export default Login;