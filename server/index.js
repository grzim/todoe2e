import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "./model";
import router from './routes';
import mongoose from "mongoose"
import {apiPort} from "../commons/config"
import expressws from "express-ws"
import {wsInit} from "./websocket"

const app = express(),
  port = process.env.PORT || apiPort;
export const expressWs = expressws(app)

mongoose.connect('mongodb://localhost/Tododb');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type : '*/*' }));
// add authentication middleware
wsInit(app, expressWs);
router(app);
app.listen(port);

console.log('todo list RESTful API server started on: '  + port);
