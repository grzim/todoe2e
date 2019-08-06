import * as facade from '../facade/facade.js'
import {ToDo} from "../model/model.js"
import {reactiveTasks} from "./reactive-proxy.js"

export const refresh = Symbol('refresh');

const makeServerProxy = (obj) =>  new Proxy(obj, {
  get(target, prop){
    if(prop === refresh) {
      return serverTasks.getAll.bind(serverTasks);
    }
    else if(typeof target[prop] === 'function') {
      return async (arg = {}, payload) => {
        if(!facade[prop]) return target[prop];
        const item = target.getDetails(arg) || arg
        const serverTasks = await facade[prop](item, payload);
        if(prop === 'getAll' || prop === 'filterToDos') {
          target.deleteAll();
          target.addToDos(...serverTasks);
        }
      }
    }
    else return target[prop]
  }
})

export const serverTasks = makeServerProxy(reactiveTasks);
