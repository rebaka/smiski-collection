import './Signin.css'
import React, { useEffect, useState, useContext } from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Signin() {

    const paperStyle = {padding: 20, height: '60vh', width:350, margin: "20px auto"}
    const avatarStyle = {backgroundColor: "#23a441"}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const userContext = useContext(UserContext);

    const submitInfo = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log({username, password});

        if (usernameError || error) {
            return; 
        }

        const userData = {
            username: username,
            password: password,
        };
        
        try {
            const response = await fetch("http://localhost:5000/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                  body: JSON.stringify(userData),
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log("User sign-in sucessful:", data);
                userContext?.setUser(data.user);
            } else {
                console.error("Failed to sign-in user:", data.error);
                setError(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
        console.log("Form submitted successfully");
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const usernameValue = e.target.value;

        setUsername(usernameValue);
        setUsernameError("");
        setError("");

    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;

        setPassword(passwordValue);
        setPasswordError("");
        setError("");
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                    <h2>SIGN IN</h2>                    
                </Grid>

                <form onSubmit={submitInfo}>
                    <TextField 
                        label="Username" 
                        placeholder="Enter username"  
                        fullWidth required
                        value={username}
                        onChange={handleUsernameChange}
                        error={Boolean(usernameError)}
                    />    

                    <TextField 
                        label="Password" 
                        placeholder="Enter password" 
                        type="password"
                        sx={{margin: "20px auto"}} 
                        fullWidth required
                        value={password}
                        onChange={handlePasswordChange}
                        error={Boolean(passwordError)}
                    />

                    <Button 
                        className="signInButton" 
                        variant="contained" 
                        sx={{backgroundColor: "#23a441"}} 
                        fullWidth
                        type="submit"
                    >
                        Sign in
                    </Button>
                </form>

                <Typography>
                    Don't have an account?  
                    <Link to="/sign-up" className="signup"> Register</Link>
                </Typography>
            </Paper>
        </Grid>
    );
}