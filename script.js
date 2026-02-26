document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
    if (localStorage.getItem("darkMode") === "on") document.body.classList.add("dark");
});

function addTask() {
    let titleInput = document.getElementById("taskInput");
    let detailInput = document.getElementById("taskDetail");
    
    let title = titleInput.value.trim();
    let detail = detailInput.value.trim();

    // BOŞ KONTROLÜ
    if (title === "") {
        alert("Lütfen en azından bir başlık giriniz!");
        return;
    }

    createTaskElement(title, detail, false);
    titleInput.value = "";
    detailInput.value = "";
    saveTasks();
    updateTaskCount();
}

function createTaskElement(title, detail, completed) {
    let li = document.createElement("li");

    // BAŞLIK ALANI
    let header = document.createElement("div");
    header.className = "task-header";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onclick = (e) => e.stopPropagation(); // Detay açılmasın

    let span = document.createElement("span");
    span.textContent = title;
    if (completed) span.classList.add("completed-text");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function (e) {
        e.stopPropagation();
        // SİLME ONAYI
        if (confirm("Bu görevi silmek istediğinize emin misiniz?")) {
            li.remove();
            saveTasks();
            updateTaskCount();
        }
    };

    header.appendChild(checkbox);
    header.appendChild(span);
    header.appendChild(deleteBtn);

    // DETAY ALANI
    let content = document.createElement("div");
    content.className = "task-content";
    content.textContent = detail || "Ek açıklama yok.";

    // TIKLAYINCA AÇILMA MANTIĞI
    header.onclick = () => content.classList.toggle("show-detail");

    checkbox.onchange = function () {
        span.classList.toggle("completed-text", checkbox.checked);
        saveTasks();
        updateTaskCount();
    };

    li.appendChild(header);
    li.appendChild(content);
    document.getElementById("taskList").appendChild(li);
}

function filterTasks(type) {
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(li => {
        let isChecked = li.querySelector("input").checked;
        if (type === 'all') li.style.display = "flex";
        else if (type === 'active') li.style.display = isChecked ? "none" : "flex";
        else if (type === 'completed') li.style.display = isChecked ? "flex" : "none";
    });
}

function updateTaskCount() {
    let count = 0;
    document.querySelectorAll("#taskList li").forEach(li => {
        if (!li.querySelector("input").checked) count++;
    });
    document.getElementById("taskCount").textContent = count + " görev kaldı";
}

function clearCompleted() {
    document.querySelectorAll("#taskList li").forEach(li => {
        if (li.querySelector("input").checked) li.remove();
    });
    saveTasks();
    updateTaskCount();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            title: li.querySelector(".task-header span").textContent,
            detail: li.querySelector(".task-content").textContent,
            completed: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTaskElement(t.title, t.detail, t.completed));
    updateTaskCount();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "on" : "off");
}