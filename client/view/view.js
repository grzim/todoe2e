import {actionAdd} from "./ui-actions.js"
import {clearHTML, createTaskNode} from "./dom-manipulations.js"
import {getFiltered} from "./ui-actions.js"

export const view = (mainContainer) => {
  let tasksCleaner = [];
  const container = mainContainer.querySelector('#container');
  const containerCopy = container.cloneNode(true);
  const parent = container.parentNode.parentNode;
  return (tasks, {deleteTaskDispatch, addTaskDispatch, editTaskDispatch, filterToDosDispatch}) => {
    tasksCleaner.forEach(cleaner => cleaner());
    clearHTML(container, containerCopy, parent);
    const filterNamesInput = mainContainer.querySelector('#filter-names');
    filterNamesInput.focus();
    filterNamesInput.setSelectionRange(filterNamesInput.value.length, filterNamesInput.value.length);
    tasksCleaner = [...tasks.getAll()
      .map(createTaskNode({deleteTaskDispatch, addTaskDispatch, editTaskDispatch})),
      actionAdd(addTaskDispatch, parent),
      getFiltered(filterToDosDispatch, parent)];
  }
}
