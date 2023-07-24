import express, {Request, Response} from "express";
import mongoose from "mongoose";
import cors from 'cors';
import fs from 'fs';

//looks at dotenv file to load into environment variables
import {config} from 'dotenv'
config();

import Smiski from "./models/Smiski";
import path from "path";

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: "*",
    }));
//middlewear function, tell express to use, runs express.json first
app.use(express.json());

//Fetches all data from mongoDB in Smiski collection 
app.get('/smiski', async (req: Request, res: Response) => {
    const smiskis = await Smiski.find(); //change Smiski to the name of specific collection to change
    res.json(smiskis);
})

app.post('/smiski', async (req: Request, res: Response) => {
    const newSmiski = new Smiski({  //create new smiski instance and saves it
        name: req.body.name,
    });
    const createdSmiski = await newSmiski.save();
    res.json(createdSmiski);
});

app.get('/', (req: Request, res: Response) => {
    res.send(" Testing");
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
})