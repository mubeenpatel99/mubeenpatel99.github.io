//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const error = document.querySelector('.error');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //prevent form submitting
    event.preventDefault();
    if (todoInput.value == "") {
        error.classList.remove('hidden');
    } else {
        error.classList.add('hidden');
        //To Do Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //ADD Todo to local storage
        saveLocalTodos(todoInput.value);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    }
    //Clear Todo input value
    todoInput.value = "";
    todoInput.focus();
}

function deleteCheck(event) {
    const item = event.target;
    //Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        //remove from local storage
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });

    }

    //Check Item
    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        localCompletedTodo(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                if (todo.nodeName != "#text") {
                    todo.style.display = 'flex';
                }
                break;
            case "completed":
                if (todo.nodeName != "#text") {
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                }
                break;
            case "uncompleted":
                if (todo.nodeName != "#text") {
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                }
        }
    });
}


//To store in local storage
function saveLocalTodos(todo) {

    let todos;
    //check if we already have todos
    if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
    } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Get Todos from local storage
function getTodos() {
    let todos;
    //for completed Todos
    let completedTodos;
    //check if we already have todos
    if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
    } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //check if we already have completed todos
    if (localStorage.getItem('completedTodos') === null) {
        //if no create one
        completedTodos = [];
    } else {
        //if yes get them
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    todos.forEach(function(todo) {
        //To Do Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
    completedTodos.forEach(function(todo) {
        //To Do Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('completed');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checked button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

//Delete Todo from Local storage
function removeLocalTodos(todo) {
    let todos;
    //For completed ones
    let completedTodos;
    //check if we already have todos
    if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
    } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //check if we already have completed todos
    if (localStorage.getItem('completedTodos') === null) {
        //if no create one
        completedTodos = [];
    } else {
        //if yes get them
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    const todoElement = todo.children[0].innerText;
    if (completedTodos.includes(todoElement)) {
        completedTodos.splice(completedTodos.indexOf(todoElement), 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    } else {
        todos.splice(todos.indexOf(todoElement), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

}

function localCompletedTodo(todo) {
    let completedTodos;
    //For General ToDos
    let todos;
    //check if we already have todos
    if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
    } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //For Completed Todos
    //check if we already have completed todos
    if (localStorage.getItem('completedTodos') === null) {
        //if no create one
        completedTodos = [];
    } else {
        //if yes get them
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }
    //if element doesn't already exist add
    if (!completedTodos.includes(todo.children[0].innerText)) {
        completedTodos.push(todo.children[0].innerText);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        //Delete from General
        const todoElement = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoElement), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        //Delete from completed
        const todoElement = todo.children[0].innerText;
        completedTodos.splice(completedTodos.indexOf(todoElement), 1);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
        //Add to general
        saveLocalTodos(todoElement);
    }
}