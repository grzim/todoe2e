import {wsUrl} from "../../commons/config.js"
import toDos from "../model/model.js"
export const wsEvents = ['addDescription'];

// creation of websocket instance
export const ws = new WebSocket(wsUrl)

function wsActions(reactiveTasks, serverTasks) {
  ws.onopen = () => {
    // event sent when the connection is established
    ws.send('HELLO')
  }

  //*Advanced Task: blocking API
  // add functionality to block and unblock API via ws. Add missing implementation to the serverside
  // when block button is clicked an event is send to server
  // when server successfully block the API it will send back the event informing that the api
  // is blocked or unblocked
  // When the api is block then all inputs and all buttons (without buttons to block/unblock)
  // should be disabled

  ws.onmessage = (msg) => {
    // in order to distinguish different messages cumming fro the server
    // all messages should be objects with type - the help us distinguish between messages
    // and data that will carry all the data for the action type
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
      // refreshing the view upon receiving new toDos from backend
      toDos.deleteAll();
      reactiveTasks.addToDos(...data)
    }
    else if(type === "block") {
    }
    else if(type === "unblock") {
      // after unblocking refresh the view with all tasks from DB
      serverTasks.getAll();
    }
    else {
     // console.log(msg)
    }
  }
}
export default wsActions;
