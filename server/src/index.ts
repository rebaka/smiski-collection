import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//looks at dotenv file to load into environment variables
import {config} from 'dotenv'
config();

import Smiski from "./models/Smiski";
import User from "./models/User";
import CheckedSmiski from "./models/CheckedSmiski"

//Change port number once deployed
const PORT = process.env.PORT || 5000;

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

const jwt = require('jsonwebtoken');

//For sign-in 
app.post('/sign-in', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        const passwordMatches = await bcrypt.compare(password, user.password);
  
        if (passwordMatches) {
          const accessToken = jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET);
          const responseData = {
            message: 'Successful sign-in.',
            user: user,
            accessToken: accessToken,
          };
          console.log('Response data:', responseData);
          res.json(responseData);
        } else {
          res.status(401).json({ error: 'Username and/or password is incorrect.' });
        }
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.log('Sign-in error', error);
      res.status(500).json({ error: 'Server error.' });
    }
  });

//For adding and updating checked items
app.post('/api/checked', async (req, res) => {
    const { username, smiskiId, isChecked } = req.body;
    try {
        if (isChecked) {
            const checkedSmiski = new CheckedSmiski({
                username: username,
                smiskiId: smiskiId,
                isChecked: true
            });

            const createdCheckedSmiski = await checkedSmiski.save();

            const response = {
                message: 'Checked item added to database',
                checkedSmiski: createdCheckedSmiski
            };

            res.status(200).json(response);
        } else {
            await CheckedSmiski.findOneAndDelete({
                username: username,
                smiskiId: smiskiId
            });

            res.status(200).json({ message: 'Unchecked item removed from database' });
        }
    } catch (error) {
        console.log('Error updating checked items', error);
        res.status(402).json({ error: 'Server error' });
    }
});

app.get('/api/checked/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const checkedSmiskis = await CheckedSmiski.find({ username: username });
        res.status(200).json({ checkedSmiskis: checkedSmiskis });
    } catch (error) {
        console.log('Error retrieving checked items', error);
        res.status(500).json({ error: 'Server error' });
    }
});