import toDos from "../model/model.js"
import {renderer} from "../script_no_task.js"
import dispatcher from "../dispatcher/dispatcher_no_task.js"

const makeReactiveProxy = obj => new Proxy(obj, {
  set
})
export const reactiveTasks = makeReactiveProxy(toDos);

function set(target, prop, value) {
  target[prop] = value
  renderer(reactiveTasks, dispatcher)
  return value;
}
