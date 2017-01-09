app.controller('sessionController', function($scope, sessionFactory, $location){
  sessionFactory.checkSess(function(data){
      $scope.session_user=data.name;
  })
  $scope.logReg = function(){
    if(!$scope.newUser || $scope.newUser.name.length<3){
      $scope.error="Something went login wrong";
    }
    else{
    sessionFactory.logReg($scope.newUser, function(data){
      if(data.errors){
        $scope.error=data.errors.name.message;
      }
      if(data.status == true){
        $location.url('/dashboard')
      }
    });
  }
}
  $scope.message = function(){
    sessionFactory.addMessage($scope.newMessage, function(data){
      $scope.newMessage={};
      $scope.messages=data;
    })
    $location.url('/dashboard')

  }
  sessionFactory.index(function(data){
    $scope.messages = data
  })
  $scope.comment = function(id, newComment){
    sessionFactory.addComment(id, newComment, function(data){
      $scope.messages=data;
    })
  }
})
