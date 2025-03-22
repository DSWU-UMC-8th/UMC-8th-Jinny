"use strict";
const input = document.getElementById("form_input");
const addBtn = document.getElementById("form_btn");
function addTodoItem(content) {
    const todoItem = document.getElementsByClassName("todo_todo")[0];
    const todoItemDiv = document.createElement("div");
    const todoContent = document.createElement("p");
    const todoBtn = document.createElement("button");
    todoItemDiv.classList.add("todo_item");
    todoContent.classList.add("todo_text");
    todoBtn.classList.add("done_btn");
    todoContent.innerText = content;
    todoBtn.innerText = "완료";
    todoItemDiv.appendChild(todoContent);
    todoItemDiv.appendChild(todoBtn);
    todoItem.appendChild(todoItemDiv);
}
addBtn.addEventListener("click", () => {
    let content = input.value;
    if (content) {
        addTodoItem(content);
        input.value = "";
    }
});
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let content = input.value;
        if (content) {
            addTodoItem(content);
            input.value = "";
        }
    }
});
