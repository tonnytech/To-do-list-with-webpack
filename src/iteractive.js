import getMyList from "./print";


const checkedItems = (checkedListItems, value) => {
  const listItemsList = checkedListItems;
  const checkbox = checkedListItems.querySelector('#to-do-check');
  const myInput = checkedListItems.querySelector('.output-description');

  const myList = checkedListItems.closest('.to-do-list');

  let todoList = getMyList();
  let id = parseInt(listItemsList.dataset.index);


  if (value) {
    todoList[id].completed = true;
  
  } else {
    todoList[id].completed = false;
  
  }
  localStorage.setItem('todolist', JSON.stringify(todoList));


};

export default checkedItems;