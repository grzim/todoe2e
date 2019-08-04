import {create_a_toDo, delete_a_toDo, delete_all_toDo, list_all_toDos, get_details, update_a_toDo} from "./controller"

export default (app) => {

  // todoList Routes
  app.route('/todos')
    .get(list_all_toDos)
    .post(create_a_toDo)
    .delete(delete_all_toDo);

  app.route('/todos/:todoId')
    .get(get_details)
    .put(update_a_toDo)
    .delete(delete_a_toDo);
};
