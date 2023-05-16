// ? CONSTs
const form = document.getElementById('todo-form');
const toDoInput = document.getElementById('new-todo-id');
const toDoListElement = document.getElementById('todo-list');

// * GLOBAL VARS
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editToDoID = -1;

// FIRST RENDER
renderToDos();

//! FORM SUBMIT
form.addEventListener('submit', function (event) {
     event.preventDefault();

     saveToDo();

     renderToDos();

     localStorage.setItem('todos', JSON.stringify(todos))
});

// ! FUNCTION SAVETODO 
function saveToDo() {
     const toDoValue = toDoInput.value;

// ! IF EMPTY
     const isEmpty = toDoValue === '';

// ! DUPLICATE CHECK

     const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === toDoValue.toUpperCase());

// ! TODO:  

     if(isEmpty) {
          alert('To do is empty');
     }else if(isDuplicate){
          alert('To do is duplicate');
     }else{
          if(editToDoID >= 0){
               //EDIT OLD TODO

               todos = todos.map((todo, index) => ({
                    ...todo,
                    value : index === editToDoID ? toDoValue : todo.value,
               }));
               editToDoID = -1;
          } else {
               //ADD NEW TODO

               todos.push({
                    value : toDoValue,
                    checked : false,
                    color : '#' + Math.floor(Math.random()*16777215).toString(16)
               });
          }       
     toDoInput.value = '';    
     }
};

// ! FUNCTION RENDER TODOs 
function renderToDos(){
     
     //CLEAR BEFORE RERENDER
     toDoListElement.innerHTML = '';

     //RENDER HTML STRUCTURE IN TODO, ADD DATA ACTION TO <i> 
     todos.forEach((todo, index) => {
          toDoListElement.innerHTML += 
          `
               <div class="todo" id="${index}">
                    <i class="bi ${todo.checked ? 'bi-check-circle' : 'bi-circle'} style=color : $ ${todo.color}" data-action="check" ></i>
                    <p class="${todo.checked ? 'checked' : ''}" data-action="check" >${todo.value}</p>
                    <i class="bi bi-pen" data-action="edit" ></i>
                    <i class="bi bi-x-lg" data-action="delete" ></i>
               </div>
          `
     })
};

// ! LISTENING FOR TODOS, TARGET ACTIONS, ID

toDoListElement.addEventListener('click', (event) => {
     const target = event.target;
     const parentElement = target.parentNode;

//CHECK IF WE CLICK TODO ELEMENT

     if(parentElement.className !== 'todo') return;

//GIVE ID TO TODO

     const todo = parentElement;
     const todoID = Number(todo.id);

//TARGET ACTION ON HTML
     const action = target.dataset.action

     action === 'check' && checkToDo(todoID);
     action === 'edit' && editToDo(todoID);
     action === 'delete' && deleteToDo(todoID);

     console.log (todoID, action);
})

// ! FUNCTION CHECK TODO 

function checkToDo(todoID) {
     todos = todos.map ((todo, index) => ( {
          ...todo,
          checked: index === todoID ? !todo.checked : todo.checked
     }));

     renderToDos();
     localStorage.setItem('todos', JSON.stringify(todos))
}

// ! FUNCTION EDIT TODO 

function editToDo(todoID) {
     toDoInput.value = todos[todoID].value;
     editToDoID = todoID;
}

// ! FUNCTION DELETE TODO

function deleteToDo(todoID){
     todos = todos.filter( (todo, index) => index !== todoID);
     editToDoID = -1;

     renderToDos();
     localStorage.setItem('todos', JSON.stringify(todos))
}

// ! LOCAL STORAGE 
