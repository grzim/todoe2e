import mongoose from 'mongoose';
import { expressWs } from "./index"
const ToDos = mongoose.model('ToDos');

// Task: Return completed tasks
// add function that will be added to ulr /todos/completed/
// it should return all completed tasks in DB
// take care of correct routes registration

// Task: Return completed or incompleted tasks
// add function that will be added to ulr /todos/completed/:isCompleted
// it should return all tasks which isCompleted property is equal to route parameter isCompleted


// Task: Fill the db
// Add mechanism that will generate N objects with random values (but correct against validators)
// all objects should be added to the DB (only when unique)
// Mechanism should be attached to the url /todos/fill/:n

const sendAllToDos = (res) => {
  ToDos.find({}, (err, toDo) => {
    if (err)
      res.send(err);
    res.json(toDo);
  });
}

const notifyWithNewTodos = (res) => {
  // so far we are just sending back list of all todos
  sendAllToDos(res)
  // Task: updates via WebSocket
  // // in order to switch to ws notifications add implementation to this funciton -> Task: updates via WebSocket
  // // when the implementation is provided the above function can be commented out
  // sendAllToDosOverWs(res)
}

// Task: updates via WebSocket
// add ws notification that will be send when toDos are updated
const sendAllToDosOverWs = (res) => ToDos.find({}, (err, toDos) => {
  // this line will give us the pointer to websocket we are using in the app
  const webSocket = [...expressWs.getWss().clients][0];
  if (err)
    res.send(err);

  // here whe should send over the ws a stringified (use JSON.stringify) object with propertied type and data
  // webSocket.send ....
});



export const list_all_toDos = (req, res) => {
  sendAllToDos(res);
};



export const add_toDo = (req, res) => {
  // Task: add only when unique
  // check if the name already exists and if so do not add it
  const new_toDo = new ToDos(req.body);
  new_toDo.save((err, toDo) => {
    if (err)
      res.send(err);
    notifyWithNewTodos(res);
  });
};


export const add_toDos = (req, res) => {
  // Task: implement adding many todos
  // check for every toDos if the name already exist and if so do not add it
  // when data will be send POST /todos/ there should be functionality to distinguish if one object should be added
  // or array (distinguish between add_toDo and add)toDos
};


// Task 'queryParams': add query params handing for obtaining only properties that have been sent from client
export const get_details = ({params: {name}, query}, res) => {
  ToDos.findOne(({name}), (err, toDo) => {
    if (err)
      res.send(err);
    res.send(toDo);
  })
};

export const update_a_toDo = ({body, params: {name}}, res) => {
  ToDos.findOneAndUpdate({name}, body, {new: true}, (err, toDo) => {
    if (err)
      res.send(err);
    notifyWithNewTodos(res);
  })
};

export const delete_a_toDo = ({params: {name}}, res) => {
  ToDos.remove({
    name
  }, (err) => {
    if (err)
      res.send(err);
    notifyWithNewTodos(res);
  });
};


export const delete_all_toDo = (req, res) => {
  ToDos.deleteMany({}, (err) => {
    if (err)
      res.send(err);
    notifyWithNewTodos(res);
  });
};

// Task: Filtering of toDos
// add functionality to return only todos that consist of phrase sent in req
export const list_toDos_including = async (body /* use destructring here to get the phrase*/, res) => {
    // if no phrase provided return all toDos

  // when there is a phrase all tasks will be returned with the following implementaion:
    ToDos.find(phrase ? {name: {$regex: phrase}} : {}, (err, task) => {
        if (err)
          res.send(err);
        console.log(phrase)
        res.json(task);
      },
    );
  // solve issues in routes.js file if you get some errors.
  // It will be probably connected with the fact that router
  // checks against every route pattern in the order in which rotues have been registered in app
};

// *Advanced Task: Server Side Debounce
// add functionality that server will not respond to every query but will be responding after 2 seconds after the last query (debounce)
