const getMyList = () => {
  if (localStorage.getItem('todolist')) {
    return JSON.parse(localStorage.getItem('todolist'));
  }
  return [];
};

export const addList = (description, listArray = getMyList()) => {
  const list = {
    description,
    completed: false,
    index: listArray.length,
  };

  listArray.push(list);

  // Adding to local storage

  localStorage.setItem('todolist', JSON.stringify(listArray));
};

export const deleteListItems = (index) => {
  let myList = getMyList();

  myList = myList.filter((list) => list.index !== index);

  const newList = myList.sort((a, b) => a.index - b.index);

  newList.forEach((obj, i) => {
    obj.index = i;
  });

  localStorage.setItem('todolist', JSON.stringify(newList));
};

export const updateListItems = (index, information, TrueFalse = false) => {
  const myList = getMyList();

  const updateListItem = myList.find((listItem) => listItem.index === index);
  const myListArrayIndex = updateListItem.index - 1;

  const currentDescription = updateListItem.description;

  if (information === currentDescription) return;

  updateListItem.description = information;
  updateListItem.completed = TrueFalse;

  myList[myListArrayIndex] = updateListItem;

  localStorage.setItem('todolist', JSON.stringify(myList));
};

export default getMyList;