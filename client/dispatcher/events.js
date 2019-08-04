export const events = ['addToDo', 'deleteToDo','editToDo'];

export const [addToDoEvent, deleteToDoEvent, editToDoEvent] =
  events
    .map(eventName =>
      (detail) => new CustomEvent(eventName, {detail, bubbles: true }) )

export function addEventListeners(htmlNode, tasks) {
  events.forEach((eventName) =>
    htmlNode.addEventListener(eventName, ({detail}) => {
      tasks[eventName](...[detail].flat())
    }))
}
