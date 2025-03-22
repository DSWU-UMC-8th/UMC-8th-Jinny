const input = document.getElementById("form_input") as HTMLInputElement; // 할 일 입력
const addBtn = document.getElementById("form_btn") as HTMLButtonElement; // 할 일 추가 버튼

// 할 일 추가하는 함수
function addTodoItem(content: string): void {
  const todoItem = document.getElementsByClassName("todo_todo")[0] as HTMLDivElement; // 할 일 목록

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

// 버튼 누르면 추가
addBtn.addEventListener("click", (): void => {
  let content: string = input.value; // 입력된 내용

  if (content) {
    addTodoItem(content);
    input.value = "";
  }
});

// 엔터 누르면 추가
input.addEventListener("keydown", (e: KeyboardEvent): void => {
  if (e.key === "Enter") {
    let content: string = input.value;

    if (content) {
      addTodoItem(content);
      input.value = "";
    }
  }
});
