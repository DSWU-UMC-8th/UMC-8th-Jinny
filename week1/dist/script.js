"use strict";
const todoInput = document.getElementById("todo_container__input");
const todoFrom = document.getElementById("form");
const todoList = document.getElementById("todo_list");
const doneList = document.getElementById("done_list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    while (todoList.children.length > 1) {
        const lastChild = todoList.lastChild;
        if (lastChild) {
            todoList.removeChild(lastChild);
        }
    }
    while (doneList.children.length > 1) {
        const lastChild = doneList.lastChild;
        if (lastChild) {
            doneList.removeChild(lastChild);
        }
    }
    todos.forEach((todo) => {
        const item = createTodoElement(todo, false);
        todoList.appendChild(item);
    });
    doneTasks.forEach((todo) => {
        const item = createTodoElement(todo, true);
        doneList.appendChild(item);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTasks();
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const todoItemDiv = document.createElement("div");
    const todoContent = document.createElement("p");
    const todoBtn = document.createElement("button");
    if (isDone) {
        todoItemDiv.classList.add("render_container__donelist");
    }
    else {
        todoItemDiv.classList.add("render_container__todolist");
    }
    todoContent.classList.add("render_container__text");
    todoBtn.classList.add("render_container__btn");
    todoContent.textContent = todo.text;
    todoItemDiv.appendChild(todoContent);
    todoItemDiv.appendChild(todoBtn);
    if (isDone) {
        todoBtn.innerText = "삭제";
        todoBtn.style.backgroundColor = "rgb(235, 43, 43)";
        todoBtn.style.transition = "background-color 0.3s ease";
        todoBtn.addEventListener("mouseover", () => {
            todoBtn.style.backgroundColor = "rgb(187, 34, 34)";
        });
        todoBtn.addEventListener("mouseout", () => {
            todoBtn.style.backgroundColor = "rgb(235, 43, 43)";
        });
    }
    else {
        todoBtn.innerText = "완료";
    }
    todoBtn.addEventListener("click", () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    return todoItemDiv;
};
todoFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
