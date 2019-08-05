import {addToDoEvent, deleteToDoEvent, editToDoEvent, filterToDosEvent} from "./events_no_task.js"

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

export const filterToDosDispatch = function (value) {
  return function (node) {
    node.dispatchEvent(filterToDosEvent(value))
  }
}

export default {deleteTaskDispatch, addTaskDispatch, editTaskDispatch, filterToDosDispatch}
