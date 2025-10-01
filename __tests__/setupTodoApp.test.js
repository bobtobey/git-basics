const { fireEvent, screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');

const { TodoList } = require('../src/todoList');
const { setupTodoApp } = require('../src/setupTodoApp');

describe('setupTodoApp', () => {
  let container;
  let list;

  beforeEach(() => {
    document.body.innerHTML = `
      <main>
        <form data-testid="todo-form">
          <input data-testid="todo-input" />
          <button>Add</button>
        </form>
        <ul data-testid="todo-list"></ul>
      </main>
    `;
    container = screen.getByTestId('todo-list');
    list = new TodoList();
    setupTodoApp({
      form: screen.getByTestId('todo-form'),
      input: screen.getByTestId('todo-input'),
      listElement: container,
      todoList: list
    });
  });

  it('renders a new task when the form is submitted', () => {
    fireEvent.input(screen.getByTestId('todo-input'), { target: { value: 'write tests' } });
    fireEvent.submit(screen.getByTestId('todo-form'));

    expect(container).toHaveTextContent('write tests');
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('clears the input after submission', () => {
    const input = screen.getByTestId('todo-input');
    fireEvent.input(input, { target: { value: 'practice refactor' } });
    fireEvent.submit(screen.getByTestId('todo-form'));

    expect(input).toHaveValue('');
  });

  it('toggles the class for completed tasks', () => {
    fireEvent.input(screen.getByTestId('todo-input'), { target: { value: 'add toggle' } });
    fireEvent.submit(screen.getByTestId('todo-form'));
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(container.querySelector('li')).toHaveClass('todo-item--completed');
  });

  it('removes a task when delete button is clicked', () => {
    fireEvent.input(screen.getByTestId('todo-input'), { target: { value: 'remove me' } });
    fireEvent.submit(screen.getByTestId('todo-form'));
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    fireEvent.click(deleteButton);

    expect(container.children).toHaveLength(0);
  });
});
