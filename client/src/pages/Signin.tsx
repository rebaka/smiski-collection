import './Signin.css'
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Signin() {

    const paperStyle = {padding: 20, height: '60vh', width:350, margin: "20px auto"}
    const avatarStyle = {backgroundColor: "#23a441"}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                    <h2>SIGN IN</h2>                    
                </Grid>
                <TextField label="Username" placeholder="Enter username"  fullWidth required></TextField>
                <TextField label="Password" placeholder="Enter password" sx={{margin: "20px auto"}} fullWidth required></TextField>

                <Button className="signInButton" variant="contained" sx={{backgroundColor: "#23a441"}} fullWidth>Sign in</Button>
                <Typography>
                    Don't have an account?  
                    <Link to="/sign-up" className="signup"> Register</Link>
                </Typography>

                
            </Paper>
        </Grid>
    );
}