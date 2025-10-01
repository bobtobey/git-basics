Git Basics TDD Example
======================

This repository now contains a minimal test-driven development walkthrough for a
browser-based todo list.

Getting started
---------------

1. Install dependencies (already done in this example):

       npm install

2. Run the Jest suite to drive your changes:

       npm test

3. Open `tdd-example/index.html` in a browser to interact with the application.

Project structure
-----------------

- `src/` holds the domain logic (`todoList.js`) and DOM bindings
  (`setupTodoApp.js`).
- `__tests__/` contains Jest tests that exercise the behavior before touching
  the implementation.
- `tdd-example/` provides a lightweight user interface that consumes the tested
  modules.

TDD workflow
------------

1. Start by adding or adjusting a test inside `__tests__/`.
2. Update the implementation in `src/` until the test suite passes.
3. Refactor confidently while keeping `npm test` green.

This mirrors the classic red-green-refactor cycle with small, maintainable
functions and single-responsibility modules.
