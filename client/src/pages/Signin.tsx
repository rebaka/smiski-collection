import './Signin.css'
import { Avatar, Button, Grid, Paper, TextField, makeStyles } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';

export default function Signin() {

    const paperStyle = {padding: 20, height: '50vh', width:350, margin: "20px auto"}
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

                <Button className="signInButton" variant="contained" sx={{backgroundColor: "#23a441", marginTop: "20px auto"}} fullWidth>Sign in</Button>
                <Typography>
                    Don't have an account? Register
                </Typography>
            </Paper>
        </Grid>
    );
}