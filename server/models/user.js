const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'e-mail format wrong']
  },
  password: {
      type: String,
      required: [true, 'password is required']
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  follows: [],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema)

module.exports = User