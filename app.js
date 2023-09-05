document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const completedTasks = document.getElementById("completedTasks");
  const deletedTasks = document.getElementById("deletedTasks");

  addTaskButton.addEventListener("click", addTask);

  taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskRow = createTaskRow(taskText);
      taskList.appendChild(taskRow);
      taskInput.value = "";
    }
  }

  function createTaskRow(text, withButtons = true) {
    const taskRow = document.createElement("div");
    taskRow.className = "task-row";

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = text;
    taskRow.appendChild(taskTextElement);

    if (withButtons) {
      const completeButton = document.createElement("button");
      completeButton.textContent = "Concluir";
      completeButton.className =
        "complete-button btn btn-success btn-sm d-none";
      completeButton.addEventListener("click", function () {
        taskList.removeChild(taskRow);
        const completedTaskRow = createTaskRow(text, false);
        completedTasks.appendChild(completedTaskRow);
      });
      taskRow.appendChild(completeButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.className = "delete-button btn btn-danger btn-sm d-none";
      deleteButton.addEventListener("click", function () {
        taskList.removeChild(taskRow);
        const deletedTaskRow = createTaskRow(text, false);
        deletedTasks.appendChild(deletedTaskRow);
      });
      taskRow.appendChild(deleteButton);

      taskRow.addEventListener("mouseenter", function () {
        completeButton.classList.remove("d-none");
        deleteButton.classList.remove("d-none");
      });

      taskRow.addEventListener("mouseleave", function () {
        completeButton.classList.add("d-none");
        deleteButton.classList.add("d-none");
      });
    }

    return taskRow;
  }
});
