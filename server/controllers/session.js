var mongoose = require('mongoose');
var User = mongoose.model('User');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
module.exports = (function(){
  return{
    logReg: function(req, res){
      User.findOne({name: req.body.name}, function(err, user){
        if(!user){
          var user = new User(req.body);
          user.save(function(err, user){
            if(err){
              res.json(err);
            }
            else{req.session.user = user;
            req.session.save();
            res.json({status: true, user: user})
          }
          })
        }else{
          req.session.user = user;
          req.session.save();
          res.json({status: true, user:user})
        }
      })
    },
      logout: function(req, res){
        req.session.destroy();
        res.redirect('/')
      },
      checkSess: function(req, res){
			if(req.session.user){
				res.json(req.session.user)
			}else{
				res.send(null)
			}
		},
    addMessage: function(req, res){
      var message = new Message({_user: req.session.user._id, content: req.body.content})
      message.save(function(err, message){
				res.json(message)
      });
    },
    allMessages: function(req,res){
      Message.find({}).populate('_user').populate('comments').exec(function(err,data){
       Message.populate(data, {path:'comments._user', model:'User'}, function(err, results){
          console.log(results);

          res.json(data)
          })
        })
    },
    addComment: function(req,res){
        var comment = new Comment({_user: req.session.user._id, _message: req.body.message_id, text: req.body.comment.text});
        // Message.update({_id: req.body.message_id}, {$push: {"comments": comment}});
        Message.findOne({_id: req.body.message_id}, function(err, message){
          message.comments.push(comment._id);
          message.save();
        })
        comment.save();
        res.json({status: true});

    }
  }
})();
