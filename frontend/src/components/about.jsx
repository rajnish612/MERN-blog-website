
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            backgroundColor: "#141624",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            fontFamily: `Kanit, serif`,
            color: "whitesmoke",
            position: "relative",
            overflow: "hidden"
        }}>
            <Box sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(15px)",
                maxWidth: "600px",
                margin: "20px",
                textAlign: "center"
            }}>
                <Typography variant="h2" sx={{ marginBottom: "20px", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    About Us
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "20px", lineHeight: 1.6 }}>
                    Welcome to Gen Blog! We are dedicated to providing insightful articles, creative ideas, and expert knowledge. Our mission is to inspire and empower our readers to explore new ideas and stay updated on the latest trends in technology, web development, and personal growth.
                </Typography>
                <Typography variant="h6" sx={{ lineHeight: 1.6 }}>
                    My name is Rajnish Nath, and I am a full stack web developer. You can reach me at 
                    <a href="mailto:rnish612@gmail.com" style={{ color: "#ffcc00", textDecoration: "underline", marginLeft: "5px",fontFamily:"arial" }}>
                        rnish612@gmail.com
                    </a>.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "20px",
                        background: "linear-gradient(90deg, #4B4BCF, #6A11CB)", 
                        color: "white",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        '&:hover': {
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
                        },
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </Box>
        </Box>
    );
}

export default AboutUs;