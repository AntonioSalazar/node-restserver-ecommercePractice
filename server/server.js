require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


 
app.get('/users', function (req, res) {
  res.json('Get Users!')
})

app.post('/user', function (req, res) {
    let body = req.body

    if(body.name === undefined){
        res.status(400).json({
            ok: false,
            mensaje: "Name is needed"
        })
    } else{
        res.json({
            body
        })
    }

    
})

app.put('/user/:id', function (req, res) {
    
    let id = req.params.id;

    res.json({
        id
    })
})

app.delete('/user', function (req, res) {
    res.json('Delete User')
})


 
app.listen(process.env.PORT, ()=>{
    console.log('Running on port: ', process.env.PORT)
})