
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ReorderIcon from "@mui/icons-material/Reorder";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import Button from "@mui/joy/Button";
import Avatar from "@mui/material/Avatar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/joy/Input";
import CircularProgress from "@mui/joy/CircularProgress";
import AppBar from "@mui/material/AppBar";
import { useSearchParams } from "react-router-dom";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import axios from "axios";
import User from "../../../server/models/user";

function Dashboard() {
  const [randomIdx, setRandomIdx] = useState(null);
  const [height, setHeight] = useState(800);
  const minHeight = 50;
  const maxHeight = 800;
  const lastScrollTop = useRef(0);
  
  let [searchParams] = useSearchParams();
  let [profilePic, setProfilePic] = useState("");
  let message = searchParams.get("message");
  let paramtoken = searchParams.get("token");

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePic', file);

    
    const token = localStorage.getItem('token'); 

    axios.post(`${import.meta.env.VITE_API_URL}/uploadProfilePic`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'multipart/form-data', 
        },
    })
    .then(response => {
        console.log('Profile picture updated:', response.data);
        alert(response.data.message)
        
    })
    .catch(error => {
        if (error.response) {
            
            console.error('Error uploading profile picture:', error.response.data.message);
        } else if (error.request) {
            
            console.error('No response received:', error.request);
        } else {
            
            console.error('Error:', error.message);
        }
    });
};
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  useEffect(() => {
    const handleScroll = () => {
      let currentScroll = window.scrollY;
      setHeight((prevHeight) => {
        if (currentScroll > lastScrollTop.current) {
          return Math.max(prevHeight - 60, minHeight);
        } else if (currentScroll < lastScrollTop.current) {
          return Math.min(prevHeight + 60, maxHeight);
        }
        return prevHeight;
      });

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function yourPost() {
    navigate("/dashboard/myPost");
  }

  useEffect(() => {
    if (paramtoken) {
      localStorage.setItem("token", paramtoken);
    }
  }, [paramtoken]);

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [userId, setId] = useState("");
  const [fullname, setname] = useState({ fname: "", lname: "" });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function previewBlog(id) {
    navigate(`/dashboard/${id}`);
  }

  async function handleEdit(id, userId) {
    try {
      let res = await axios.post(import.meta.env.VITE_API_URL + "/edit", { blogId: id, userId: userId }, {
        headers: { Authorization: `Bearer ${token || paramtoken}` }
      });
      navigate(`/dashboard/create?id=${res.data._id}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function getBlogs() {
    try {
      let res = await axios.get(import.meta.env.VITE_API_URL + "/blogs", {
        headers: { Authorization: `Bearer ${token || paramtoken}` },
      });
      console.log(res.data.picture)
      setBlogs(res.data.blogs || []);
      setProfilePic(res.data.picture);
 
      console.log(res.data)
      setname({ fname: res.data.fname, lname: res.data.lname });
      setId(res.data.userId);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  }

  useEffect(() => {
    if (message) {
      alert(message);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("message");
    }
    if (!token && !paramtoken) {
      alert("Sorry, You Must Login To Access");
      window.location.href = "/login";
    }
    getBlogs();
  }, [message, profilePic]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredSearch = Array.isArray(blogs)
    ? blogs.filter((el) =>
      el.title.toLowerCase().includes(search.toLowerCase()) ||
      el.content.toLowerCase().includes(search.toLowerCase())
    )
    : [];

  useEffect(() => {
    setInterval(() => {
      const random = Math.floor(Math.random() * blogs.length);
      setRandomIdx(random);
    }, 5000);
  }, [blogs]);

  const randomBlog = filteredSearch[randomIdx];

  return (
    <>
 <AppBar position="fixed" sx={{ minHeight: 70, backgroundColor: "#141624", padding: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "20px", flexDirection: "row" }}>
  <div style={{ height: "50px", width: "50px", display: "flex", position: "absolute", left: "100px" }}>
    <Typography variant="h4">GEN</Typography>
    <Typography variant="h2" color="primary">BLOG</Typography>
  </div>
  <ul style={{
    cursor: "pointer",
    display: "flex",
    listStyle: "none",
    gap: "40px",
    position: "absolute",
    right: "40%",
    padding: "10px", 
     
    borderRadius: "20px", 
    backdropFilter: "blur(10px)", 
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", 
}}>
    <li style={{
        padding: "10px 20px", 
        borderRadius: "15px", 
        transition: "background-color 0.3s, transform 0.3s", 
        backgroundColor: "rgba(255, 255, 255, 0.2)", 
        '&:hover': {
            backgroundColor: "rgba(255, 255, 255, 0.3)", 
            transform: "scale(1.05)", 
        },
    }} onClick={() => navigate("/")}>
        <Typography variant="h6" sx={{ color: "whitesmoke" }}>Home</Typography>
    </li>
    <li style={{
        padding: "10px 20px", 
        borderRadius: "15px", 
        transition: "background-color 0.3s, transform 0.3s", 
        backgroundColor: "rgba(255, 255, 255, 0.2)", 
        '&:hover': {
            backgroundColor: "rgba(255, 255, 255, 0.3)", 
            transform: "scale(1.05)", 
        },
    }} onClick={() => navigate("/aboutus")}>
        <Typography variant="h6" sx={{ color: "whitesmoke" }}>About Us</Typography>
    </li>
</ul>
  {localStorage.getItem("token") && <>
    <ReorderIcon sx={{ width: 100, position: "absolute", left: "10px", cursor: "pointer" }} color="secondary" onClick={toggleDrawer(true)} />
    <Input onChange={handleSearch} placeholder="SEARCH BLOG BY TITLE OR CONTENT" variant="soft" color="primary" sx={{ border: "2px solid black" }} />
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="profile-pic-upload"
      type="file"
      onChange={handleProfilePicChange}
    />
    <label htmlFor="profile-pic-upload">
      {profilePic ? <Avatar
        src={import.meta.env.VITE_API_URL + "/image/" + profilePic}
        sx={{ cursor: 'pointer' }}
        onClick={() => document.getElementById('profile-pic-upload').click()}
      /> : <Avatar {...stringAvatar(`${fullname.fname} ${fullname.lname}`)} />}
    </label>
  </>}
</AppBar>

<Drawer open={open} onClose={toggleDrawer(false)}>
  <Box sx={{ backgroundColor: "#141624", width: 150, height: "100%", color: "white", display: "flex", justifyContent: "flex-start", padding: "50px", flexDirection: 'column', alignItems: "center", gap: "20px" }}>
    <LogoutIcon onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} />
    <Button onClick={() => navigate("/dashboard/create")} variant="outlined">Create Post</Button>
    <Button onClick={() => { navigate("/dashboard/myPost") }} color="primary" variant="soft">Your Posts</Button>
    <Button  onClick={() => { navigate("/reset") }}> Reset Password</Button>
    <Button sx={{ marginTop: "auto" }} onClick={() => { navigate("/removeAccount") }}> Remove Account</Button>
  </Box>
</Drawer>

<Box sx={{
  color: "whitesmoke",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: height,
  width: "100%",
  backgroundImage: `url(/images/image10.jpg)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  objectFit: "fill",
  transition: "height 0.5s linear",
  position: 'relative',
  backgroundBlendMode: "hard-light"
}}>
  <Typography variant="h1">WELCOME TO GEN BLOG</Typography>
</Box>

{randomBlog && (
  <Box
    sx={{
      transition: "all 1s",
      width: "80%",
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      borderRadius: "12px",
      backgroundColor: "#1e1e2f",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      textAlign: "left",
    }}
  >
    <Box sx={{
      width: "100%",
      backgroundColor: "rgba(0, 0, 255, 0.1)",
      borderRadius: "10px",
      padding: "10px",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "rgba(15, 15, 198, 0.2)"
      }
    }}>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          transition: "all 1s",
          marginBottom: "10px",
          fontWeight: "bold",
          overflow: "hidden",
          overflowWrap: "break-word",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => {
          navigate(`/dashboard/${randomBlog._id}`);
        }}
      >
        {randomBlog.title}
      </Typography>
    </Box>
    {randomBlog.img && (
      <img
        src={`${import.meta.env.VITE_API_URL}/image/${randomBlog.img}`}
        alt={randomBlog.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />
    )}
    {randomBlog.userId === userId && (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleEdit(randomBlog._id, userId)}
        sx={{
          borderRadius: "20px",
          padding: "10px 20px",
          backgroundColor: "#d32f2f",
          "&:hover": {
            backgroundColor: "#c62828",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          },
          fontWeight: "bold",
          textTransform: "uppercase",
          marginTop: "10px",
        }}
      >
        Edit
      </Button>
    )}
  </Box>
)}

<div style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", margin: "30px auto", display: "grid", width: "70vw", gap: "20px" }}>
  {localStorage.getItem("token") && (filteredSearch.length !== 0 ? filteredSearch.map((el) => (
    <Card key={el._id} variant="outlined" sx={{
      maxWidth: "400px",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: "10px",
      color: "white",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      padding: "20px",
      backgroundColor: "#1e1e2f",
      borderRadius: "15px",
      transition: "transform 0.3s, box-shadow 0.3s",
      display: 'flex',
      flexDirection: 'column',
      "&:hover": {
        transform: 'scale(1.05)',
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)"
      }
    }}>
      <CardContent sx={{ gap: '10px', height: "auto", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{
          width: "300px",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderRadius: "10px",
          padding: "10px",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "rgba(15, 15, 198, 0.2)"
          }
        }}>
          <Typography onClick={() => {
            navigate(`/dashboard/${el._id}`);
          }} sx={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
            overflowWrap: "break-word",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            marginBottom: "0px",
            textAlign: "left",
            maxHeight: "6em",
          }} gutterBottom variant="h6">{el.title}</Typography>
        </Box>
        {el.img && <CardMedia
          component="img"
          sx={{ objectFit: "fill", maxHeight: 150, maxWidth: 1000 }}
          image={`${import.meta.env.VITE_API_URL}/image/${el.img}`}
        />}
        {el.userId === userId && <Button onClick={() => handleEdit(el._id, userId)} variant="contained" sx={{
          marginBottom: "0px",
          backgroundColor: "#3f51b5",
          color: "white",
          width: '20%',
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#303f9f"
          }
        }}>EDIT</Button>}
        <Typography sx={{ display: '-webkit-box', WebkitBoxOrient: "horizontal", alignItems: "center", WebkitLineClamp: 1, gap: "10px", }}>
          {el.profilePic ? <Avatar src={import.meta.env.VITE_API_URL + "/image/" + el.profilePic} /> : <Avatar {...stringAvatar(`${el.author}`)} />}
          author: {el.author}
        </Typography>
      </CardContent>
    </Card>
  )) : blogs.length === 0 ? (<Typography variant="h4" sx={{ color: "white" }}>No blogs found</Typography>) : <><Typography variant="h4" color="success">No Blogs Found</Typography><CircularProgress /></>)}
</div>
</> 

   
);

  }

export default Dashboard;














