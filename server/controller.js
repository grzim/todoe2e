import mongoose from 'mongoose';
import {debounce} from "../commons/debounce"
import {debounceTime} from "../commons/config"
import { expressWs } from "./index"
const ToDos = mongoose.model('ToDos');

const debounced = debounce()

const sendAllToDosOverWs = (res) => ToDos.find({}, (err, toDos) => {
  if (err)
    res.send(err);
  else [...expressWs.getWss().clients][0].send(JSON.stringify({type: 'update', data: toDos}))
});

export const list_all_toDos = (req, res) => {
  ToDos.find({}, (err, toDo) => {
    if (err)
      res.send(err);
    res.json(toDo);
  });
};

export const create_a_toDo = (req, res) => {
  const new_toDo = new ToDos(req.body);
  new_toDo.save((err, toDo) => {
    if (err)
      res.send(err);
    sendAllToDosOverWs(res);
  });
};

export const get_details = ({params: {name}, query}, res) => {
  ToDos.findOne({name},[].concat(query.param).join(" "), (err, toDo) => {
    if (err)
      res.send(err);
    else {
      sendAllToDosOverWs();
    }
  })
};

export const update_a_toDo = ({body, params: {name}}, res) => {
  ToDos.findOneAndUpdate({name}, body, {new: true}, (err, toDo) => {
    if (err)
      res.send(err);
    sendAllToDosOverWs(res);
  })
};

export const delete_a_toDo = ({params: {name}}, res) => {
  ToDos.remove({
    name
  }, (err) => {
    if (err)
      res.send(err);
    sendAllToDosOverWs();
  });
};


export const delete_all_toDo = (req, res) => {
  ToDos.deleteMany({}, (err) => {
    if (err)
      res.send(err);
    sendAllToDosOverWs();
  });
};

export const list_toDos_including = async function({params: {phrase}}, res) {
  await debounced(debounceTime, null, (_, phrase, res) =>{
    if(!phrase) list_all_toDos(_, res);
    else ToDos.find(phrase ? {name: {$regex: phrase}} : {}, (err, task) => {
        if (err)
          res.send(err);
        console.log(phrase)
        res.json(task);
      },
    )},(_, res) => res.end(), phrase, res);
};
