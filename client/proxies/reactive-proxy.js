import toDos from "../model/model.js"
import {renderer} from "../script.js"
import dispatcher from "../dispatcher/dispatcher.js"

const makeReactiveProxy = obj => new Proxy(obj, {
  set
})
export const reactiveTasks = makeReactiveProxy(toDos);

function set(target, prop, value) {
  target[prop] = value
  renderer(reactiveTasks, dispatcher)
  return value;
}
