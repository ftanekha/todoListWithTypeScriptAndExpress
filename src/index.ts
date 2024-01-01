document.addEventListener(
    'DOMContentLoaded',
    ()=> {
        const create = document.querySelector('#create')!
        create.addEventListener(
            'click',
            (ev: Event)=> {
                alert('button clicked')
            }
        )
        const del = document.querySelector('#delete')!
        del.addEventListener(
            'click',
            (ev: Event)=> {
                alert('delete button clicked')
            }
        )
    }
)