// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
// taskInput.placeholder = 'Task';

// Load all event listeners
loadEventListeners();

// Load all event Listeners function
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS function
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class (for ul to look good)
        li.className = 'collection-item';
        // Create text node & append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element (delete)
        const link = document.createElement('a');
        // Add class 
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task function
function addTask(e) {
    // checking if no task is entered then show an alert
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class (for ul to look good)
    li.className = 'collection-item';
    // Create text node & append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element (delete)
    const link = document.createElement('a');
    // Add class (to have delete on right side use secondary-content class)
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    // link.innerHTML = '<i class="fa-solid fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input after 'Add Task' btn is clicked
    taskInput.value = '';

    // prevent default behaviour of an event (loading continuously)
    e.preventDefault();
}

// Store task function
function storeTaskInLocalStorage(task) {
    let tasks;

    // check if local storage already has task, if empty set tasks[] as empty else Parse the json String as Object & pass to 'tasks'
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // push to 'tasks' & pass in the 'task' (the taskInput)
    tasks.push(task);

    // set to local storage, converting JavaScript value to JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
    // checking if the <a> contains class 'delete-item'
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove tasks from Local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS function
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks Function
function clearTasks() {
    // slower
    // taskList.innerHTML = '';

    // Faster than innerHtml
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from LS Function
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Task function
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // select all with class 'collection-item' & pass function in forEach with iterator 'task'
    document.querySelectorAll('.collection-item').forEach(function (task) {
        // variable with textContent of the firstChild of iterator
        const item = task.firstChild.textContent;
        // check if the text typed for filter matches the item
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}