import {view} from "./view/view.js"
import {addEventListeners} from "./dispatcher/events.js"
import toDos from "./model/model.js"
import {
  addTaskDispatch,
  deleteTaskDispatch,
  editTaskDispatch
} from "./dispatcher/dispatcher.js"

const mainContainer = document.querySelector('#main-container');
export const renderer = view(mainContainer);

export function init() {
  addEventListeners(mainContainer, toDos)
  renderer(toDos, {deleteTaskDispatch, addTaskDispatch, editTaskDispatch})
}
init();
