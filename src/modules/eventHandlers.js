import { renderToDoTask, renderTaskList } from './domRendering';
import createToDoTask from './createToDoTask';
import { createList } from './listManager';

export function addTaskToList() {
  const form = document.querySelector('.todo-form');
  const taskList = createList();

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.querySelector('.task-title-input').value;
      const description = document.querySelector('.task-description-input').value;
      const dueDate = document.querySelector('.task-dueDate-input').value;
      const priority = document.querySelector('.task-priority-select').value;

      const addTask = createToDoTask(title, description, dueDate, priority);
      taskList.addTaskToList(addTask);

      renderTaskList(taskList.taskList);

      form.reset();
    });
  }
}

export function handleAddTaskButtonClick() {
    const addTaskButton = document.querySelector(".add-task-btn");
  
    addTaskButton.addEventListener("click", () => {
      renderToDoTask();
      addTaskToList();
    });
  }
  
