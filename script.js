document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">Удалить</button>
        `;
        taskList.appendChild(li);

        li.querySelector("span").addEventListener("click", function() {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector(".deleteBtn").addEventListener("click", function() {
            taskList.removeChild(li);
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            const task = {
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed"),
            };
            tasks.push(task);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                const lastLi = taskList.lastChild;
                lastLi.classList.add("completed");
            }
        });
    }
});