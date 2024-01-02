document.addEventListener(
    'DOMContentLoaded',
    ()=> {
        const URI: string = 'http://localhost:3000'

        const todo: HTMLInputElement = document.querySelector('#todo')!       
        const create: HTMLButtonElement = document.querySelector('#create')!
        const del: HTMLButtonElement = document.querySelector('#delete')!

        create.addEventListener(
            'click',
            ()=> {
                fetch(
                    URI,
                    {
                        method: 'POST',
                        body: JSON.stringify(todo.value)
                    }
                ).then(
                    res => {
                        if(res.status === 200) return alert('new todo added!')
                        alert(`Error: ${res.statusText}!`)
                    }
                ).catch(err => alert(`Error: ${err.message}!`))
            }
        )
        //display current list of todos
        fetch(URI)
        .then(res => res.json())
        .then((todos: [])=> {
            const display: HTMLElement = document.querySelector('#display')!
            const ul = document.createElement('ul')
            todos.forEach(
                (todo: {id: number, name: string}) => {
                    const li = document.createElement('li')
                    li.className += 'todo'
                    //add delete button
                    const btn:HTMLButtonElement = document.createElement('button')
                    btn.innerText = 'delete'
                    btn.className += 'delete'
                    
                    li.append(btn)
                    //append todo text
                    const textNode: HTMLElement | any = document.createTextNode(todo.name)
                    textNode.className += 'textnode'
                    //implement todo delete functionality
                    btn.addEventListener(
                        'click',
                        ()=> {
                            fetch(
                                URI,
                                {
                                    method: 'DELETE',
                                    body: JSON.stringify(todo.id)
                                }
                            ).then(
                                res => {
                                    if(res.status === 200) return alert('Todo deleted!')
                                    alert(`Error: ${res.statusText}!`)
                                }
                            ).catch(err => alert(`Error: ${err.message}!`))
                        }
                    )

                    li.append(textNode)                
                    ul.append(li)
                }
            )
            display.append(ul)
        })
    }
)