export class ToDo {
  constructor({name, isCompleted}) {
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

class ToDos {
  constructor(...tasks) {
    this.all = tasks
  }

  addToDos(...tasks) {
    this.all = [...this.all, ...tasks.filter(task => !this.all.map(t => t.name).includes(task.name))];
    return this.getAll();
  }

  addToDo({name, isCompleted}) {
    if(!this.all.map(({name: tname}) => tname).includes(name))
      this.all = [...this.all, (new ToDo({name, isCompleted}))]
    return this.getAll();
  }

  getAll() {
    return this.all;
  }

  getDetails({name} = {}) {
    return this.all.filter(t => t.name === name)[0];
  }

  deleteToDo({name}) {
    this.all = this.all.filter(t => t.name !== name)
    return this.getAll();
  }

  editToDo({name}, data) {
    this.all = this.all.map(task => (task.name === name) ? new ToDo({...task, ...data}) : task);
    return this.getAll();
  }

  deleteAll() {
    this.all = [];
  }
}


export default new ToDos();
