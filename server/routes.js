import {
  add_toDo,
  delete_a_toDo,
  delete_all_toDo,
  list_all_toDos,
  get_details,
  update_a_toDo,
  list_toDos_including
} from "./controller"
export default (app) => {

  // todoList Routes
  app.route('/todos')
    .get(list_all_toDos)
    .post(add_toDo)
    .delete(delete_all_toDo);

  app.route('/todos/includes/:phrase')
//    uncomment after the implementation of list_toDos_including function
//    .get(list_toDos_including)

  app.route('/todos/:name')
    .get(get_details)
    .put(update_a_toDo)
    .delete(delete_a_toDo);
};

