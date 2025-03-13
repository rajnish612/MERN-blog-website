import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function PreviewBlog() {
    const token = localStorage.getItem("token");
    const params = useParams();
    const blogId = params.id;
    const [blog, setBlog] = useState({});

    async function getBlog() {
        try {
            let res = await axios.get(import.meta.env.VITE_API_URL + "/blog/" + blogId, {
                headers: { authorization: `Bearer ${token}` }
            });
            setBlog(res.data);
        } catch (err) {
            Navigate("/login");
        }
    }

    useEffect(() => {
        if(!token){
            Navigate("/login");
        }
        getBlog();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#141624", 
                color: "white", 
                padding: "20px", 
                borderRadius: "12px", 
                maxWidth: "90%", 
                margin: "20px auto",
                marginBottom: "20px",
                
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", 
                textAlign: "left", 
            }}
        >
          
            <Typography
                variant="h3"
                sx={{
                    marginBottom: "15px",
                    fontWeight: "bold",
                    backgroundColor: "#2196F3", 
                    color: "white", 
                    padding: "10px", 
                    borderRadius: "8px", 
                    overflowWrap: "break-word", 
                }}
            >
                {blog.title}
            </Typography>
            {blog.img && (
                <img
                    src={import.meta.env.VITE_API_URL + "/image" + `/${blog.img}`}
                    alt={blog.title}
                    style={{
                        alignSelf: 'center',
                        width: "70%",
                        maxHeight: "400",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginLeft: "15%",
                       
                    }}
                />
            )}
        
              <Typography
                variant="h5"
                sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                 
                  
                  width: "150px",
                
                    padding: "5px 10px", 
                    backgroundColor: "#FFEB3B", 
                    borderRadius: "5px", 
                    color: "#000", 
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", 
                }}
            >
                description
                <span
                    style={{
                  
                      
                        transform: "translate(-50%, -50%)",
                        fontSize: "1.2rem", 
                        color: "#FF5722", 
                        fontWeight: "bold", 
                    }}
                >
                
                </span>
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    overflowWrap: "break-word", 
                }}
            >
                {blog.description}
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "#FF5722", 
                    textDecoration: "underline", 
                }}
            >
                Content
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    lineHeight: "1.6",
                    fontSize: "1.1rem",
                    overflowWrap: "break-word", 
                }}
            >
                {blog.content}
            </Typography>
        </Box>
    );
}

export default PreviewBlog;

