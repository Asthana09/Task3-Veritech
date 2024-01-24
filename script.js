document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();
});

function addTask() {
    // Get the task input value
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Add the task to the task list
        document.getElementById('taskList').appendChild(taskItem);

        // Clear the input field
        taskInput.value = '';

        // Save tasks to local storage
        saveTasks();
    }
}

function manageTasks(event) {
    const target = event.target;

    if (target.classList.contains('edit-btn')) {
        editTask(target.parentElement);
    } else if (target.classList.contains('delete-btn')) {
        deleteTask(target.parentElement);
    }
}

function editTask(taskItem) {
    const span = taskItem.querySelector('span');
    const newTaskText = prompt('Edit task:', span.textContent);

    if (newTaskText !== null) {
        span.textContent = newTaskText;

        // Save tasks to local storage
        saveTasks();
    }
}

function deleteTask(taskItem) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskItem.remove();

        // Save tasks to local storage
        saveTasks();
    }
}

function saveTasks() {
    // Get all tasks from the task list
    const tasks = document.querySelectorAll('li');

    // Convert NodeList to an array and map it to get the text content of each task
    const taskArray = Array.from(tasks).map(task => task.querySelector('span').textContent);

    // Save tasks to local storage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function loadTasks() {
    // Retrieve tasks from local storage
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        // Parse the JSON string to get the array of tasks
        const taskArray = JSON.parse(storedTasks);

        // Create task items for each task in the array
        taskArray.forEach(taskText => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            document.getElementById('taskList').appendChild(taskItem);
        });
    }
}
