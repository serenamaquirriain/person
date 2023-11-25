import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar(){

    const navigate = useNavigate()
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography sx={{flexGrow: 1}}>
                            <Link to="/" style={{textDecoration:'none'}}>Person List</Link>
                        </Typography>

                        <Button variant='contained' color='primary' onClick={()=> navigate("/users/new")}>
                            New User
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}