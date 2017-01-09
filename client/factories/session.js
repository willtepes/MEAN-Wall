app.factory('sessionFactory', function($http, $location){
  var factory = {};

  factory.checkSess = function(cb){
    $http.get('/user/checksess').success(function(data){
      if(!data){
        $location.url('/logreg')
      }
      else{
        cb(data);
      }
    })
  }
  factory.logReg = function(user,cb){
    $http.post('/user/login', user).success(function(data){
      cb(data);
    })
  }
  factory.addMessage = function(message, cb){
    $http.post('/message/add', message).success(function(data){
      factory.index(cb);
    })

  }
  factory.messages = [];
  factory.index = function(cb){
    $http.get('/messages/all').success(function(output){
      factory.messages = output;
      console.log(output, 'i am output');
      cb(output);
    })
  }
  factory.addComment = function(id, newComment, cb){
    var data = {message_id: id, comment: newComment};
    $http.post('/comment/add', data).success(function(data){
      factory.index(cb);
    })
  }
  return factory
})
