import { TextField,Button, Box, Input, Typography } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useNavigate } from "react-router-dom";

function Reset(){
    const navigate = useNavigate()
    const [formData,setForm] = useState({})
    const token = localStorage.getItem("token")
    const [click,setClick] = useState(false)
    const[message,setMessage] = useState("")
    console.log(token)
    async function handleClick() {
     setClick(true)
     try{
     let res = await axios.post(import.meta.env.VITE_API_URL+"/reset/account",  formData,{
        headers: {Authorization: `Bearer ${token}`},
      
     })
     alert(res.data.message)
       setMessage(res.data.message)
    }catch(err){
        setClick(false)
        setMessage(err.response.data.message)
        alert(err.response.data.message)
    }
   
    }
    useEffect(()=>{
        if(message){
            setClick(false)
         }
    },[message])
  async function handleEdit() {
    
    try{
    let res = await axios.patch(import.meta.env.VITE_API_URL+"/reset", formData,{
        headers: {Authorization: `Bearer ${token}`},
        
     })
     localStorage.removeItem("token")
     alert(res.data.message)
     
     navigate('/login')
    }catch(error){
        alert(error.response.data.message);
        
    }
  }
    function handleChange(e){
        const {name,value} = e.target
        setForm((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    console.log(formData)

return (<>
<Box sx={{color: "white",height: "400px",width: "400px",backgroundColor: "white",margin: "150px auto",borderRadius: "20px",display:"flex",justifyContent: "center",alignItems: "center",
    flexDirection:"column",gap: '10px',boxShadow:"4px 4px 15px blue,-4px -4px 15px red"

}}>
{click?<CircularProgress/>:{...message==="Successfully sent otp"?<><TextField  name="OTP" onChange={handleChange} label="Enter OTP"></TextField><Button onClick={handleEdit} sx={{backgroundColor: "red",color: "white",fontWeight: "bolder",marginTop: "40px" }}>CONFIRM</Button></>:
<><Typography variant="h5" sx={{color: "black",fontWeight: "bolder"}}>Reset Your Password</Typography>


  <TextField variant="outlined" onChange={handleChange} name="username"  label="enter email"></TextField>
  <TextField variant="outlined" onChange={handleChange} name="password"  label="enter new password"></TextField>
 
  <Button variant="contained" onClick={handleClick} sx={{backgroundColor: "red"}}>Confirm</Button></>}}
 
    </Box></>)
}
export default Reset