import {view} from "../view/view.js"
import toDos from "../model.js"
import {
  addTaskDispatch,
  deleteTaskDispatch,
  editTaskDispatch
} from "../dispatcher/dispatcher.js"
import {addEventListeners} from "../dispatcher/events.js"

export async function init() {
  const mainContainer = document.querySelector('#main-container');
  const renderer = view(mainContainer);
  addEventListeners(mainContainer, toDos)
  renderer(toDos, {deleteTaskDispatch, addTaskDispatch, editTaskDispatch})
}
