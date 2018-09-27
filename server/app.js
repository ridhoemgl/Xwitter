require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/Xwitter'
const cors = require('cors')

const user = require('./routes/user')
const tweet = require('./routes/tweet')

mongoose.connect(url, { useNewUrlParser: true }, function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log('Connected to Database')
  }
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/users', user)
app.use('/tweets', tweet)

app.listen(3000, () => console.log('listening on port 3000'))
module.exports = app