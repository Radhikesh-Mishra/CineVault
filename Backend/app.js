import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import AuthRoute from './routes/AuthRoute.js'
import MovieRoute from './routes/MovieRoute.js'; 

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect
    (process.env.MONGO_LINK).then(() =>
        app.listen(process.env.PORT, () => console.log(`listening at ${process.env.PORT}`))
    ).catch((error) =>
        console.log('error')
    )

app.use('/auth', AuthRoute);
app.use('/movie', MovieRoute);
