const form = document.getElementById('todo-form')

let todos = [];

form.addEventListener('submit', function (event) {
     event.preventDefault();

     console.log('submit');
});