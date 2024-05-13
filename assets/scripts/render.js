import {
  handleTaskDelete,
  handleTaskConclusion,
  handleTaskEdit,
} from "./index.js";

export const loadTasksToDo = (tasksToDo) => {
  const toDoSectionTitle = document.querySelector(".todo__section > div > p");
  const toDoList = document.querySelector(".tasks__to-do");

  let savedTasksToDo = JSON.parse(localStorage.getItem("TODOLIST@TASKSTODO"));
  if (savedTasksToDo != null) {
    tasksToDo.length = 0;
    tasksToDo.push(...savedTasksToDo);
  }

  toDoSectionTitle.innerHTML = `Tasks to do - ${tasksToDo.length}`;

  toDoList.innerHTML = "";
  tasksToDo.forEach((task) => {
    toDoList.insertAdjacentHTML(
      "afterbegin",
      `<li id=${task.id}>
          ${task.task}
          <div class="task__actions">
            <button class="task-done__button" data-id=${task.id}>
              <img src="./assets/icons/check.svg" title="Mark task as done" />
            </button>
            <button class="task-edit__button" data-id=${task.id}>
              <img src="./assets/icons/edit.svg" title="Edit task" />
            </button>
            <button class="task-delete__button" data-id=${task.id}>
              <img src="./assets/icons/trash.svg" title="Delete task" />
            </button>
          </div>
        </li>`
    );
  });

  handleTaskConclusion();
  handleTaskEdit();
  handleTaskDelete();
};

export const loadTasksDone = (tasksDone) => {
  const doneSectionTitle = document.querySelector(".done__section > div > p");
  const doneList = document.querySelector(".tasks__done");

  let savedTasksDone = JSON.parse(localStorage.getItem("TODOLIST@TASKSDONE"));
  if (savedTasksDone != null) {
    tasksDone.length = 0;
    tasksDone.push(...savedTasksDone);
  }

  doneSectionTitle.innerHTML = `Done - ${tasksDone.length}`;

  doneList.innerHTML = "";
  tasksDone.forEach((task) => {
    doneList.insertAdjacentHTML(
      "afterbegin",
      `<li id=${task.id}>
          ${task.task}
        </li>`
    );
  });
};
