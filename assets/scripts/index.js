import { loadTasksDone, loadTasksToDo } from "./render.js";

let tasksToDo = [];
let tasksDone = [];

const handleTaskCreation = () => {
  const input = document.querySelector(".add-tasks__input");
  const submitBtn = document.querySelector(".submit-tasks__btn");

  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    if (input.value.trim() === "") {
      window.alert("Preencha o campo corretamente");
      return;
    }

    const newTask = {
      id: tasksToDo.length,
      task: input.value,
    };

    tasksToDo.push(newTask);
    input.value = "";

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
        window.alert("Preencha o campo corretamente");
        return;
      }

      tasksToDo[taskToEditIndex].task = taskNewName;

      renderLists();
    });
  });
};

export const handleTaskDelete = () => {
  const taskDeleteBtn = document.querySelectorAll(".task-delete__btn");
  taskDeleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const updatedTasksToDo = tasksToDo.filter(
        (task) => task.id != btn.dataset.id
      );

      tasksToDo = updatedTasksToDo;

      renderLists();
    });
  });
};

const renderLists = () => {
  loadTasksToDo(tasksToDo);
  loadTasksDone(tasksDone);
};

handleTaskCreation();
renderLists();
