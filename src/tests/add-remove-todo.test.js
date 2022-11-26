/** @jest-environment jsdom */

import { addList, deleteListItems } from '../print.js';

describe('Add a task', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
        <ul class="to-do-list">


        </ul>                                                                                                                            
        `;
  });

  const getCreatedList = (item) => `
  <div class="to-do-pop">
      <li class="checkbox" data-index="${item.index}"
       data-complete="${item.complete}">
          <label for="${item.index}">
          <input type="checkbox" id="to-do-check" 
          name="To-Do" value="Add" class="my-checkbox" /></label>
          <input type="text" id="${item.index}"
          class ="output-description" name ="${item.index}"
          value="${item.description}">
      </li>
      <div class="icon-fa">
      <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
  </div>
<hr />
  
  `;

  const appendTask = (array) => {
    const myList = document.querySelector('.to-do-list');
    let appended = ' ';

    const sortedArray = array.sort((a, b) => a.index - b.index);
    sortedArray.forEach((item) => {
      appended += getCreatedList(item);
    });
    myList.innerHTML = appended;
  };

  test('add new object to local storage', () => {
    const description = 'my list item';
    addList(description);

    const result = JSON.parse(window.localStorage.getItem('todolist'));

    expect(result).toHaveLength(1);
  });

  test('add new to do task to the dom', () => {
    const description = 'my list item';

    addList(description);

    const result = JSON.parse(window.localStorage.getItem('todolist'));
    appendTask(result);
    const myList = document.querySelectorAll('.to-do-pop');

    expect(myList.length).toBe(1);
  });
});

describe('Remove a task', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
    document.body.innerHTML = `
        <ul class="to-do-list">


        </ul>                                                                                                                            
        `;

    const taskOne = {
      description: 'task to remove',
      complete: false,
      index: 1,
    };
    window.localStorage.setItem('todolist', JSON.stringify([taskOne]));
  });

  const getCreatedList = (item) => `
  <div class="to-do-pop">
      <li class="checkbox" data-index="${item.index}"
       data-complete="${item.complete}">
          <label for="${item.index}">
          <input type="checkbox" id="to-do-check" 
          name="To-Do" value="Add" class="my-checkbox" /></label>
          <input type="text" id="${item.index}"
          class ="output-description" name ="${item.index}"
          value="${item.description}">
      </li>
      <div class="icon-fa">
      <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
  </div>
<hr />
  
  `;

  const appendTask = (array) => {
    const myList = document.querySelector('.to-do-list');
    let appended = ' ';

    const sortedArray = array.sort((a, b) => a.index - b.index);
    sortedArray.forEach((item) => {
      appended += getCreatedList(item);
    });
    myList.innerHTML = appended;
  };

  test('remove task from the local storage', () => {
    deleteListItems(1);

    const result = JSON.parse(window.localStorage.getItem('todolist'));

    expect(result).toHaveLength(0);
  });

  test('remove deleted task from the dom', () => {
    deleteListItems(1);

    const result = JSON.parse(window.localStorage.getItem('todolist'));
    appendTask(result);
    const myList = document.querySelectorAll('.to-do-pop');
    const myListDiv = document.querySelector('.to-do-list');

    expect(myList.innerHTML).toBe(undefined);
    expect(myListDiv.innerHTML).toBe(' ');
  });
});
