document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addtaskbtn = document.getElementById("add-task-btn");
    const todolist = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Initialize tasks from localStorage
    tasks.forEach(task => renderTask(task));

    addtaskbtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveItem();
        renderTask(newTask);
        todoInput.value = "";
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id);

        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <button>delete</button>
        `;

        // Toggle completion status
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveItem();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveItem();
        });

        todolist.appendChild(li);
    }

    function saveItem() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});