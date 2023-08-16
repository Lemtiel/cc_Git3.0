/* eslint-disable import/no-cycle */
import { createToDoTask, updateTaskDetails } from './models/taskModel';
import { getAllLists } from './models/listModel';
import { renderTaskList, updateListTitle, renderListInput, addListToListManager } from './views/listView';
import { openDialog } from './views/modalView';

export function addTaskToList() {
  const form = document.querySelector('.todo-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.querySelector('.task-title-input').value;
      const description = document.querySelector('.task-description-input').value;
      const dueDate = document.querySelector('.task-dueDate-input').value;
      const priority = document.querySelector('.task-priority-select').value;
      const listName = document.querySelector('.task-list-select').value;

      const addTask = createToDoTask(title, description, dueDate, priority);

      const selectedList = getAllLists().find(list => list.name === listName);

      selectedList?.tasks.push(addTask);
      renderTaskList(selectedList?.tasks);

      form.reset();
    });
  }
}

export function deleteTask(index, taskList, renderFunc) {
  taskList.splice(index, 1);
  renderFunc(taskList);
}
 
export function handleAddTaskButtonClick() {
  const addTaskButton = document.querySelector(".add-task-btn");

  addTaskButton.addEventListener("click", () => {
    openDialog();

    const form = document.querySelector('.todo-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      addTaskToList();
      const dialog = document.querySelector('.todo-dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });
}

export function handleEditButtonClick(task) {
  openDialog();

  const form = document.querySelector('.todo-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateTaskDetails(task);
    const dialog = document.querySelector('.todo-dialog');
    if (dialog) {
      dialog.close();
    }
  });
}

  export function handleAddListButtonClick() {
    const addListButton = document.querySelector('.create-new-list-btn');
  
    addListButton.addEventListener('click', () => {
      renderListInput();
    });
  }

  export function initialise() {
    renderListInput();
    addListToListManager('default list');
    updateListTitle('default list');

     // Add a dummy task to the list
  const defaultTask = createToDoTask('Task Title', 'Task Description', '2023-08-03', 'medium', 'default list');
  const defaultList = getAllLists().find(list => list.name === 'default list');
  defaultList?.tasks.push(defaultTask);
  renderTaskList(defaultList?.tasks);
  }