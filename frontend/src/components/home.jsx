












































































































































import { Typography,Button } from "@mui/material";
import { Box,AppBar,Toolbar } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useEffect,useState } from "react";
import {useNavigate} from 'react-router-dom';
import Grow from '@mui/material/Grow';
import Collapse from '@mui/material/Collapse';

import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import Zoom from '@mui/material/Zoom';
function Home(){
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
  
    useEffect(()=>{
        setChecked(true);
        setTimeout(()=>{
setChecked1(true)
        },1000)
      
    },[])
  

    


    return (
        <>
         <AppBar position="static" sx={{ backgroundColor: "#1e1e2f", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" }}>
            <Toolbar>
            <Typography
    variant="h6"
    sx={{
        flexGrow: 1,
        fontWeight: "bold",
        letterSpacing: "1px",
        transition: "color 0.3s, transform 0.3s",
        padding: "10px 20px", 
        background: "linear-gradient(90deg, #4B4BCF, #6A11CB)", 
        WebkitBackgroundClip: "text", 
        WebkitTextFillColor: "transparent", 
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
        borderRadius: "5px", 
        '&:hover': {
            color: "#ffcc00", 
            transform: "scale(1.05)", 
        },
    }}
>
    GEN BLOG
</Typography>
                <Button
                    color="inherit"
                    onClick={() => navigate("/aboutus")}
                    sx={{
                        marginRight: "20px",
                        transition: "background-color 0.3s, transform 0.3s",
                        '&:hover': {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    About Us
                </Button>
                <Button
                    color="inherit"
                    onClick={() => navigate("/dashboard")}
                    sx={{
                        transition: "background-color 0.3s, transform 0.3s",
                        '&:hover': {
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            transform: "scale(1.05)",
                        },
                    }}
                >
                    Dashboard
                </Button>
            </Toolbar>
        </AppBar>
        <Box className="home" sx={{backgroundColor: "#141624",width: "100vw",minHeight: "100vh",margin: 0, paddingBottom: "50px",position: "relative", fontFamily: `Kanit, serif`,display: "flex",color: "whitesmoke"}}>
   
<Box sx={{marginLeft: "100px",display: "flex",minHeight: "50vh",position: "absolute",top:"50px",flexDirection: "column",gap: "50px"}}>
<Fade  timeout={3000}in={checked} >

<div style={{height: "50px",width: "50px",display: "flex"}}><Typography variant="h4">GEN</Typography>
<Typography variant="h2" color="primary">BLOG</Typography>
</div>
</Fade>



<Box>
<Fade in={checked} timeout={3000} style={{transitionDelay: "500ms"}}>
<Typography variant="h4" sx={{display: "flex",flexDirection: "column",gap: "10px",fontWeight: "bolder",fontStyle: "italic"}}><span style={{ backgroundColor: "#222260",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
      width: 300}}>Gen Blog –</span> <span style={{boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",backgroundColor:"#4B4BCF",color: "white",padding: "10px",borderRadius: "10px",width: "500px"}}> Your Gateway to Knowledge & Creativity!</span></Typography>
      </Fade>
</Box>

<Box sx={{gap: "10px",display: "flex",flexDirection: "column"}}>

       

        
<Fade in={checked} timeout={3000} style={{transitionDelay: "1000ms"}}>
<Typography variant="small" style={{fontWeight: "bolder",textDecoration: "underline",textDecorationColor: "blue"}}>DESRCRIPTION</Typography>
</Fade>
<Fade in={checked} timeout={2000} style={{transitionDelay: "1500ms"}}>
<Typography width={500}>

Gen Blog is your ultimate destination for insightful articles, creative ideas,and expert knowledge. Whether you're exploring tech trends, web development, business strategies, or personal growth, we've got you covered. Stay updated, stay inspired, and keep generating new ideas with Gen Blog!"

</Typography>

</Fade>


</Box>

</Box>
{/* <Fade  timeout={2000}in={checked} style={{transitionDelay: "1800ms"}}>
<Box height={600} width={400} sx={{backgroundColor:"rebeccapurple",objectFit: "fill",marginLeft: "65%",marginTop: "7%",boxShadow: "4px 4px 30px",transform: "rotate(10deg)",overflow: "hidden"}}><img style={{height: "inherit",width: "inherit"}}src="./images/image1.png"></img></Box>
</Fade>

<Fade  timeout={2000}in={checked1}style={{transitionDelay: "2000ms"}}>
<Box height={400} width={400} sx={{position: "absolute", backgroundColor:"rebeccapurple",objectFit: "fill",marginLeft: "50%",marginTop: "7%",boxShadow: "4px 4px 30px",transform: "rotate(-7deg)",overflow: "hidden",transitionDelay: "3000ms"}}><img style={{height: "inherit",width: "inherit"}}src="./images/image2.png"></img></Box>
</Fade> */}
<Fade timeout={2000} in={checked} style={{ transitionDelay: "1800ms" }}>
    <Box
        height={600}
        width={400}
        sx={{
            backgroundColor: "rgba(75, 75, 207, 0.8)", 
            objectFit: "cover",
            marginLeft: "65%",
            marginTop: "3%",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)", 
            borderRadius: "15px", 
            overflow: "hidden",
            transition: "transform 0.3s", 
            transform: "rotate(5deg)", 
            '&:hover': {
                transform: "scale(1.05) rotate(5deg)", 
            },
        }}
    >
        <img
            style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.3s", 
                '&:hover': {
                    transform: "scale(1.1)", 
                },
            }}
            src="./images/image1.png"
            alt="Decorative"
        />
    </Box>
</Fade>

<Fade timeout={2000} in={checked1} style={{ transitionDelay: "2000ms" }}>
    <Box
        height={400}
        width={400}
        sx={{
            position: "absolute",
            backgroundColor: "rgba(75, 75, 207, 0.8)", 
            objectFit: "cover",
            marginLeft: "50%",
            marginTop: "3%",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)", 
            borderRadius: "15px", 
            overflow: "hidden",
            transition: "transform 0.3s", 
            transform: "rotate(-5deg)", 
            '&:hover': {
                transform: "scale(1.05) rotate(-5deg)", 
            },
        }}
    >
        <img
            style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.3s", 
                '&:hover': {
                    transform: "scale(1.1)", 
                },
            }}
            src="./images/image2.png"
            alt="Decorative"
        />
    </Box>
</Fade>
<Fade  timeout={2000}in={checked1}style={{transitionDelay: "2500ms"}}>
    <Box>

<Button variant="contained"  onClick={()=>{
navigate("/register")
}} size="large" sx={{position: "absolute",bottom: "100px",left: "41%",backgroundColor: "white",color: "black",borderRadius: "30px",fontSize: "larger",display: "flex",justifyContent: "center",alignItems: "center",boxShadow: "4px 4px 30px white"}}><KeyboardArrowRightTwoToneIcon />GET STARTED</Button>
</Box>
</Fade>

       </Box>
      
        </>
    )
}
export default Home;