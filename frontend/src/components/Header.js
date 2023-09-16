import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../store'


const Header = () => {
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const [value, setValue] = useState()
    return (
        <AppBar position='sticky' top="0" sx={{ background: "#96B6C5" }}>
            <Toolbar>
                <Typography variant='h4'>BlogApp</Typography>
                {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                    <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to='/blogs' label="All Blogs" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
                    </Tabs>
                </Box>}
                <Box display="flex" marginLeft="auto" >
                    {!isLoggedIn && <><Button
                        LinkComponent={Link}
                        to="/login"
                        variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Login</Button>
                        <Button
                            LinkComponent={Link}
                            to="/login"
                            variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Signup</Button></>}
                    {isLoggedIn && <Button
                        onClick={() => dispath(loginAction.logout())}
                        LinkComponent={Link}
                        to="/login"
                        variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Logout</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
