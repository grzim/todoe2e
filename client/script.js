import {view} from "./view/view.js"
import wsActions from "./ws/websocket.js"
import {addEventListeners} from "./dispatcher/events.js"
import toDos from "./model/model.js"
import dispatcher from "./dispatcher/dispatcher.js"
import {reactiveTasks} from "./proxies/reactive-proxy.js"
import {serverTasks, refresh} from "./proxies/fetch-proxy.js"
const mainContainer = document.querySelector('#main-container');
export const renderer = view(mainContainer);

export function init() {
  addEventListeners(mainContainer, serverTasks)
  serverTasks[refresh]();
  renderer(reactiveTasks, dispatcher);
  wsActions(reactiveTasks, serverTasks);
}
init();

