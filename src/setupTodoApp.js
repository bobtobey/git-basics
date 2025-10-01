const { TodoList } = require('./todoList');

const createTaskElement = (task, handlers) => {
  const item = document.createElement('li');
  item.className = 'todo-item';
  if (task.completed) {
    item.classList.add('todo-item--completed');
  }

  const label = document.createElement('label');
  label.className = 'todo-item__label';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => handlers.onToggle(task.id));

  const title = document.createElement('span');
  title.textContent = task.title;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'todo-item__delete';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => handlers.onRemove(task.id));

  label.appendChild(checkbox);
  label.appendChild(title);

  item.appendChild(label);
  item.appendChild(deleteButton);

  return item;
};

const renderTasks = (listElement, tasks, handlers) => {
  listElement.innerHTML = '';
  tasks.forEach((task) => {
    const element = createTaskElement(task, handlers);
    listElement.appendChild(element);
  });
};

const handleSubmit = ({ event, input, todoList, rerender }) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    return;
  }
  todoList.addTask(title);
  input.value = '';
  rerender();
};

const setupTodoApp = ({ form, input, listElement, todoList = new TodoList() }) => {
  const rerender = () => {
    renderTasks(listElement, todoList.getTasks(), {
      onToggle: (id) => {
        todoList.toggleTask(id);
        rerender();
      },
      onRemove: (id) => {
        todoList.removeTask(id);
        rerender();
      }
    });
  };

  form.addEventListener('submit', (event) =>
    handleSubmit({ event, input, todoList, rerender })
  );

  rerender();

  return { rerender };
};

module.exports = { setupTodoApp, renderTasks, createTaskElement, handleSubmit };

if (typeof window !== 'undefined') {
  window.setupTodoApp = setupTodoApp;
}
