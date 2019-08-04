import {serverUrl} from "../../commons/config.js"

export async function getAll() {
  const response = await fetch(serverUrl);
  return await response.json() || [];
}

export async function addToDo(data) {
  const response = await fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function editToDo({todoId}, data) {
  const response = await fetch(serverUrl + todoId, {method: "PUT",
    body: JSON.stringify({...data, todoId}) });
  return await response.json();
}

export async function deleteToDo(data) {
  const response = await fetch(serverUrl + data.todoId, {method: "DELETE",
    body: JSON.stringify(data) });
  return await response.json();
}

