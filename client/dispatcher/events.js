export const events = ['addToDo', 'deleteToDo','editToDo', 'filterToDos'];

export const [addToDoEvent, deleteToDoEvent, editToDoEvent, filterToDosEvent] =
  events
    .map(eventName =>
      (detail) => new CustomEvent(eventName, {detail, bubbles: true }) )

export function addEventListeners(htmlNode, tasks) {
  events.forEach((eventName) =>
    htmlNode.addEventListener(eventName, ({detail}) => {
      tasks[eventName](...[detail].flat())
    }))
}
