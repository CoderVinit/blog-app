import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginAction } from '../store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [isSignUp, setisSignUp] = useState(false)
    const [Inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const sendRequest = async (type = "login") => {
        const res = await axios.post(`http://localhost:5001/api/user/${type}`, {
            name: Inputs.name,
            email: Inputs.email,
            password: Inputs.password
        }).catch((err) => console.log(err))

        const data = await res.data;
        console.log(data);
        return data;
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(Inputs);
        if (isSignUp) {
            sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispath(loginAction.login())).then(() => navigate('/blogs')).then(data => console.log(data));
        }
        else {
            sendRequest().then((data) => localStorage.setItem("userId", data.user._id)).then(() => dispath(loginAction.login())).then(() => navigate('/blogs')).then(data => console.log(data))
        }
    }
    return (
        <div style={{ background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
                <Box display={'flex'} textAlign={'center'} justifyContent={'center'} flexDirection={'column'} maxWidth={300} margin={'auto'} boxShadow={' 10px 10px 20px #ccc'} padding={3} marginTop={5} borderRadius={5} paddingLeft={10} paddingRight={10} background={'white'}>
                    <Typography padding={3} textAlign={'center'} fontSize={40} textTransform={'uppercase'}>{isSignUp ? "Signup" : "Login"}</Typography>
                    {isSignUp && <TextField name='name' onChange={handleChange} value={Inputs.name} placeholder='Name' margin='normal' />
                    } <TextField name='email' onChange={handleChange} value={Inputs.email} type='email' placeholder='Email' margin='normal' />
                    <TextField name='password' onChange={handleChange} value={Inputs.password} type='password' placeholder='Password' margin='normal' />
                    <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
                    <Button onClick={() => setisSignUp(!isSignUp)} sx={{ borderRadius: 3, marginTop: 3 }}>{isSignUp ? "Login" : "Signup"}</Button>
                </Box>
            </form>
        </div>
    )
}
export default Login
