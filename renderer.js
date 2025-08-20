const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;

    li.addEventListener("click", () => li.classList.toggle("done"));

    taskList.appendChild(li);
    input.value = "";
  }
});