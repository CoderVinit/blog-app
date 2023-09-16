import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

const Blogs = () => {
    const [blogs, setblogs] = useState()
    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5001/api/blog").catch((err) => console.log(err))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest().then((data) => setblogs(data.blogs))
    },
        [])
    console.log(blogs);

    return (
        <div style={{ background: "radial-gradient(circle, rgba(247,131,131,1) 0%, rgba(177,176,208,1) 61%, rgba(196,176,191,1) 69%, rgba(148,187,233,1) 100%)", paddingTop: "25px", paddingBottom: "30px" }}>
            {blogs && blogs.map((blog, index) => (<Blog
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                title={blog.title} description={blog.description} image={blog.image} user={blog.user.name} />))}
        </div>

    )
}

export default Blogs
