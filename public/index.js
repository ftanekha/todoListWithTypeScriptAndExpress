"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const URI = 'http://localhost:3000';
    const todo = document.querySelector('#todo');
    const create = document.querySelector('#create');
    const del = document.querySelector('#delete');
    create.addEventListener('click', () => {
        fetch(URI, {
            method: 'POST',
            body: JSON.stringify(todo.value)
        }).then(res => {
            if (res.status === 200)
                return alert('new todo added!');
            alert(`Error: ${res.statusText}!`);
        }).catch(err => console.warn(`Error: ${err.message}!`));
    });
    del.addEventListener('click', () => {
        alert('delete button clicked');
    });
    //display current list of todos
    fetch(URI)
        .then(res => res.json())
        .then((todos) => {
        const display = document.querySelector('#display');
        const ul = document.createElement('ul');
        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.className += 'todo';
            li.innerText = todo.name;
            ul.append(li);
        });
        display.append(ul);
    });
});
