// Sayfa açılınca kayıtlı görevleri yükle
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

    if (taskText === "") {
        alert("Lütfen bir görev yaz!");
        return;
    }

    createTaskElement(taskText);
    input.value = "";
    saveTasks();
}

function createTaskElement(taskText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";

    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList span").forEach(span => {
        tasks.push(span.textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task);
    });
}