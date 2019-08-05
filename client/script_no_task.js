import {view} from "./view/view_no_task.js"
import wsActions from "./ws/websocket.js"
import {addEventListeners} from "./dispatcher/events_no_task.js"
import toDos from "./model/model.js"
import dispatcher from "./dispatcher/dispatcher_no_task.js"
import {reactiveTasks} from "./proxies/reactive-proxy_no_task.js"
import {serverTasks, refresh} from "./proxies/fetch-proxy_no_task.js"
const mainContainer = document.querySelector('#main-container');
export const renderer = view(mainContainer);

export function init() {
  addEventListeners(mainContainer, serverTasks)
  serverTasks[refresh]();
  renderer(reactiveTasks, dispatcher);
  wsActions(reactiveTasks, serverTasks);
}
init();

