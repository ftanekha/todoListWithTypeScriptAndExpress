"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const URI = 'http://localhost:3000';
    const todo = document.querySelector('#todo');
    const create = document.querySelector('#create');
    create.addEventListener('click', () => {
        fetch(URI, {
            method: 'POST',
            body: JSON.stringify(todo.value)
        }).then((res) => {
            if (res.status === 200)
                return alert('new todo added!');
            alert(`Error: ${res.statusText}!`);
        }).catch(err => alert(`Error: ${err.message}!`));
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
            //add delete button
            const btn = document.createElement('button');
            btn.innerText = 'delete';
            btn.className += 'delete';
            li.append(btn);
            //append todo text
            const textNode = document.createTextNode(todo.name);
            textNode.className += 'textnode';
            //implement todo delete functionality
            btn.addEventListener('click', () => {
                fetch(URI, {
                    method: 'DELETE',
                    body: JSON.stringify(todo.id)
                }).then(res => {
                    if (res.status === 200)
                        return alert('Todo deleted!');
                    alert(`Error: ${res.statusText}!`);
                }).catch(err => alert(`Error: ${err.message}!`));
            });
            li.append(textNode);
            ul.append(li);
        });
        display.append(ul);
    });
});
