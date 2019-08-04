export const toggleCompletionTask = function (dispatch, tasks, listItem) {
  return function () {
    const checkbox = listItem.querySelector("[type='checkbox']")
    const isCompleted = checkbox.checked
    const label = listItem.querySelector("label")
    const originalName = label.innerHTML
    dispatch(originalName, {isCompleted})(listItem);
  }
}

export const editTask = function (dispatch, tasks, listItem) {
  return function () {
    const editInput = listItem.querySelector('input[type=text]')
    const label = listItem.querySelector("label")
    const originalName = label.innerHTML
    const containsClass = listItem.classList.contains("editMode")
    if (containsClass) {
      label.innerText = editInput.value
      dispatch(originalName, {name: label.innerText})(listItem);
    } else {
      editInput.value = label.innerText
    }
    listItem.classList.toggle("editMode")
  }
}

export const actionAdd = function(dispatch, parentNode){
  const toDo =  parentNode.querySelector('#todo')
  const newtask = parentNode.querySelector('#newtask')
  const addTaskOfName = () => {
    dispatch(newtask.value)(toDo)
  }
  toDo.addEventListener('click', addTaskOfName) ;
  return (() => toDo.removeEventListener('click' ,addTaskOfName));
}

