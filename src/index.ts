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
                        if(res.status === 200) alert('new todo added!')
                    }
                ).catch(err => console.warn(`Error: ${err.message}!`))
            }
        )
        del.addEventListener(
            'click',
            ()=> {
                alert('delete button clicked')
            }
        )
    }
)