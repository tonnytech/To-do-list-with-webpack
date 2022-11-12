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
    // listItemsList.dataset.complete = true;
    // myInput.classList.add('checked');
  } else {
    todoList[id].completed = false;
    // listItemsList.dataset.complete = false;
    // myInput.classList.remove('checked');
  }
  localStorage.setItem('todolist', JSON.stringify(todoList));

//   const removeArray = [];

//   myList.querySelectorAll('.checkbox').forEach((node) => {
//     if (node.dataset.complete === 'true') {
//       removeArray.push(+node.dataset.index);
//     }
//   });

//   return removeArray;
};

export default checkedItems;