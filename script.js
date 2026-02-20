document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark");
    }

    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if (text === "") return;

    createTaskElement(text, false);
    input.value = "";

    saveTasks();
    updateTaskCount();
}

function createTaskElement(text, completed) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    let span = document.createElement("span");
    span.textContent = text;
    // Eğer görev tamamlanmışsa stili uygula
    if (completed) span.classList.add("completed-text");

    checkbox.onchange = function () {
        span.classList.toggle("completed-text", checkbox.checked);
        saveTasks();
        updateTaskCount();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // İkon ekledik
    deleteBtn.style.background = "#ff4d4d";
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
        updateTaskCount();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(li => {
        let checked = li.querySelector("input").checked;

        if (type === "all") {
            li.style.display = "flex";
        } else if (type === "active") {
            li.style.display = checked ? "none" : "flex";
        } else if (type === "completed") {
            li.style.display = checked ? "flex" : "none";
        }
    });
}

function updateTaskCount() {
    let tasks = document.querySelectorAll("#taskList li");
    let remaining = 0;

    tasks.forEach(li => {
        if (!li.querySelector("input").checked) remaining++;
    });

    document.getElementById("taskCount").textContent =
        remaining + " görev kaldı";
}

function clearCompleted() {
    document.querySelectorAll("#taskList li").forEach(li => {
        if (li.querySelector("input").checked) {
            li.remove();
        }
    });

    saveTasks();
    updateTaskCount();
}

function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });

    updateTaskCount();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
}