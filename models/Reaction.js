const { Schema, model ,Types} = require('mongoose');

const ReactionSchema = new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
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
});


module.exports = ReactionSchema
