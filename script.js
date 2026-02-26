document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    // Kayıtlı temayı yükle
    if (localStorage.getItem("auroraTheme") === "dark") {
        document.body.classList.replace("light-theme", "dark-theme");
    }
});

function toggleDarkMode() {
    const body = document.body;
    if (body.classList.contains("light-theme")) {
        body.classList.replace("light-theme", "dark-theme");
        localStorage.setItem("auroraTheme", "dark");
    } else {
        body.classList.replace("dark-theme", "light-theme");
        localStorage.setItem("auroraTheme", "light");
    }
}

function addTask() {
    const titleInp = document.getElementById("taskInput");
    const detailInp = document.getElementById("taskDetail");
    
    if (titleInp.value.trim() === "") {
        alert("Lütfen bir başlık girin!");
        return;
    }

    createTaskElement(titleInp.value.trim(), detailInp.value.trim(), false);
    titleInp.value = ""; detailInp.value = "";
    saveTasks();
    updateTaskCount();
}

function createTaskElement(title, detail, completed) {
    const li = document.createElement("li");

    const header = document.createElement("div");
    header.className = "task-header";
    header.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''} onclick="event.stopPropagation()">
        <span class="${completed ? 'completed-text' : ''}" style="flex:1">${title}</span>
        <button class="delete-btn" onclick="deleteTask(event, this)"><i class="fas fa-trash"></i></button>
    `;

    const content = document.createElement("div");
    content.className = "task-content";
    content.innerHTML = `
        <p>${detail || 'Açıklama yok.'}</p>
        <button class="edit-btn-inline" onclick="editTask(this)"><i class="fas fa-edit"></i> Düzenle</button>
    `;

    header.onclick = () => content.classList.toggle("show-detail");
    
    const checkbox = header.querySelector("input");
    checkbox.onchange = () => {
        header.querySelector("span").classList.toggle("completed-text", checkbox.checked);
        saveTasks();
        updateTaskCount();
    };

    li.appendChild(header);
    li.appendChild(content);
    document.getElementById("taskList").appendChild(li);
}

function deleteTask(e, btn) {
    e.stopPropagation();
    if (confirm("Bu görevi silmek istiyor musunuz?")) {
        btn.closest("li").remove();
        saveTasks();
        updateTaskCount();
    }
}

function editTask(btn) {
    const li = btn.closest("li");
    const span = li.querySelector(".task-header span");
    const p = li.querySelector(".task-content p");

    if (btn.innerText.includes("Düzenle")) {
        const oldTitle = span.innerText;
        const oldDetail = p.innerText === "Açıklama yok." ? "" : p.innerText;
        span.innerHTML = `<input type="text" value="${oldTitle}" class="edit-field">`;
        p.innerHTML = `<textarea class="edit-field">${oldDetail}</textarea>`;
        btn.innerHTML = `<i class="fas fa-save"></i> Kaydet`;
    } else {
        const newTitle = span.querySelector("input").value;
        const newDetail = p.querySelector("textarea").value;
        span.innerText = newTitle || "Başlıksız";
        p.innerText = newDetail || "Açıklama yok.";
        btn.innerHTML = `<i class="fas fa-edit"></i> Düzenle`;
        saveTasks();
    }
}

function filterTasks(type) {
    // Filtre butonlarının aktiflik durumunu güncelle
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(type === 'all' ? 'tümü' : type === 'active' ? 'aktif' : 'bitenler')) {
            btn.classList.add('active');
        }
    });

    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(li => {
        const checked = li.querySelector("input").checked;
        if (type === 'all') li.style.display = "block";
        else if (type === 'active') li.style.display = checked ? "none" : "block";
        else if (type === 'completed') li.style.display = checked ? "block" : "none";
    });
}

function updateTaskCount() {
    const count = Array.from(document.querySelectorAll("#taskList li input")).filter(i => !i.checked).length;
    document.getElementById("taskCount").innerText = `${count} görev kaldı`;
}

function saveTasks() {
    const data = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        data.push({
            title: li.querySelector(".task-header span").innerText,
            detail: li.querySelector(".task-content p").innerText,
            completed: li.querySelector(".task-header input").checked
        });
    });
    localStorage.setItem("auroraTasks", JSON.stringify(data));
}

function loadTasks() {
    const data = JSON.parse(localStorage.getItem("auroraTasks") || "[]");
    data.forEach(t => createTaskElement(t.title, t.detail, t.completed));
    updateTaskCount();
}

function clearCompleted() {
    if(confirm("Biten görevler temizlensin mi?")) {
        document.querySelectorAll("#taskList li").forEach(li => {
            if(li.querySelector("input").checked) li.remove();
        });
        saveTasks();
        updateTaskCount();
    }
}