import './Signin.css'
import React, { useState, useContext } from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import {useSignIn } from 'react-auth-kit';

export default function Signin() {

    const paperStyle = {padding: 20, height: '60vh', width:350, margin: "20px auto"}
    const avatarStyle = {backgroundColor: "#23a441"}

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const signIn = useSignIn();

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

            console.log("Response:", response);

            const data = await response.json();
            
            if (response.ok) {
                console.log("User sign-in sucessful:", data);
                signIn({
                    token: data.accessToken, 
                    expiresIn: 3600, 
                    tokenType: "Bearer", 
                    authState: {username: data.user.username},
                });

                navigate('/');
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
                        sx={{backgroundColor: "#23a441", marginBottom: '10px'}} 
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

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
            </Paper>
        </Grid>
    );
}