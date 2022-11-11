import _ from 'lodash';
import getMyList, { addList,deleteListItems,updateListItem} from "./print.js";
import './style.css';

const myList = document.querySelector('.to-do-list')

const getCreatedList = (item)=> {
  return `
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
      <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>
<hr />
  
  `;
  };

const appendTask =(array) => {
  let appended = ' ';

  const sortedArray = array.sort((a, b) => a.index - b.index);
    sortedArray.forEach(item => {
        appended += getCreatedList(item);
    });
    myList.innerHTML= appended;
}

appendTask(getMyList());

//adding to the list
// const addToDo = document.querySelector('#add-todo')
window.addEventListener("keydown", (e) => {
  if(e.key === "Enter") {
    const { value } = e.target;
    console.log( "here");
    if(!value?.trim()) return;

    if (e.target.classList.contains("add-todo-input")) {

      addList(value);
      //when the list is empty
      e.target.value = ""
      appendTask(getMyList());
      return;
    }

    if (e.target.classList.contains("output-description")) {
      const mainElement = e.target.closest(".checkbox");
    
      const { index } = mainElement.dataset;

      updateListItem(+index, value);
      appendTask(getMyList());
    }
  }

});

