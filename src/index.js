import './style.css';

const myList = document.querySelector('.to-do-list');

const ToDoArray = [
  {
    description: 'write code',
    completed: true,
    i: 0,
  },
  {
    description: 'read a novel',
    completed: true,
    i: 1,
  },
  {
    description: 'watch a movie',
    completed: true,
    i: 2,
  },
  {
    description: 'play with kids',
    completed: true,
    i: 3,
  },
];

let appended = ' ';

const appedTask = (array) => {
  array.forEach((item) => {
    appended += `
        <div class="to-do-pop">
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="to-do-check"
                    name="To-Do"
                    value="Add"
                    class="my-checkbox"
                />
                
                <label for="todo" class="my-label">${item.description}</label><br />
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      <hr />
        
        `;
  });
  myList.innerHTML = appended;
};

appedTask(ToDoArray);
