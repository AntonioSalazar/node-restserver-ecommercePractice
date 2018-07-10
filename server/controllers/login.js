const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({email: body.email}, (err, DBUser) =>{
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if( !DBUser){
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(User) or password is incorrect'
                }
            })
        }

        if( !bcrypt.compareSync(body.password, DBUser.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or (password) is incorrect'
                }
            })
        }

        let token = jwt.sign({
            user: DBUser
        }, 'this-is-the-development-seed', { expiresIn: process.env.EXP_TOKEN})

        res.json({
            ok: true,
            user: DBUser,
            token
        })
    })
    

})

module.exports = app;
