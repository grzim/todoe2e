import {actionAdd} from "./ui-actions.js"
import {clearHTML, createTaskNode} from "./dom-manipulations.js"

export const view = (mainContainer) => {
  let tasksCleaner = [];
  const container = mainContainer.querySelector('#container');
  const containerCopy = container.cloneNode(true);
  const parent = container.parentNode;
  return (tasks, {deleteTaskDispatch, addTaskDispatch, editTaskDispatch}) => {
    tasksCleaner.forEach(cleaner => cleaner());
    clearHTML(container, containerCopy, parent);
    tasksCleaner = [...tasks.getAll()
      .map(createTaskNode({deleteTaskDispatch, addTaskDispatch, editTaskDispatch})),
      actionAdd(addTaskDispatch, parent)];
  }
}
