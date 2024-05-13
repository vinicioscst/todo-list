import { loadTasksDone, loadTasksToDo } from "./render.js";
import { handleTheme } from "./theme.js";

let tasksToDo = [];
let tasksDone = [];

const handleTaskCreation = () => {
  const input = document.querySelector(".add-tasks__input");
  const submitButton = document.querySelector(".submit-tasks__button");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    if (input.value.trim() === "") {
      window.alert("Empty fields are not allowed");
      return;
    }

    const newTask = {
      id: tasksToDo.length,
      task: input.value,
    };

    tasksToDo.push(newTask);
    input.value = "";

    const tasksToDoJson = JSON.stringify(tasksToDo);
    localStorage.setItem("TODOLIST@TASKSTODO", tasksToDoJson);

    loadTasksToDo(tasksToDo);
  });
};

export const handleTaskConclusion = () => {
  const taskDoneButton = document.querySelectorAll(".task-done__button");
  taskDoneButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const taskCompleted = tasksToDo.find(
        (task) => task.id === Number(button.dataset.id)
      );

      tasksDone.push(taskCompleted);
      const updatedTasksToDo = tasksToDo.filter(
        (task) => task.id != button.dataset.id
      );

      tasksToDo = updatedTasksToDo;

      const tasksToDoJson = JSON.stringify(tasksToDo);
      localStorage.setItem("TODOLIST@TASKSTODO", tasksToDoJson);

      const tasksDoneJson = JSON.stringify(tasksDone);
      localStorage.setItem("TODOLIST@TASKSDONE", tasksDoneJson);

      renderLists();
    });
  });
};

export const handleTaskEdit = () => {
  const taskEditButton = document.querySelectorAll(".task-edit__button");
  taskEditButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const taskToEditIndex = tasksToDo.findIndex(
        (task) => task.id === Number(button.dataset.id)
      );

      const taskNewName = prompt("Insert task new name:");

      if (taskNewName.trim() === "") {
        window.alert("Empty fields are not allowed");
        return;
      }

      tasksToDo[taskToEditIndex].task = taskNewName;

      const tasksToDoJson = JSON.stringify(tasksToDo);
      localStorage.setItem("TODOLIST@TASKSTODO", tasksToDoJson);

      loadTasksToDo(tasksToDo);
    });
  });
};

export const handleTaskDelete = () => {
  const taskDeleteButton = document.querySelectorAll(".task-delete__button");
  taskDeleteButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const wantsToDeleteTask = confirm(
        "Do you want to delete this task? This action can't be undone"
      );

      if (!wantsToDeleteTask) {
        return;
      }

      const updatedTasksToDo = tasksToDo.filter(
        (task) => task.id != button.dataset.id
      );

      tasksToDo = updatedTasksToDo;

      const tasksToDoJson = JSON.stringify(tasksToDo);
      localStorage.setItem("TODOLIST@TASKSTODO", tasksToDoJson);

      loadTasksToDo(tasksToDo);
    });
  });
};

export const handleClearList = () => {
  const clearListButton = document.querySelectorAll(".clear-tasks__button");

  clearListButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const listType = button.dataset.list;

      if (listType === "tasksDone") {
        const emptyList = clearList(
          tasksDone,
          "TODOLIST@TASKSDONE",
          loadTasksDone
        );
        tasksDone = emptyList;
      } else if (listType === "tasksToDo") {
        const emptyList = clearList(
          tasksToDo,
          "TODOLIST@TASKSTODO",
          loadTasksToDo
        );
        tasksToDo = emptyList;
      }
    });
  });
};

const clearList = (list, localStorageItem, renderListFunction) => {
  if (list.length === 0) {
    window.alert("The list is already empty");
    return;
  }

  const wantsToClearList = confirm(
    "Do you want to clear this list? This action can't be undone"
  );

  if (wantsToClearList) {
    list = [];
    localStorage.removeItem(localStorageItem);

    renderListFunction(list);

    return list;
  }
};

export const renderLists = () => {
  loadTasksToDo(tasksToDo);
  loadTasksDone(tasksDone);
};

handleTheme();
handleTaskCreation();
renderLists();
handleClearList();
