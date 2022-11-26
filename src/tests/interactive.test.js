/**
 * @jest-environment jsdom
 */
 import getMyList from '../print.js';
 import checkedItems from "../iteractive.js";
 import { addList, deleteListItems } from '../print.js';
 import { updateListItems } from '../print.js';

 const clearAll = () => {
   const tasks = Storage.getTasks();
   const newTasks = tasks.filter((value) => !value.completed);
   localStorage.setItem('tasks', JSON.stringify(newTasks));
   return newTasks;
 };
 
 describe('LocalStorage', () => {
   const myArray = [
     {
       index: 0,
       description: 'eat',
       completed: false,
     },
     {
       index: 1,
       description: 'sleep',
       completed: true,
     },
     {
       index: 2,
       description: 'run',
       completed: false,
     },
     {
       index: 3,
       description: 'wake',
       completed: true,
     },
   ];
 
   
   test('edit the task on the locale storage', () => {
    const description = 'my list item';
    addList(description);
    const results = getMyList()
    const information = "updated"
    updateListItems(0 , information, false)
    const resultsTwo = getMyList()
    expect(results).not.toEqual(resultsTwo);
   });
 
   
   test('clear all completed task', () => {
     localStorage.clear();
    const description = 'my list item';
    addList(description);
    updateListItems(0 , description, false)
    const description2 = 'my list item 4';
    addList(description2);
    updateListItems(1 , description2, false)
     const resultsTwo = getMyList()
     const newArray = resultsTwo.filter((element) => element.completed === false);
     expect(myArray.length).not.toEqual(newArray.length);
   });
 
   test ('update completed status', () => {
    localStorage.clear();
    const description = 'my list item';
    addList(description);
    updateListItems(0 , description, false)
    const resultsTwo = getMyList();
    updateListItems(0 , description, true)
    const resultsThree = getMyList()
 
     expect(resultsTwo).not.toBe(resultsThree);
   });
 });




