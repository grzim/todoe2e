import mongoose from 'mongoose';
const ToDos = mongoose.model('ToDos');

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
    res.json(toDo);
  });
};


export const read_a_toDo = (req, res) => {
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
    res.json(toDo);
  })
};


export const delete_a_toDo = (req, res) => {
  ToDos.remove({
    _id: req.params.todoId
  }, (err) => {
    if (err)
      res.send(err);
    res.json({ message: 'ToDo successfully deleted' });
  });
};



export const delete_all_toDo = (req, res) => {
  ToDos.deleteMany({}, (err) => {
    if (err)
      res.send(err);
    res.json({ message: 'All ToDos successfully deleted' });
  });
};
