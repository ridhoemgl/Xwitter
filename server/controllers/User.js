const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { decryptPassword, becryptPassword } = require('../helpers/helper')
const config = require('../config')

module.exports = {
    signup : function(req, res) {
        User
            .create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: decryptPassword(req.body.password)
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    signin : function(req, res) {
        let useremail = req.body.email
        let isEmail = false
        for(let i = 0 ; i < useremail.length ; i++){
            if(useremail[i] == '@'){
                isEmail = true
            }
        }
        if(isEmail){
            User
                .findOne({
                    email : req.body.email
                })
                .then(user => {
                    if(user){
                        if(becryptPassword(user.password, req.body.password)){
                            let token = jwt.sign({
                                id : user._id
                            }, config.JWT_SECRET)
                            res.status(200).json(token)
                        }else{
                            res.status(404).json('password wrong')    
                        }
                    }else{
                        res.status(404).json('username / email wrong')
                    }
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })
        }else{
            User
                .findOne({
                    username : req.body.email
                })
                .then(user => {
                    if(user){
                        if(becryptPassword(user.password, req.body.password)){
                            let token = jwt.sign({
                                id : user._id
                            }, config.JWT_SECRET)
                            res.status(200).json(token)
                        }else{
                            res.status(404).json({
                                msg: 'password wrong'
                            })    
                        }
                    }else{
                        res.status(404).json({
                            msg: 'username / email wrong'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json(err.message)
                })       
        }
    },
    getUserProfile : function(req, res) {
        User
            .findOne( { _id : req.decoded.id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })

    },
    getUserToFollow : function(req, res) {
        User
            .find({
                _id: {
                    $ne: req.params.id
                }
            })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

}