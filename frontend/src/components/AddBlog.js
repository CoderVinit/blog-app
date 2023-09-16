import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        imageURL: "",
    })
    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5001/api/blog/add", {
            title: inputs.title,
            description: inputs.description,
            image: inputs.imageURL,
            user: localStorage.getItem("userId"),
        }).catch((err) => console.log(err));
        const data = await res.data;
        return data;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then((data) => console.log(data)).then(() => navigate("/myBlogs/"))
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div style={{ background: " radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(183,182,221,1) 61%, rgba(176,183,223,1) 69%, rgba(148,187,233,1) 100%)", paddingTop: "40px", height: "90vh" }}>
            <form onSubmit={handleSubmit} >
                <Box display={'flex'} flexDirection={'column'} sx={{ background: "#E4F1FF", width: "60%", margin: 'auto', paddingBottom: "20px", boxShadow: "10px 10px 20px #DBC4F0", paddingLeft: "60px", paddingRight: "60px" }} textAlign={'center'} justifyContent={'center'} borderRadius={10} >
                    <Typography sx={{ marginTop: '5px', marginBottom: '50px', textShadow: "5px 5px 10px #ccc" }} variant='h3'>Post your Blog</Typography>
                    <InputLabel sx={{ marginBottom: '20px', textShadow: "2px 2px 4px #ccc", fontSize: "2rem", fontWeight: 'bold' }} >Title</InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} sx={{ background: "#F3FDE8", marginBottom: '30px' }} />

                    <InputLabel sx={{ marginBottom: '20px', textShadow: "2px 2px 4px #ccc", fontSize: "2rem", fontWeight: 'bold' }} >Description</InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} sx={{ background: "#F3FDE8", marginBottom: '30px' }} />

                    <InputLabel sx={{ marginBottom: '20px', textShadow: "2px 2px 4px #ccc", fontSize: "2rem", fontWeight: 'bold' }} >ImageURl</InputLabel>
                    <TextField name='imageURL' value={inputs.imageURL} onChange={handleChange} sx={{ background: "#F3FDE8", marginBottom: '30px' }} />

                    <Button type='submit' sx={{
                        width: "10%", margin: "auto", backgroundColor: '#EA906C', boxShadow: '3px 3px 6px #000', color: 'white', ':hover': {
                            color: '#fff',
                            bgcolor: '#ED2B2A',
                            boxShadow: "5px 5px 10px #000"
                        }
                    }}>Submit</Button>
                </Box>
            </form>
        </div >
    )
}

export default AddBlog
