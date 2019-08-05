import {editTask, toggleCompletionTask} from "./ui-actions_no_task.js"

export const clearHTML = (container, containerCopy, parent) => {
  document.getElementById('incompletetasks').innerHTML = ''
  document.getElementById('completedtasks').innerHTML = ''
  document.getElementById('newtask').value = "";
  container.remove();
  parent.append(containerCopy)
}

export const createTaskNode = ({deleteTaskDispatch, addTaskDispatch, editTaskDispatch}) => (task) => {

  const incompletetasks = document.getElementById('incompletetasks')
  const completedtasks = document.getElementById('completedtasks')

  const [listItem, checkBox, label, editInput, editButton, deleteButton] = ["li", "input", "label", "input", "button", "button"].map(t => document.createElement(t))

  label.innerText = task.name

  checkBox.type = "checkbox"
  editInput.type = "text"
  checkBox.checked = task.isCompleted

  editButton.innerText = "Edit"//innerText encodes special characters, HTML does not.
  editButton.className = "edit"
  deleteButton.innerText = "Delete"
  deleteButton.className = "delete";
  [checkBox, label, editInput, editButton, deleteButton].forEach(item => listItem.appendChild(item))

  const edit = editTask(editTaskDispatch, task, listItem);
  const remove = deleteTaskDispatch(task, listItem, label.innerText).bind(null, deleteButton)
  const toggleCompletion = toggleCompletionTask(editTaskDispatch, task, listItem)

  checkBox.addEventListener('change', toggleCompletion)
  editButton.addEventListener('click', edit)
  deleteButton.addEventListener('click', remove)

  task.isCompleted ?
    completedtasks.appendChild(listItem) :
    incompletetasks.appendChild(listItem)

  return () => {
    checkBox.removeEventListener('change', toggleCompletion)
    editButton.removeEventListener('click', edit)
    deleteButton.removeEventListener('click', remove)
  }
}
