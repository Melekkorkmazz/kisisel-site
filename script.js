document.addEventListener("DOMContentLoaded", loadTasks);

// Enter ile ekleme
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText, false);
    input.value = "";
    saveTasks();
}

function createTaskElement(text, completed) {
    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    // Görev yazısı
    let span = document.createElement("span");
    span.textContent = text;

    if (completed) {
        span.style.textDecoration = "line-through";
        span.style.opacity = "0.6";
    }

    checkbox.onchange = function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
        } else {
            span.style.textDecoration = "none";
            span.style.opacity = "1";
        }
        saveTasks();
    };

    // Sil butonu
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("input").checked;

        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}