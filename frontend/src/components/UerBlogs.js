import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blog from './Blog'

const UerBlogs = () => {
    const [user, setUser] = useState()
    const userId = localStorage.getItem("userId");
    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:5001/api/blog/user/${userId}`).catch((err) => console.log(err))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then((data) => setUser(data.user))

    }, [])
    console.log(user);

    return (
        <div style={{ background: "radial-gradient(circle, rgba(247,131,131,1) 0%, rgba(177,176,208,1) 61%, rgba(196,176,191,1) 69%, rgba(148,187,233,1) 100%)", paddingTop: "25px", paddingBottom: "20px" }}>
            {user && user.blogs && user.blogs.map((blog, index) => (<Blog key={index} id={blog._id} isUser={true} title={blog.title} description={blog.description} image={blog.image} user={user.name} />))}
        </div>
    )
}

export default UerBlogs
