import React from 'react';
import {IconButton, AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Home } from '@mui/icons-material'

export default function Navbar(){

    const navigate = useNavigate()
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            onClick={() => navigate("/")}
                            aria-label="home"
                            >
                            <Home style={{ maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' }}/>
                        </IconButton>

                        <Button variant='contained' color='primary' onClick={()=> navigate("/persons/new")}>
                            New Person
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}