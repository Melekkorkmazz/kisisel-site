document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    // Dark mode yükle
    if (localStorage.getItem("darkMode") === "on") {
        document.body.classList.add("dark");
    }

    // Enter ile ekleme
    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});

// Görev ekle
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if (text === "") return;

    createTaskElement(text, false);
    input.value = "";

    saveTasks();
    updateTaskCount();
}

// Görev oluştur
function createTaskElement(text, completed) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    checkbox.onchange = function () {
        saveTasks();
        updateTaskCount();
    };

    let span = document.createElement("span");
    span.textContent = text;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
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

// Filtre
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

// Sayaç
function updateTaskCount() {
    let tasks = document.querySelectorAll("#taskList li");
    let remaining = 0;

    tasks.forEach(li => {
        if (!li.querySelector("input").checked) remaining++;
    });

    document.getElementById("taskCount").textContent =
        remaining + " görev kaldı";
}

// Tamamlananları temizle
function clearCompleted() {
    document.querySelectorAll("#taskList li").forEach(li => {
        if (li.querySelector("input").checked) {
            li.remove();
        }
    });

    saveTasks();
    updateTaskCount();
}

// Kaydet
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

// Yükle
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });

    updateTaskCount();
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "on");
    } else {
        localStorage.setItem("darkMode", "off");
    }
}