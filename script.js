document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const todoList = document.querySelector('#todo-list');

    
    loadTasks();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#Actual-task');
        const descriptionInput = document.querySelector('#Description');

        const taskText = taskInput.value.trim();
        const descriptionText = descriptionInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const existingTask = document.querySelector(`.task[data-task="${taskText}"]`);

        if (existingTask) {
            const descriptionElement = document.createElement('li');
            descriptionElement.textContent = descriptionText;
            descriptionElement.classList.add('description');
            descriptionElement.innerHTML += `<input type="checkbox" class="description-checkbox" onclick="toggleDescriptionCompletion(this)">
                                            <button class="delete-button" onclick="deleteDescription(this)">❌</button>`;
            existingTask.querySelector('.description-list').appendChild(descriptionElement);
        } else {
            const taskElement = document.createElement('li');
            taskElement.dataset.task = taskText;
            taskElement.classList.add('task');
            taskElement.innerHTML = `
            <li class="task task-box" data-task="Sample Task">
                <span class="task-name">🌟${taskText}</span>
                <input type="checkbox" class="task-checkbox" onclick="toggleTaskCompletion(this)">
                <button class="delete-button" onclick="deleteTask(this.parentElement)">❌</button>
                <ul class="description-list">
                    <li class="description">${descriptionText}<input type="checkbox" class="description-checkbox" onclick="toggleDescriptionCompletion(this)"><button class="delete-button" onclick="deleteDescription(this)">❌</button></li>
                </ul> 
            </li>`;
            
            todoList.appendChild(taskElement);
        }

        
        saveTasks();

        taskInput.value = '';
        descriptionInput.value = '';
    });
});

function deleteDescription(button) {
    button.parentElement.remove();
    saveTasks();
}

function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

function toggleDescriptionCompletion(checkbox) {
    const descriptionText = checkbox.parentElement.textContent;
    if (checkbox.checked) {
        checkbox.parentElement.style.textDecoration = 'line-through';
    } else {
        checkbox.parentElement.style.textDecoration = 'none';
    }
    saveTasks();
}

function toggleTaskCompletion(checkbox) {
    const taskName = checkbox.parentElement.querySelector('.task-name');
    if (checkbox.checked) {
        taskName.style.textDecoration = 'line-through';
    } else {
        taskName.style.textDecoration = 'none';
    }
    saveTasks();
}

function saveTasks() {
    const todoList = document.querySelector('#todo-list').innerHTML;
    localStorage.setItem('todoList', todoList);
}

function loadTasks() {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
        document.querySelector('#todo-list').innerHTML = savedTodoList;
    }
}


