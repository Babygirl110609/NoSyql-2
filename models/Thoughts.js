const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction")

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    minlength:1,
    maxlength: 200,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reactions:[reactionSchema]

},{
  toJSON:{
    virtuals:true
  },
  id:false
});
ThoughtSchema.virtual('Reactioncount').get(function(){
  return this.reactions.length
})
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
