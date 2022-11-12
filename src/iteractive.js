import getMyList from './print.js';

const checkedItems = (checkedListItems, value) => {
  const listItemsList = checkedListItems;

  const todoList = getMyList();
  const id = parseInt(listItemsList.dataset.index, 10);

  if (value) {
    todoList[id].completed = true;
  } else {
    todoList[id].completed = false;
  }
  localStorage.setItem('todolist', JSON.stringify(todoList));
};

export default checkedItems;