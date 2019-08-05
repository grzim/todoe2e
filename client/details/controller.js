import {getPropsOfSelected} from "./facade.js"
import {ToDo} from "../model/model.js"
import {getAll} from "../facade/facade.js"
const detailsButton = document.getElementById("get-value")
const placeholder = document.getElementById("details-placeholder")
const selectedProps = document.getElementById("get-value");



detailsButton.addEventListener('click', async (e) => {
  // we get the array of all values seleded in checkboxes, so the array of all properties that should be retrieved
  const selectedProps = [...document.querySelectorAll('.props:checked')]
    .map(({value}) => value);

  // this variable will store the value of selected name of the task
  const selectedName = document.querySelector('input[name="names"]:checked').value

  // fill the implementation of function getPropsOfSelected - Task 'queryParams'
  const toDoToDisplay = await getPropsOfSelected(selectedName, selectedProps);

  // clear placeholder
  placeholder.innerHTML = '';

  // fill the placeholder with toDos data
  if(!selectedProps.length) return;
  placeholder.appendChild(Object.entries(toDoToDisplay).reduce((acc, [name, value]) => {
    if(name === '_id') return acc;
    const p = document.createElement('p')
    p.innerHTML = `${name}: ${value}`
    acc.append(p);
    return acc;
  }, document.createElement('div')))
})


export const init = async () =>  {
  // this function will list all of task names and all of properties that can be selected
  // nothing to change here
  const allTasks = await getAll();
  const propsListNode = document.getElementById('props-list');
  const tasksListNode = document.getElementById('tasks-list');
  allTasks.forEach(({name}) =>
    tasksListNode.innerHTML +=`<div>
        <strong>
            <label for="${name}">${name}</label><input type="radio" class="props" id="${name}" name="names" value="${name}">
        </strong>    
    </div>`
  )
  Object.keys(new ToDo()).forEach(prop =>
    propsListNode.innerHTML +=`<label for="__${prop}">${prop}</label><input class="props" id="__${prop}" type="checkbox" value="${prop}">`
  )
}

init();
