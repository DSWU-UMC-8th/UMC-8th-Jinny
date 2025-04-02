// 1. HTML 요소 선택
const todoInput = document.getElementById("todo_container__input") as HTMLInputElement; // 할 일 입력
const todoFrom = document.getElementById("form") as HTMLFormElement; // form 태그 영역
const todoList = document.getElementById("todo_list") as HTMLDivElement; // 할 일 목록
const doneList = document.getElementById("done_list") as HTMLDivElement; // 완료 목록

// 2. 할 일의 Type을 정의
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 3. 할 일 목록 렌더링 하는 함수를 정의
const renderTasks = (): void => {
  // <h4> 태그는 제거하지 않고 비우도록
  while (todoList.children.length > 1) {
    const lastChild = todoList.lastChild;
    if (lastChild) {
      todoList.removeChild(lastChild); // lastChild가 null이 아닌 경우에만 삭제
    }
  }

  while (doneList.children.length > 1) {
    const lastChild = doneList.lastChild;
    if (lastChild) {
      doneList.removeChild(lastChild); // lastChild가 null이 아닌 경우에만 삭제
    }
  }

  todos.forEach((todo): void => {
    const item = createTodoElement(todo, false);
    todoList.appendChild(item);
  });

  doneTasks.forEach((todo): void => {
    const item = createTodoElement(todo, true);
    doneList.appendChild(item);
  });
};

// 4. 할 일 텍스트 입력 처리 함수 (공백 잘라줌)
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 5. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

// 6. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 7. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
  renderTasks();
};

// 8. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
  const todoItemDiv = document.createElement("div");
  const todoContent = document.createElement("p");
  const todoBtn = document.createElement("button");

  if (isDone) {
    todoItemDiv.classList.add("render_container__donelist");
  } else {
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

    todoBtn.addEventListener("mouseover", (): void => {
      todoBtn.style.backgroundColor = "rgb(187, 34, 34)";
    });

    todoBtn.addEventListener("mouseout", (): void => {
      todoBtn.style.backgroundColor = "rgb(235, 43, 43)";
    });
  } else {
    todoBtn.innerText = "완료";
  }

  todoBtn.addEventListener("click", (): void => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  return todoItemDiv;
};

// 9. 폼 제출 이벤트 리스너
todoFrom.addEventListener("submit", (e: Event): void => {
  e.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTasks();
