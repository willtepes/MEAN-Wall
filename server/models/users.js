var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be blank."]
  },
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
},{timestamps: true});


mongoose.model('User', UserSchema);




var MessageSchema = new mongoose.Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],

},{timestamps: true});

var CommentSchema = new mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _message: {type: Schema.Types.ObjectId, ref: 'Message'},
  text: {type: String, required: true },


},{timestamps: true});


mongoose.model('Comment', CommentSchema);
mongoose.model('Message', MessageSchema);
