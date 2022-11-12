import getMyList, { addList, deleteListItems, updateListItems } from './print.js';
import checkedItems from './iteractive.js';
import './style.css';
import { list } from 'tar';

const myList = document.querySelector('.to-do-list');
const deleteButton = document.querySelector('.my-button');

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
  let appended = ' ';

  const sortedArray = array.sort((a, b) => a.index - b.index);
  sortedArray.forEach((item) => {
    appended += getCreatedList(item);
  });
  myList.innerHTML = appended;
};

appendTask(getMyList());

// adding to list

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const { value } = e.target;

    if (!value?.trim()) return;

    if (e.target.classList.contains('add-todo-input')) {
      addList(value);
      // when the list is empty
      e.target.value = '';
      appendTask(getMyList());
      return;
    }

    if (e.target.classList.contains('output-description')) {
      const mainElement = e.target.closest('.checkbox');

      const { index } = mainElement.dataset;

      updateListItems(+index, value);
      appendTask(getMyList());
    }
  }
});

// Deleting list items

myList.addEventListener('click', (e) => {
  const itemClicked = e.target.closest('.icon-fa');

  if (!itemClicked) return;

  itemClicked.querySelector('.fa-solid').classList.remove('fa-ellipsis-vertical');

  itemClicked.querySelector('.fa-solid').classList.add('fa-trash-can');

  const trashIcon = itemClicked.querySelector('.fa-trash-can');

  trashIcon.addEventListener('click', () => {
    const majorElement = trashIcon.parentNode.parentNode.querySelector('.checkbox');

    const { index } = majorElement.dataset;

    deleteListItems(+index);
    appendTask(getMyList());
  });
});



myList.addEventListener('click', (e) => {
  const activeElement = e.target.closest('#to-do-check');
  if (!activeElement) return;
  // console.log(activeElement);
  
  const majorElement = activeElement.parentNode.parentNode;
  // const majorElement = activeElement.closest('.checkbox');
  checkedItems(majorElement, activeElement.checked);
});

deleteButton.addEventListener('click', () => {
  let listItems = getMyList();
  console.log(listItems);
  // let newArray = listItems.filter((element) => {
  //   return element.completed === false;
  // })

  listItems = newArray;
  localStorage.setItem('todolist', JSON.stringify(newArray));

  appendTask(listItems);

  // if (RemoveIndex.length > 0) {
  //   RemoveIndex.forEach((i) => {
  //     deleteListItems(i);
  //   });
  //   appendTask(getMyList());
  // }
});