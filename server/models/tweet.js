const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
}, {
  timestamps: true
});

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet