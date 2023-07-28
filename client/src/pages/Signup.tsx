import './Signup.css'
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { error } from 'console';

export default function Signup() {

    const paperStyle = {padding: 20, height: '60vh', width:350, margin: "20px auto"}
    const avatarStyle = {backgroundColor: "#23a441"}

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;

        setEmail(emailValue);
        setEmailError("");
        setError("");

        if(!emailValue.includes("@")) {
            setEmailError("Invalid email. It must use a @.");
        } else {
            setEmailError("");
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const usernameValue = e.target.value;

        setUsername(usernameValue);
        setUsernameError("");
        setError("");

        if(usernameValue.length < 3) {
            setUsernameError("Usernames must be more than 3 characters long.");           
        } else {
            setUsernameError("");
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;

        setPassword(passwordValue);
        setPasswordError("");
        setError("");

        if(passwordValue.length < 5) {
            setPasswordError("Passwords must be more than 5 characters long.");           
        } else {
            setPasswordError("");
        }
    }

    const submitInfo = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log({username, password, email});


        if (usernameError || emailError || error) {
            return; 
        }

        const userData = {
            email: email,
            username: username,
            password: password,
        };
        
        try {
            const response = await fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
              body: JSON.stringify(userData),
            });
        
            const data = await response.json();
            
            if (response.ok) {
                console.log("User registered:", data);
            } else {
                console.error("Failed to register user:", data.error);
                setError(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid textAlign='center'>
                    <Avatar style={avatarStyle}><PersonIcon/></Avatar>
                    <h2>SIGN UP</h2>                    
                </Grid>

                <form onSubmit={submitInfo}>
                    <TextField
                        label="Email"
                        placeholder="Enter email"
                        fullWidth required
                        value={email}
                        onChange={handleEmailChange}
                        helperText={emailError}
                        error={Boolean(emailError)}
                    />
                    
                    <TextField
                        label="Username"
                        placeholder="Enter username"
                        sx={{margin: "20px auto"}}
                        fullWidth required
                        value={username}
                        onChange={handleUsernameChange}
                        helperText={usernameError}
                        error={Boolean(usernameError)}
                    />

                    <TextField
                        label="Password"
                        placeholder="Enter password"
                        fullWidth required
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        helperText={passwordError}
                        error={Boolean(passwordError)}
                    />

                    <Button
                        className="signUpButton"
                        variant="contained"
                        sx={{backgroundColor: "#23a441", margin: "20px auto"}}
                        fullWidth
                        type="submit"
                    >
                    Sign up
                    </Button>
                </form>

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
            </Paper>
        </Grid>
    );
}