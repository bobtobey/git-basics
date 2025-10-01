const { TodoList } = require('../src/todoList');

describe('TodoList', () => {
  it('adds a task with a trimmed title', () => {
    const list = new TodoList();

    const task = list.addTask('  learn TDD  ');

    expect(task).toMatchObject({ id: expect.any(String), title: 'learn TDD', completed: false });
    expect(list.getTasks()).toHaveLength(1);
  });

  it('toggles a task by id', () => {
    const list = new TodoList();
    const task = list.addTask('write a test');

    list.toggleTask(task.id);

    expect(list.getTasks()[0].completed).toBe(true);

    list.toggleTask(task.id);

    expect(list.getTasks()[0].completed).toBe(false);
  });

  it('removes a task by id', () => {
    const list = new TodoList();
    const first = list.addTask('read red-green-refactor');
    list.addTask('practice katas');

    list.removeTask(first.id);

    const remaining = list.getTasks();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].title).toBe('practice katas');
  });

  it('returns a copy of tasks to keep state private', () => {
    const list = new TodoList();
    list.addTask('protect state');

    const tasks = list.getTasks();
    tasks[0].title = 'mutated';

    expect(list.getTasks()[0].title).toBe('protect state');
  });
});
