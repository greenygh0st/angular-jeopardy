app.controller('MainController', ['$scope', '$http', 'aquestion', function($scope, $http, aquestion) {
  $scope.title = 'JEOPARODY!!!';
  $scope.answer = "";
  $scope.showanswer = false;
  $scope.correct = 0;
  $scope.wrong = 0;
  $scope.winnings = 0
  aquestion.success(function(data) {
    $scope.question = data[0];
  });

  //Trigged by the user hitting the answer question button
  $scope.answerBtn = function () {
    likeness_points = 0;
    possible_points = 0; //not sure if this will be used...this could also be a pain
    your_answer = $scope.answer.toLowerCase().split(" ")
    the_answer = $scope.question.answer.toLowerCase().split(" ")

    //get a total possible points score - not in use yet
    for (i = 0; i < the_answer.length; i++)
    {
      if (your_answer[i] != "the" || your_answer[i] != "an")
      {
        possible_points += 1;
      }
    }

    //get a score to see how alike the two answers are
    for (i = 0; i < your_answer.length; i++)
    {
      if ((your_answer[i] != "the" || your_answer[i] != "an") && $.inArray(your_answer[i], the_answer) != -1)
      {
        likeness_points += 1;
      }
    }

    //so basically if you get one word right I am going to give you credit. :D
    if (likeness_points >= 1) //original code - $scope.answer.toLowerCase() == $scope.question.answer.toLowerCase()
    {
      $scope.answer = "Correct! Your answer was: "+ $scope.answer +" The answer was: " + $scope.question.answer;
      $scope.correct += 1;
      $scope.winnings += $scope.question.value
      $scope.showanswer = true;
    }
    else {
      $scope.answer = "Wrong! Your answer was: " + $scope.answer + " The correct answer was: " + $scope.question.answer;
      $scope.wrong += 1;
      $scope.winnings -= $scope.question.value
      $scope.showanswer = true;
    };
  };

  //gets a new question...should this be a factory?? *Shrug*
  $scope.newQuestion = function (){
    $scope.answer = "";
    $scope.showanswer = false;
    return $http.get('http://jservice.io/api/random')
              .success(function(data) {
                $scope.question = data[0];
              })
              .error(function(err) {
                alert(err);
              });
  };
}]);
