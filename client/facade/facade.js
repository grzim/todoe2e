import {serverUrl, debounceTime} from "../../commons/config.js"
import {debounce} from "../../commons/debounce.js"

export async function getAll() {
  const response = await fetch(serverUrl);
  return await response.json() || [];
}

export async function addToDo(data) {
  const response = await fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(data)
  });
 // return await response.json();
}

export async function editToDo({name}, data) {
  const response = await fetch(serverUrl + name, {method: "PUT",
    body: JSON.stringify({...data, name}) });
  //return await response.json();
}

export async function deleteToDo(data) {
  const response = await fetch(serverUrl + data.name, {method: "DELETE",
    body: JSON.stringify(data) });
 // return await response.json();
}

const debounced = debounce();
export async function filterToDos(phrase) {
  const callback = (phrase) => fetch(serverUrl + 'includes/' + phrase).then(response => response.json() || [])
  return await debounced(0, phrase, callback);
}
