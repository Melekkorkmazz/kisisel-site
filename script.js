// Sayfa açılınca kayıtlı görevleri yükle
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    // Enter ile görev ekleme
    document.getElementById("taskInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});

// Görev ekleme
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText, false);

    input.value = "";

    saveTasks();
    updateTaskCount();
}

// Görev elementi oluşturma (tekrar kullanılabilir)
function createTaskElement(text, completed) {
    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    checkbox.onchange = function () {
        saveTasks();
        updateTaskCount();
    };

    // Görev metni
    let span = document.createElement("span");
    span.textContent = text;

    // Sil butonu
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

// Filtreleme
function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(li => {
        let checkbox = li.querySelector("input");
        let isCompleted = checkbox.checked;

        if (type === "all") {
            li.style.display = "flex";
        } 
        else if (type === "active") {
            li.style.display = isCompleted ? "none" : "flex";
        } 
        else if (type === "completed") {
            li.style.display = isCompleted ? "flex" : "none";
        }
    });
}

// Kalan görev sayısı
function updateTaskCount() {
    let tasks = document.querySelectorAll("#taskList li");
    let remaining = 0;

    tasks.forEach(li => {
        let checkbox = li.querySelector("input");
        if (!checkbox.checked) remaining++;
    });

    let counter = document.getElementById("taskCount");
    if (counter) {
        counter.textContent = remaining + " görev kaldı";
    }
}

// Tamamlananları temizle
function clearCompleted() {
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(li => {
        let checkbox = li.querySelector("input");
        if (checkbox.checked) {
            li.remove();
        }
    });

    saveTasks();
    updateTaskCount();
}

// LocalStorage'a kaydet
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.querySelector("span").textContent;
        let completed = li.querySelector("input").checked;

        tasks.push({
            text: text,
            completed: completed
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// LocalStorage'dan yükle
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });

    updateTaskCount();
}