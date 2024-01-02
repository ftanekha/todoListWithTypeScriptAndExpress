const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {writeFile} = require('node:fs/promises')

const app = express()
const port = process.env.PORT
const db = './todos.json'
//local DB file
let todos = require(db)

app
.use(cors())
.use(express.json())
.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.text())

.get(
    '/',
    (req, res)=>{
        res.status(200).json(todos)
    }
)

.post(
    '/',
    (req, res)=> {
        let todo = req.body
        //req.body produces extra quotes on string e.g. ""some text""
        //remove unwanted quotes
        todo = todo.substring(1, todo.length - 1)
        console.log(todo, todo[0])
        //function for updating DB
        function updateTodos(filename){
            writeFile(filename, JSON.stringify(todos))
            .then(()=> {
                console.info('Todos updated')
                res.status(200).send('New todo added!')
            })
            .catch(err => console.warn(`Error writing to file: ${err.message}!`))
        }
        //add todo to DB file
        //if todos already populated
        if(todos.length >= 1){
            const ids = []
            const names = []
            //seperate todo ids from todo names
            todos.forEach(({id}) => ids.push(id))
            todos.forEach(({name})=> names.push(name))
            //generate random no btw 1 - 10
            function genRandNum(){
                //sets the limit of todos @ 10 max
                const rand = Math.ceil(Math.random() * 10)
                //check id doesn't already exist
                if(ids.includes(rand)) return genRandNum()
                return rand
            }
            //check todo doesn't already exist
            if(names.includes(todo)) res.status(409).json('Todo already exists!')
            //update DB
            todos.push({id: genRandNum(), name: todo})
            updateTodos(process.env.PWD + '/src/todos.json')
        }else{
            //check todos.length !lt 0
            if(todos.length === 0){
                const rand = Math.ceil(Math.random() * 10)
                todos.push({id: rand, name: todo})
                updateTodos(process.env.PWD + '/src/todos.json')
            }
        }
        console.log('./src/todos.json')
    }
)
.listen(
    port,
    'localhost',
    ()=> console.info(`Server listening on port ${port}.`)
)