import { loadTasksDone, loadTasksToDo } from "./render.js";

let tasksToDo = [];
let tasksDone = [];

const handleTaskCreation = () => {
  const input = document.querySelector(".add-tasks__input");
  const submitBtn = document.querySelector(".submit-tasks__btn");

  submitBtn.addEventListener("click", async (event) => {
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
  const taskDoneBtn = document.querySelectorAll(".task-done__btn");
  taskDoneBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const taskCompleted = tasksToDo.find(
        (task) => task.id === Number(btn.dataset.id)
      );

      tasksDone.push(taskCompleted);
      const updatedTasksToDo = tasksToDo.filter(
        (task) => task.id != btn.dataset.id
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
  const taskEditBtn = document.querySelectorAll(".task-edit__btn");
  taskEditBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const taskToEditIndex = tasksToDo.findIndex(
        (task) => task.id === Number(btn.dataset.id)
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
  const taskDeleteBtn = document.querySelectorAll(".task-delete__btn");
  taskDeleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const wantsToDeleteTask = confirm(
        "Do you want to delete this task? This action can't be undone"
      );

      if (!wantsToDeleteTask) {
        return;
      }

      const updatedTasksToDo = tasksToDo.filter(
        (task) => task.id != btn.dataset.id
      );

      tasksToDo = updatedTasksToDo;

      const tasksToDoJson = JSON.stringify(tasksToDo);
      localStorage.setItem("TODOLIST@TASKSTODO", tasksToDoJson);

      loadTasksToDo(tasksToDo);
    });
  });
};

export const handleClearToDoList = () => {
  const clearListBtn = document.querySelector(".todo__section > div > button");

  clearListBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (tasksToDo.length === 0) {
      window.alert("The list is already empty");
      return;
    }

    const wantsToClearList = confirm(
      "Do you want to clear this list? This action can't be undone"
    );

    if (wantsToClearList) {
      tasksToDo = [];
      localStorage.removeItem("TODOLIST@TASKSTODO");
      loadTasksToDo(tasksToDo);
    }
  });
};

export const handleClearDoneList = () => {
  const clearListBtn = document.querySelector(".done__section > div > button");

  clearListBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (tasksDone.length === 0) {
      window.alert("The list is already empty");
      return;
    }

    const wantsToClearList = confirm(
      "Do you want to clear this list? This action can't be undone"
    );

    if (wantsToClearList) {
      tasksDone = [];
      localStorage.removeItem("TODOLIST@TASKSDONE");
      loadTasksDone(tasksDone);
    }
  });
};

const renderLists = () => {
  loadTasksToDo(tasksToDo);
  loadTasksDone(tasksDone);
};

handleTaskCreation();
renderLists();
handleClearToDoList();
handleClearDoneList();
