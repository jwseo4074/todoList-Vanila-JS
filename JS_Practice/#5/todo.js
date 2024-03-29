const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-form input");

const TODOS_KEY = "todos";

// const toDos = [];
// 웹이 새로 로드되면 배열 비어있는 상태로 시작함

let toDos = [];

function saveToDos(){
    // 이게 실행되는 시점에는 배열에 toDo가 저장되어 있음
    // localStorage.setItem("todos", toDos);

    // localStorage.setItem("todos", toDos);
    // console.dir(localStorage);
    // 이렇게 하면? todos: "1,2,3" 이렇게 나옴

    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // console.dir(localStorage);
    // 이렇게 하면? todos: "[\"1\",\"2\",\"3\"]" 이렇게 나옴

    // 이렇게 넣으면 key : todos, value : a,b,c,d => 텍스트 형태로 저장됨
    // 그럼 어떻게 해줘야 할까?
    // console.dir(localStorage.Item("todos"));    
}

function deleteToDo(event) {
    // console.log(event.target.parentElement.innerText);
    // console.dir(event.target.parentElement.innerText);
    
    // 여기서 target은 클릭된 HTML element 이다.
    // 해당 element에는 하나 이상의 property가 있다.

    const li = event.target.parentElement
    // console.log(li);
    // 버튼의 부모는? li 태그.
    li.remove();
    // remove 함수는 선택한 요소를 제거할 때 사용하거나, 요소 내의 태그들을 삭제할 때 사용합니다. 
    
    console.log(toDos);

    toDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    // localStorage.removeItem(li); 뭐 이런식으로 해주고 싶은데
    // 안에 내용이 같으면 지울 수가 없잖아
    console.log(toDos);
    saveToDos();
}

function paintToDo(newTodo) {
    // toDo 를 그리는 역할을 하는 함수
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = " ❌";

    button.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
    // li에 append는 무조건 젤 마지막!
}
function handleToDoSubmit(event) {
    event.preventDefault();
    
    // console.log(todoInput.value);

    const newTodo = todoInput.value;
    todoInput.value = ""; 

    // console.log(newTodo, todoInput.value)

    const newToDoObj = {
        text : newTodo,
        id : Date.now()
        // 현재 시간을 밀리초로 나타냄 => id 값으로 사용 가능
    }
    toDos.push(newToDoObj);
    // 값 가져오면 배열에 일단 저장, 이걸 로컬 스토리지에 저장하고 싶어
    // 근데 로컬 스토리지에는 텍스트만 저장 가능해

    paintToDo(newToDoObj);
    saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

function sayHello(item) {
    console.log(`this is turn of ${item}`);
    // 이벤트 발생 했을 때 자동으로 event 인자로 넘겨주듯이
    // 함수에서 item 자동으로 쓸 수 있음
}
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);``
    // parsedToDos.forEach(sayHello);

    toDos = parsedToDos;
    //지금 로컬스토리지에 있는거 값 저장해두고

    parsedToDos.forEach(paintToDo);
    //parsedToDos 가 array 라서 foreach 가 가능(아이템 별로)

    // parsedToDos.forEach(sayHello);  이거랑
    // parsedToDos.forEach((items) => console.log(`this is turn of ${item})); 이랑
    // 똑같다
}