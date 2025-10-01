(function () {
  const init = () => {
    const form = document.querySelector('[data-todo-form]');
    const input = document.querySelector('[data-todo-input]');
    const listElement = document.querySelector('[data-todo-list]');

    if (!form || !input || !listElement) {
      return;
    }

    const todoList = new window.TodoList();
    window.setupTodoApp({ form, input, listElement, todoList });
  };

  document.addEventListener('DOMContentLoaded', init);
})();
