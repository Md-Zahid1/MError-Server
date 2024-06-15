import express from "express";
import { APP_PORT, DB_URL } from "./config/index.js";
import bodyParser from "body-parser";
import routes from './routes/index.js'
import path from 'path'
import mongoose from "mongoose";
import cors from 'cors'



const app = express();
const jsonParsor = bodyParser.json()

//databass connect
mongoose.connect(DB_URL)
    .then(() => { console.log('dataconnected') })

app.use(cors())
app.use(jsonParsor)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', routes)


app.listen(APP_PORT, () => console.log(`listning on port ${APP_PORT}`))