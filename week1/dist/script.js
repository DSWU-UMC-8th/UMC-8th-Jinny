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
    todoBtn.addEventListener("click", () => {
        todoItemDiv.remove();
        const doneItem = document.getElementsByClassName("todo_completed")[0];
        const doneItemDiv = document.createElement("div");
        const doneContent = document.createElement("p");
        const deleteBtn = document.createElement("button");
        doneItemDiv.classList.add("done_item");
        doneContent.classList.add("done_text");
        deleteBtn.classList.add("delete_btn");
        doneContent.innerText = todoContent.innerText;
        deleteBtn.innerText = "삭제";
        doneItemDiv.appendChild(doneContent);
        doneItemDiv.appendChild(deleteBtn);
        doneItem.appendChild(doneItemDiv);
        deleteBtn.addEventListener("click", () => {
            doneItemDiv.remove();
        });
    });
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
