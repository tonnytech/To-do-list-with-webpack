import getMyList, { addList, deleteListItems, updateListItems } from './print.js';
import './style.css';

const myList = document.querySelector('.to-do-list');

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

// let RemoveIndex = [];

// myList.addEventListener('click', (e) => {
//   const activeElement = e.target.closest('#to-do-check');
//   if (!activeElement) return;
//   const majorElement = activeElement.closest('checkbox');
//   RemoveIndex = checkoffItem(majorElement);
// });