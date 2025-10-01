const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(rawTitle) {
    const title = rawTitle.trim();
    const newTask = { id: createId(), title, completed: false };
    this.tasks = [...this.tasks, newTask];
    return { ...newTask };
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTasks() {
    return this.tasks.map((task) => ({ ...task }));
  }
}

module.exports = { TodoList };

if (typeof window !== 'undefined') {
  window.TodoList = TodoList;
}
