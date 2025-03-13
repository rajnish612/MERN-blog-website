import Input from '@mui/joy/Input';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button,Typography,Box ,TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Preview from './preview';
import Grid from '@mui/material/Grid';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Createblog() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();
    const [formdata, setForm] = useState({ title: "", content: "", img: "" ,description: ""});
    const [blogData, setBlogData] = useState({ title: "", content: "", img: "",description: "" });
    const [userId, setUserId] = useState("");
    const token = localStorage.getItem("token");
    const [searchParams] = useSearchParams();
    const blogId = searchParams.get("id");

    function handleConfirm() {
        if (!formdata.title || !formdata.content || !formdata.description){
            return alert("please fill all the field")
        }
        setConfirm(true);
    }

    useEffect(() => {
        if (!token) {
            alert("Sorry, you must log in to access this page.");
            window.location.href = "/login";
        }
    }, []);

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); 
        }
    }

    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append("title", formdata.title);
            formData.append("content", formdata.content);
            formData.append("description", formdata.description);
            if (file) {
                formData.append("image", file);
            }

            const res = await axios.post(import.meta.env.VITE_API_URL + "/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(res.data.message);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    }

    async function handleEdit() {
        try {
            if (!formdata.title || !formdata.content || !formdata.description) {
                alert("Title , content ,description cannot be empty.");
                return;
            }

            const formData = new FormData();
            formData.append("title", formdata.title);
            formData.append("content", formdata.content);
            formData.append("description", formdata.description);
            if (file) {
                formData.append("image", file);
            } else {
                formData.append("img", blogData.img);
            }

            const res = await axios.patch(
                import.meta.env.VITE_API_URL + `/edit/blog/${blogId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(res.data.message);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error updating blog");
        }
    }
console.log(blogData.img)
    useEffect(() => {
        async function getBlog() {
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/blog", {
                    params: { blogId },
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserId(res.data.user);
                if (res.data.blog.userId !== res.data.user) {
                    navigate("/dashboard");
                }
                setBlogData({
                    title: res.data.blog.title,
                    content: res.data.blog.content,
                    description: res.data.blog.description,
                    img: res.data.blog.img,
                });
                setForm({
                    title: res.data.blog.title,
                    content: res.data.blog.content,
                    description: res.data.blog.description,
                    img: res.data.blog.img,
                });
                if(res.data.blog.img !==null ){
                setPreview(import.meta.env.VITE_API_URL + `/image/${res.data.blog.img}`);
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (blogId) {
            getBlog();
        }
    }, [blogId, token]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
let text = "hello world"
console.log(preview)
    return (
        <>
        {confirm ? (
            <>
                <Box
                    sx={{
                       width: "100%", 
                        
                      
                        borderRadius: "12px", 
                     height: "100%",
                  
                     padding: "10px 10px", 
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", 
                        textAlign: "center", 
                    }}
                >
                    <Preview
                        title={formdata.title}
                        content={formdata.content}
                        image ={preview}
                        description={formdata.description}
                    />
                        <Button onClick={()=>{
                            setConfirm(false)
                        }}  sx={{fontSize: "larger",fontWeight: "1000",margin: "15px"}}>Back</Button>
                    {blogId ? (
                        <Button variant="contained" color="secondary" onClick={handleEdit} sx={{
                            borderRadius: "20px", 
                            
                            backgroundColor: "#d32f2f", 
                            "&:hover": {
                                backgroundColor: "#c62828", 
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" 
                            },
                            fontWeight: "bold", 
                            textTransform: "uppercase", 
                           
                        }}>
                           Confirm Edit
                        </Button>
                    ) : (
                        <Button variant="outlined" color="success" onClick={handleSubmit} sx={{
                            borderRadius: "20px", 
                            padding: "10px 20px", 
                            borderColor: "#4caf50", 
                            color: "#4caf50", 
                            "&:hover": {
                                backgroundColor: "#4caf50", 
                                color: "white", 
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" 
                            },
                            fontWeight: "bold", 
                            textTransform: "uppercase", 
                         
                        }}>
                            Create
                        </Button>
                    )}
                
                </Box>
            </>
       
   
            ) : (
                token && (
                    <Paper
                    elevation={4}
                    sx={{
                        margin: "100px auto",
                        padding: "30px", 
                        maxWidth: "800px", 
                        width: "90%", 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3, 
                        borderRadius: "20px", 
                        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)", 
                        backgroundColor: "#2c2c3e", 
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#f0f0f0", fontWeight: "bold", textAlign: "center" }}>
                        {blogId ? "Edit Your Blog" : "Create a New Blog"}
                    </Typography>
                    <input
                        placeholder="Title"
                        onChange={handleChange}
                        name="title"
                        style={{ width: "100%", backgroundColor: "#fff", borderRadius: "10px", padding: "10px" }}
                        maxLength={100}
                        value={formdata.title}
                    />
            
                    <input
                    id ="addFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ margin: "20px 0", borderRadius: "10px", padding: "10px", border: "1px solid #ccc",display: "none" }}
                    />
                        <label htmlFor='addFile'>
        <Button  component="span">
          <AttachFileIcon />{blogId?(<> Add or change image</>):(<> Add image</>)}
        </Button>
      </label>
                    {(preview !==null || blogData.img  ) && (
                        <img
                            src={preview || import.meta.env.VITE_API_URL + `/image/${blogData.img}`}
                            alt="Preview"
                            style={{
                                width: "100%",
                                maxHeight: "500",
                                objectFit: "cover",
                                borderRadius: "10px",
                                marginBottom: "20px", 
                            }}
                        />
                    )}
            
                    <textarea
                        placeholder="Description"
                        onChange={handleChange}
                        name="description"
                        multiline
                        rows={4} 
                        variant="outlined"
                        fullWidth
                        value={formdata.description}
                        sx={{
                            marginBottom: "20px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#fff", 
                                borderRadius: "10px", 
                                padding: "10px", 
                            },
                        
                        }}
                        maxLength={600}
                        style={{ width: "100%", backgroundColor: "#fff", borderRadius: "10px", padding: "10px" }}
                    />
                    <TextField
                        placeholder="Content"
                        onChange={handleChange}
                        name="content"
                        multiline
                        rows={6} 
                        variant="outlined"
                        fullWidth
                        value={formdata.content}
                        sx={{
                            marginBottom: "20px",
                            "& .MuiInputBase-input": {
                                backgroundColor: "#fff", 
                                borderRadius: "10px", 
                                padding: "10px", 
                            },
                        }}
                    />
            
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                        sx={{
                            borderRadius: "20px", 
                            padding: "10px 20px", 
                            "&:hover": {
                                backgroundColor: "#303f9f", 
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", 
                            },
                        }}
                    >
                        Preview
                    </Button>
                </Paper>
                
   
)
)}
</>
);
}

export default Createblog;



