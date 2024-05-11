const tasksToDo = [];
const tasksDone = [];

const handleTaskCreation = () => {
  const input = document.querySelector(".add-tasks__input");
  const submitBtn = document.querySelector(".submit-tasks__btn");

  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const newTask = {
      id: tasksToDo.length,
      task: input.value,
    };

    tasksToDo.push(newTask);

    loadTasksToDo();
  });
};

const loadTasksToDo = () => {
  const toDoSectionTitle = document.querySelector(".todo__section > p");
  const toDoList = document.querySelector(".tasks__to-do");

  toDoSectionTitle.innerHTML = `Tasks to do - ${tasksToDo.length}`;

  toDoList.innerHTML = "";
  tasksToDo.forEach((task) => {
    toDoList.insertAdjacentHTML(
      "afterbegin",
      `<li id=${task.id}>${task.task}</li>`
    );
  });
};

loadTasksToDo();
handleTaskCreation();
