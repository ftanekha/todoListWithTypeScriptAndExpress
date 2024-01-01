const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.PORT

const app = express()

app
.use(cors())
.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.text())


.post(
    '/',
    (req, res)=> {
        console.log(req.body)
        res.status(200).send()
    }
)
.listen(
    port,
    'localhost',
    ()=> console.info(`Server listening on port ${port}.`)
)