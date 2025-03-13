import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Paper, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPosts() {
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token");
    const [blogs, setBlogs] = useState([]);
    const [userId, setId] = useState([]);
    const navigate = useNavigate();
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
    useEffect(() => {
        if (!token) {
            alert("Sorry, you must be logged in to access this page");
            navigate("/home");
        }
    }, [token]);

    const filteredSearch = Array.isArray(blogs)
        ? blogs.filter((el) =>
            el.title.toLowerCase().includes(search.toLowerCase()) ||
            el.content.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    useEffect(() => {
        
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + `/myPost`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBlogs(response.data.blogs);
                setId(response.data.userId);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [token]);

    const previewBlog = (id) => {
        navigate(`/dashboard/${id}`); 
    };

    return (
        <Box sx={{ padding: "20px", width: "1000px", margin: "20px auto", backgroundColor: "#f0f0f0", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h4" sx={{ marginBottom: "20px", color: "#2c2c3e", textAlign: "center", fontWeight: "bold" }}>
                My Blogs
            </Typography>
            <Input
                onChange={handleSearch}
                placeholder="SEARCH BLOG BY TITLE OR CONTENT"
                variant="soft"
                color="secondary"
                sx={{
                    border: "2px solid #2c2c3e",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                    marginBottom: "20px",
                    "&:focus": {
                        borderColor: "#2c2c3e",
                        boxShadow: "0 0 5px rgba(44, 44, 62, 0.5)"
                    }
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredSearch.length > 0 ? (
                    filteredSearch.map((blog) => (
                        <Card key={blog._id} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "#2c2c3e", color: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", transition: "transform 0.2s", "&:hover": { transform: "scale(1.02)" } }}>
                            {blog.img && (
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${import.meta.env.VITE_API_URL}/image/${blog.img}`} 
                                    alt={blog.title}
                                    sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", objectFit: "cover" }}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5"  sx={{ fontWeight: "bold",display: "-webkit-box",overflowWrap: "break-word",   overflow: "hidden",
    WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical"}}>
                                    {blog.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {blog.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "space-between" }}>
                                <Button size="small" color="primary" onClick={() => previewBlog(blog._id)}>
                                    Preview
                                </Button>
                                {blog.userId === userId && (
                                    <Button size="small" color="secondary" onClick={() => handleEdit(blog._id, userId)}>
                                        Edit
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Paper sx={{ padding: "20px", textAlign: "center", backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
                        <Typography variant="h6" color="text.secondary">
                            No blogs found.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}

export default MyPosts;
































































































