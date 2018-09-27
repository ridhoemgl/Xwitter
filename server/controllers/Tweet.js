const Tweet = require('../models/tweet')

module.exports = {
    addTweet : function(req, res) {
        Tweet
            .create({
                userId : req.params.id,
                title: req.body.title
            })
            .then(tweet => {
                res.status(201).json(tweet)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    getAllTweets : function(req, res) {
        Tweet
            .find()
            .populate('userId')
            .then(tweets => {
                res.status(200).json(tweets)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    },
    getUserTweet : function(req, res) {
        Tweet
            .find( {userId : req.params.id} )
            .then(tweet => {
                res.status(200).json(tweet)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}