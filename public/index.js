"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const create = document.querySelector('#create');
    create.addEventListener('click', (ev) => {
        alert('button clicked');
    });
    const del = document.querySelector('#delete');
    del.addEventListener('click', (ev) => {
        alert('delete button clicked');
    });
});
