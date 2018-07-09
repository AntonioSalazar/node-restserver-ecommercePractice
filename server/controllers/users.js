const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('underscore')

const app = express()



app.get('/users', function (req, res) {

    let since = req.query.since || 0;
    since = Number(since)

    let limit = req.query.limit || 5;
    limit = Number(limit);
    
    User.find({ status: true }, 'nombre email role status google img')
            .skip(since)
            .limit(limit)
            .exec( (err, users) =>{
                if (err){
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

            User.count({status: true}, (err, count) =>{
                res.json({
                    ok: true,
                    users,
                    howMany: count
                })
            })    
                
            })
})


  
app.post('/user', function (req, res) {
    let body = req.body

   let user = new User({
       name: body.name,
       email: body.email,
       password: bcrypt.hashSync(body.password, 10),
       role: body.role
   })

   user.save( ( err, DBUser ) =>{
       if( err ){
           return res.status(400).json({
               ok: false,
               err
           })

           res.json({
               ok: true,
               user: DBUser
           })
       }
   })
        
})
  
app.put('/user/:id', function (req, res) {
      
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'role', 'img', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, DBUser) =>{

        if ( err ){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: DBUser
        })
    })
  
    
})


/// Deleting a user from DB 

app.delete('/user/:id', function (req, res) {
   
    let id = req.params.id;
    let changeStatus = {
        status: false
    }

    // User.findByIdAndRemove(id, (err, deletedUser) =>{
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, deletedUser) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if( deletedUser === null ){
            return res.status(400).json({
                ok: true,
                err: {
                    message: 'User not found'
                }
            })
        }

        res.json({
            ok: true,
            user: deletedUser
        })
    })

})



   

module.exports = app;