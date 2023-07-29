// => arrow function. we put the parameters in teh left and the return valles in the right.
window.addEventListener('load', () => {
    // getting the todos from the local storage using JSON
    // we get the items in the todos in the local storage or define a new array
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // we get the item called username or set it to be blank string
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    // 	'change' occurs when the content of a form element, the selection, or the checked state have changed
    //e: a reference to the current event object
    // if the name change, change the value of the username in the local storage
    
    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value)
    })

    // the preventDefault method prevent an action to happen. here it's preventing the submission from happening
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        // defining an obj for the new todo
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // The push() method adds new items to the end of an array.
        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos()
    })

    DisplayTodos()
    
})

function DisplayTodos () {
    const todoList = document.querySelector("#todo-list")
    todoList.innerHTML = "";

    todos.sort().forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if (todo.category == 'personal'){
            span.classList.add("personal");
        }
        else {
            span.classList.add('business')
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add("edit");
        deleteButton.classList.add("delete");

        // $ is used to define names in JS
        // It's ` element `
        content.innerHTML =`<input type="text" value = "${todo.content}" readonly> `;
        edit.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        // indicating that child elements 
        label.appendChild(input);
        label.appendChild(span);
        
        actions.appendChild(edit);
		actions.appendChild(deleteButton);

        todoItem.appendChild(label);
		todoItem.appendChild(content);
        todoItem.appendChild(actions);
        
        todoList.appendChild(todoItem);

        if (todo.done) {
			todoItem.classList.add('done');
        }
        
        input.addEventListener('change', (e) => {
            // when we check the checkbox, the checked value wil equal true, then we set the same value for the .done method
            todo.done = e.target.checked;


            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos()
        })

        edit.addEventListener('click', (e) =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
                
                
                DisplayTodos()

            })
        })

        deleteButton.addEventListener('click', (e) => {
            
            // the filter method will return each todo form the todo list that doesn't equal to current todo
            todos = todos.filter(t => t!= todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            DisplayTodos()
        })
    })


}