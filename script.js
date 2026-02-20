function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Lütfen bir görev yaz!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskText;

    // Tıklayınca tamamlandı efekti
    li.onclick = function () {
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.6";
    };

    document.getElementById("taskList").appendChild(li);
   
    input.value = "";
    document.getElementById("taskInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
}