import {wsUrl} from "../../commons/config.js"
import toDos from "../model/model.js"
export const wsEvents = ['addDescription'];

export const ws = new WebSocket(wsUrl)

function wsActions(reactiveTasks, serverTasks) {
  ws.onopen = () => {
    ws.send('HELLO')
  }
  const [blockButton, unBlockButton] = ["block", "unblock"]
    .map(name => document.getElementById(name).addEventListener('click', () => {
      ws.send(name);
    }))

  ws.onmessage = (msg) => {
    let type, data;
    try {
       const parsed = JSON.parse(msg.data);
       type = parsed.type;
       data = parsed.data;
    }
    catch(e) {
      data = msg;
    }
    if(type === "update") {
      toDos.deleteAll();
      reactiveTasks.addToDos(...data)
    }
    else if(type === "block") {
      [...document.getElementsByTagName('input'),...document.querySelectorAll('button:not(.block-buttons')].forEach(node => {
        node.disabled = true;
      })
    }
    else if(type === "unblock") {
      [...document.getElementsByTagName('input')].forEach(node => {
        node.disabled = false;
      })
      serverTasks.getAll();
    }
    else {
      // console.log(msg)
    }
  }
}
export default wsActions;
