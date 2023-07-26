import './Signup.css'
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';

export default function Signup() {

    const paperStyle = {padding: 20, height: '50vh', width:350, margin: "20px auto"}
    const avatarStyle = {backgroundColor: "#23a441"}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                    <h2>SIGN UP</h2>                    
                </Grid>
                <TextField label="Email" placeholder="Enter email" fullWidth required></TextField>
                <TextField label="Username" placeholder="Enter username" sx={{margin: "20px auto"}} fullWidth required ></TextField>
                <TextField label="Password" placeholder="Enter password" fullWidth required></TextField>

                <Button className="signUpButton" variant="contained" sx={{backgroundColor: "#23a441", margin: "20px auto"}} fullWidth>Sign up</Button>

            </Paper>
        </Grid>
    );
}