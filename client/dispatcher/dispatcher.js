import {addToDoEvent, deleteToDoEvent, editToDoEvent} from "./events.js"

export const addTaskDispatch = function (name) {
  return function (node) {
    node.dispatchEvent(addToDoEvent({name, isCompleted: false}))
  }
}

export const deleteTaskDispatch = function (tasks, listItem, name) {
  return function (node) {
    node.dispatchEvent(deleteToDoEvent({name}))
  }
}

export const editTaskDispatch = function (originalName, data) {
  return function (node) {
    node.dispatchEvent(editToDoEvent([{name: originalName}, data]))
  }
}
