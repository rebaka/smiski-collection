import express, {Request, Response} from "express";
import mongoose from "mongoose";

//looks at dotenv file to load into environment variables
import {config} from 'dotenv'
config();

import Smiski from "./models/Smiski";

const PORT = 5000;

const app = express();

//middlewear function, tell express to use, runs express.json first
app.use(express.json());

app.post('/smiski', async (req: Request, res: Response) => {
    const newSmiski = new Smiski({  //create new smiski instance and saves it
        name: req.body.name,
    });
    const createdSmiski = await newSmiski.save();
    res.json(createdSmiski);
});

app.get('/', (req, res) => {
    res.send(" Worssssls");
});

const db = mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
})