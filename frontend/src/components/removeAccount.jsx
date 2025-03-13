import { TextField,Button, Box, Input, Typography } from "@mui/material"
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useNavigate } from "react-router-dom";

function RemoveAccount(){
    const navigate = useNavigate()
    const [formData,setForm] = useState({})
    const token = localStorage.getItem("token")
    const [click,setClick] = useState(false)
    const[message,setMessage] = useState("")
    async function handleClick() {
     setClick(true)
     try{
     let res = await axios.post(import.meta.env.VITE_API_URL+"/remove/account",  formData,{
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
  async function handleDelete() {
    try{
    let res = await axios.delete(import.meta.env.VITE_API_URL+"/remove", {
        headers: {Authorization: `Bearer ${token}`},
        data: formData
     })
     localStorage.removeItem("token")
     alert(res.data.message)
     
     navigate('/')
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
{click?<CircularProgress/>:{...message==="Successfully sent otp"?<><TextField onChange={handleChange} name="OTP" label="Enter OTP"></TextField><Button onClick={handleDelete} sx={{backgroundColor: "red",color: "white",fontWeight: "bolder",marginTop: "40px" }}>CONFIRM</Button></>:
<><Typography variant="h5" sx={{color: "black",fontWeight: "bolder"}}>Delete Account?</Typography>
<PersonRemoveIcon sx={{color:"gray"}}/>
 <Typography variant="body1" sx={{color:'gray',fontWeight:"lighter",textAlign: "center",padding: "10px"}}>Deleting your profile will remove all your personal data</Typography>
  <TextField variant="outlined" name="username" onChange={handleChange} label="enter email"></TextField>
 
  <Button variant="contained" onClick={handleClick} sx={{backgroundColor: "red"}}>Confirm</Button></>}}
 
    </Box></>)
}
export default RemoveAccount