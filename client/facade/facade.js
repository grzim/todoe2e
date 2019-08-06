import {serverUrl, debounceTime} from "../../commons/config.js"

// Task: Facade
// implement all of missing functions
export async function getAll() {
  const response = await fetch(serverUrl);
  return await response.json();
}

export async function addToDo(data) {
  const response = await fetch(serverUrl, {
    method: "POST", // default is GET
    body: JSON.stringify(data) // JSON changed to string in order to send it via HTTP
  });
  return await response.json();
  // when you switch to ws notification (Task: updates via WebSocket) then there will be no need of return
}

export async function editToDo({name}, data) {
}

export async function deleteToDo(data) {
}

// Task: Filtering of toDos
// add functionality to return only todos that consist of phrase sent from the client
// add missing implementation in server as well - server\controller.js line 84
// filtering is being made against filter-names input
export async function filterToDos(phrase) {
}
// *Advanced Task: Client Side Debounce
// add functionality that the request will be sent after 2 seconds after the last letter has been pressed (debounce)
