import toDos from "../model/model.js"
import {renderer} from "../script.js"
import {addTaskDispatch, deleteTaskDispatch, editTaskDispatch} from "../dispatcher/dispatcher.js"
const makeReactiveProxy = obj => new Proxy(obj, {
  set
})
export const reactiveTasks = makeReactiveProxy(toDos);

function set(target, prop, value) {
  target[prop] = value
  renderer(reactiveTasks, {deleteTaskDispatch, addTaskDispatch, editTaskDispatch})
  return value;
}
