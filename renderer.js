// -------- PERFIL --------
function loadProfile() {
  const data = localStorage.getItem("profile");
  if (data) {
    const profile = JSON.parse(data);
    document.getElementById("user-name").textContent =
      profile.firstName + " " + profile.lastName;
    document.getElementById("user-alias").textContent = profile.alias;
    if (profile.avatar) {
      document.getElementById("user-avatar").style.backgroundImage =
        `url(${profile.avatar})`;
    }
    document.getElementById("profile-screen").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
  } else {
    document.getElementById("profile-screen").classList.remove("hidden");
    document.getElementById("main-app").classList.add("hidden");
  }
}

document.getElementById("profile-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const alias = document.getElementById("alias").value;
  const file = document.getElementById("avatar").files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      saveProfile(firstName, lastName, alias, ev.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveProfile(firstName, lastName, alias, null);
  }
});

function saveProfile(firstName, lastName, alias, avatar) {
  const profile = { firstName, lastName, alias, avatar };
  localStorage.setItem("profile", JSON.stringify(profile));
  loadProfile();
}

// -------- TAREAS --------
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const taskTemplate = document.getElementById("task-item");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskEl = taskTemplate.content.cloneNode(true);
    const checkbox = taskEl.querySelector("input");
    const text = taskEl.querySelector(".task-text");

    text.textContent = task.text;
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    });

    taskList.appendChild(taskEl);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addTaskBtn?.addEventListener("click", () => {
  const text = prompt("Nueva tarea:");
  if (text) {
    tasks.push({ text, done: false });
    saveTasks();
  }
});

renderTasks();
loadProfile();