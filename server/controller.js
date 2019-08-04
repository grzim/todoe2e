import mongoose from 'mongoose';
import {debounce} from "../commons/debounce"
import {debounceTime} from "../commons/config"
const ToDos = mongoose.model('ToDos');

const debounced = debounce()

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
    list_all_toDos(req, res);
  });
};

export const get_details = (req, res) => {
  ToDos.findById(req.params.todoId, (err, toDo) => {
    if (err)
      res.send(err);
    res.json(toDo);
  })
};

export const update_a_toDo = (req, res) => {
  ToDos.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}, (err, toDo) => {
    if (err)
      res.send(err);
    list_all_toDos(req, res);
  })
};

export const delete_a_toDo = (req, res) => {
  ToDos.remove({
    _id: req.params.todoId
  }, (err) => {
    if (err)
      res.send(err);
    list_all_toDos(req, res);
  });
};


export const delete_all_toDo = (req, res) => {
  ToDos.deleteMany({}, (err) => {
    if (err)
      res.send(err);
    list_all_toDos(req, res);
  });
};

export const list_toDos_including = async function({params: {phrase}}, res) {
  await debounced(debounceTime, null, (_, phrase, res) =>{
    if(!phrase) list_all_toDos(_, res);
    else ToDos.find(phrase ? {name: {$regex: phrase}} : {}, (err, task) => {
        if (err)
          res.send(err);
        res.json(task);
      },
    )},(_, res) => res.end(), phrase, res);
};
