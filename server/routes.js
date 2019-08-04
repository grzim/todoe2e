import {create_a_toDo, delete_a_toDo, delete_all_toDo, list_all_toDos, read_a_toDo, update_a_toDo} from "./controller"

export default (app) => {

  // todoList Routes
  app.route('/todos')
    .get(list_all_toDos)
    .post(create_a_toDo)
    .delete(delete_all_toDo);

  app.route('/todos/:todoId')
    .get(read_a_toDo)
    .put(update_a_toDo)
    .delete(delete_a_toDo);
};
