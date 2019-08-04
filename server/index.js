import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "./model";
import router from './routes';
import mongoose from "mongoose"

const app = express(),
  port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/Tododb');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type : '*/*' }));
router(app);
app.listen(port);

console.log('todo list RESTful API server started on: '  + port);
