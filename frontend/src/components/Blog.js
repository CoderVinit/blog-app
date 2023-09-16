import React from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const Blog = ({ title, description, image, user, isUser, id }) => {
    const navigate = useNavigate();
    const handleEdit = async (e) => {
        navigate(`/myBlogs/${id}`)
        console.log(id);
    }
    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:5001/api/blog/${id}`).catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    const handleDelete = (e) => {
        deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs/"))
    }

    console.log(title, isUser);
    return (
        <div>
            <Card sx={{
                width: "40%", margin: "auto", marginTop: 2, paddingTop: "4px", padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover:": {
                    boxShadow: "10px 10px 20px #ccc"
                }
            }}>
                {isUser && (
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <IconButton color='warning' onClick={handleEdit}><EditIcon /></IconButton>
                        <IconButton color='error' onClick={handleDelete}><DeleteIcon /></IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
                            {user}
                        </Avatar>
                    }
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt="Paella dish"
                />

                <CardContent>
                    <hr />
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        <b>{user}{": "}</b>{description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Blog
