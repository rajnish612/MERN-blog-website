import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import blogs from "../../../server/models/Blogs";

function PreviewBlog(props) {
    const token = localStorage.getItem("token");
    const params = useParams();
    const blogId = params.id;
    const [blog, setBlog] = useState({});

    
    
    
    
    
    
    
    
    
    
console.log(props.image)
    useEffect(() => {
        if(!token){
            Navigate("/login");
        }
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "#141624", 
                color: "white", 
                padding: "20px", 
                borderRadius: "12px", 
                maxWidth: "90%", 
                margin: "50px auto", 
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
                {props.title}
            </Typography>
            {props.image && (
                <img
                    src={props.image}
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
                {props.description}
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
                {props.content}
            </Typography>
        </Box>
    );
}

export default PreviewBlog;















          



























































                




































