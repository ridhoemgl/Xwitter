const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    let token = req.headers.token
    let decoded = jwt.verify(token, config.JWT_SECRET);
    
    if(token){
        User.findOne({
            _id : decoded.id
        })
            .then(user => {
                if(user){
                    req.decoded = decoded
                    next()
                }else{
                    res.status(403).json(`Token unknown`)
                }
                
            })
            .catch(err => {
                res.status(500).json(`Internal server error`)
            })
    }else{
        res.status(401).json( `You don't have access to this`)
    }
}