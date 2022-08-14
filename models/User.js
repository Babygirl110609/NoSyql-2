const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim:true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match:['/.+@.\.com','Enter valid email']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'thoughts'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
},{
  toJSON:{
    virtuals:true
  },
  id:false
});
UserSchema.virtual('Thoughtcount').get(function(){
  return this.thoughts.length
})
UserSchema.virtual('Friendscount').get(function(){
  return this.friends.length
})
const User = model('User', UserSchema);

module.exports = User;
