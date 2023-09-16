import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetail = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    const [inputs, setInputs] = useState()
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const fetchDetails = async (e) => {
        const res = await axios.get(`http://localhost:5001/api/blog/${id}`).catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        fetchDetails().then((data) => {
            setBlog(data.blog)
            setInputs({ title: data.blog.title, description: data.blog.description })
        })
    }, [id]);

    const sendRequest = async () => {
        const res = await axios.put(`http://localhost:5001/api/blog/update/${id}`, {
            title: inputs.title,
            description: inputs.description
        }).catch(err => console.log(err))

        const data = await res.data;
        return data;
    }
    console.log(blog);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data => console.log(data)).then(() => navigate("/myBlogs/"))
    }

    return (
        <div>
            {inputs && (
                <form onSubmit={handleSubmit} >
                    <Box display={'flex'} borderColor={"2px solid linear-gradient(90deg, rgba(24,190,185,1) 0%, rgba(173,218,72,1) 35%, rgba(232,26,161,1) 100%)"} flexDirection={'column'} sx={{ width: "70%", margin: 'auto', marginTop: "30px", padding: "30px", boxShadow: "10px 10px 20px #DBC4F0" }} textAlign={'center'} justifyContent={'center'} borderRadius={10}>
                        <Typography sx={{ marginTop: '5px', marginBottom: '50px', textShadow: "5px 5px 10px #ccc" }} variant='h3'>Post your Blog</Typography>
                        <InputLabel sx={{ marginBottom: '20px', textShadow: "2px 2px 4px #ccc", fontSize: "2rem", fontWeight: 'bold' }} variant='h4'>Title</InputLabel>
                        <TextField name='title' value={inputs.title} onChange={handleChange} sx={{ marginBottom: '30px' }} />

                        <InputLabel sx={{ marginBottom: '20px', textShadow: "2px 2px 4px #ccc", fontSize: "2rem", fontWeight: 'bold' }} >Description</InputLabel>
                        <TextField name='description' value={inputs.description} onChange={handleChange} sx={{ marginBottom: '30px' }} />

                        <Button type='submit' sx={{
                            width: "10%", margin: "auto", backgroundColor: '#EA906C', boxShadow: '3px 3px 6px #000', color: 'white', ':hover': {
                                color: '#fff',
                                bgcolor: '#ED2B2A',
                                boxShadow: "5px 5px 10px #000"
                            }
                        }}>Submit</Button>
                    </Box>
                </form>)}
        </div>
    )
}

export default BlogDetail
