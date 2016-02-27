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

  $scope.answerBtn = function () {
    if ($scope.answer.toLowerCase() == $scope.question.answer.toLowerCase())
    {
      $scope.answer = "Correct! The answer was: " + $scope.question.answer;
      $scope.correct += 1;
      $scope.winnings += $scope.question.value
      $scope.showanswer = true;
    }
    else {
      $scope.answer = "Wrong! Your answer was: \""+ $scope.answer +"\" The correct answer was: " + $scope.question.answer;
      $scope.wrong += 1;
      $scope.winnings -= $scope.question.value
      $scope.showanswer = true;
    };
  };

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
