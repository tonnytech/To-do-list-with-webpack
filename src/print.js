import UpdateNotifier from "update-notifier/update-notifier";

const getMyList = () => {
    if (localStorage.getItem("todolist")) {
      return JSON.parse(localStorage.getItem("todolist"));
    }
    return [];
};

let myList = getMyList();

export const addList = ( description, listArray = myList) => {
    const list = {
        description,
        completed: false,
        index: listArray.length + 1,
    };

    myList.push(list);

    // Adding to local storage

    localStorage.setItem("todolist", JSON.stringify(myList));
};

export const deleteListItem = (index) => {
    myList = myList.filter( (list) => list.index !== index);

    const newList = myList.sort( (a,b) => a.index - b.index);

    newList.forEach((obj,i) => {
        obj.index = i +1;
    });

    localStorage.setItem("todolist", JSON.stringify(newList));
};

export const updateListItems = ( index, information, TrueFalse = false ) => {
    const updateListItem = myList.find( (listItem) => listItem.index === index);
    const myListArrayIndex = updateListItem.index - 1;

    const currentDescription = updateListItem.description;

    if(information === currentDescription) return;

    updateListItem.description = information;
    updateListItem.completed = TrueFalse;

    mylist[myListArrayIndex] = itemToUpdate;

    localStorage.setItem("todolist", JSON.stringify(myList));

};

export default getMyList;