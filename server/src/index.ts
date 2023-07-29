import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from 'cors';

//looks at dotenv file to load into environment variables
import {config} from 'dotenv'
config();

import Smiski from "./models/Smiski";
import User from "./models/User";
import { error } from 'console';

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: "*",
    }));
//middlewear function, tell express to use, runs express.json first
app.use(express.json());

//Fetches all data from mongoDB in Smiski collection 
app.get('/smiski', async (req, res) => {
    const smiskis = await Smiski.find(); //change Smiski to the name of specific collection to change
    res.json(smiskis);
})

app.post('/smiski', async (req, res) => {
    const newSmiski = new Smiski({  //create new smiski instance and saves it
        name: req.body.name,
    });
    const createdSmiski = await newSmiski.save();
    res.json(createdSmiski);
});

app.get('/', (req, res) => {
    res.send(" Testing");
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
})

//need to fetch user data
app.get('/user', async (req, res) => {
    const users = await User.find(); 
    res.json(users);
})

//need to post user data to database
app.post('/user', async(req, res) => {
    try {
        const {email, username, password} = req.body; 

        //Checks for if email and username are already in the database
        const exists = await User.findOne({ $or: [{ email }, { username }] });
        if(exists) {
            return res.status(400).json({error: "Username and/or email is already taken. Please input another one."});
        }

        const newUser = new User({
            email: req.body.email, 
            username: req.body.username,
            password: req.body.password,
        });

        const createdUser = await newUser.save();
        res.json(createdUser)

    } catch(error) {
        console.log("Error", error);
    }
});

//For sign-in 
app.post('/sign-in', async (req, res) => {
    const {username, password} = req.body; 

    try {
        const users = await User.find(); 

        const correctUser = users.find(
            (user) => user.username === username && user.password === password
        );

        if(correctUser) {
            res.json({message: "Successful sign-in.", user: correctUser});
        } else {
            res.status(415).json({error: "Invalid credentials."})
        }

    } catch(error) {
        console.log("Sign-in error", error);
        res.status(450).json({error: "Server error."})
    }

    
    // res.json(users);
})

// app.post('/sign-out', async (req, res) => {
//     const {username, password} = req.body; 

//     try {
//         const users = await User.find(); 

//         const correctUser = users.find(
//             (user) => user.username === username && user.password === password
//         );

//         if(correctUser) {
//             res.json({message: "Successful sign-in.", user: correctUser});
//         } else {
//             res.status(415).json({error: "Invalid credentials."})
//         }

//     } catch(error) {
//         console.log("Sign-in error", error);
//         res.status(450).json({error: "Server error."})
//     }

    
//     // res.json(users);
// })

//fetch user collection data

//post user collection/choice

//put to update data