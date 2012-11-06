function QuizCtrl($scope) {
  $scope.questions = [];
  $scope.question_types = {add: true, sub: true, mul: true, div: true};
  $scope.scored = false;

  populate();

  $scope.btnClass = function(v) {
      return v ? "btn-primary" : "";
  }

  $scope.toggle = function(v) {
      $scope.add = !$scope.add;
  }

  $scope.test_click = function(e) {
      e = !e;
  }

  $scope.score = function(e) {
      var questions = $scope.questions;
      for (i = 0; i < questions.length; i++) {
          q = questions[i];
          if (q.user_answer != '' && q.correct_answer == q.user_answer)
              q.correct = true;
      }
      $scope.scored = true;
  }

  $scope.paneClass = function(question) {
      if (!$scope.scored) 
          return "";
      else if (question.correct)
          return "correct";
      else
          return "wrong";
  }

  $scope.reset = function() {
      $scope.scored = false;
      $scope.questions = [];
      populate();
  }

  $scope.correctAnswers = function() {
      var q = $scope.questions;
      var sum = 0;
      for (i = 0; i < q.length; i++) 
          if (q[i].correct)
              sum++;
      return sum;
  }

  $scope.wrongAnswers = function() {
      return $scope.questions.length - $scope.correctAnswers();
  }

  function randomInt(from, to) {
      return Math.floor(Math.random() * (to - from + 1)) + from
  }

  function randomChoice(xs) {
    if (xs.length == 0)
        return null;
    else
        return xs[randomInt(0, xs.length - 1)];
  }

  function populate(){
    var operations = [];
    var qt = $scope.question_types;
    if (qt.add) 
        operations.push("+");
    if (qt.sub)
        operations.push("-");
    if (qt.mul)
        operations.push("*");
    if (qt.div) 
        operations.push("/");

    if (operations.length == 0)
        return;

    for (var i=0; i<12; i++) { 
        var questionText = null;
        var answer = null;
        op = randomChoice(operations);
        if (op == "+"){
            x = randomInt(0, 50);
            y = randomInt(0, 50);
            questionText = x + " + " + y;
            answer = x + y;
        } 
        else if (op == "-") {
            x = randomInt(20, 40);
            y = randomInt(0, x);
            questionText = x + " - " + y;
            answer = x - y;
        }
        else if (op == "*") {
            x = randomInt(0, 12);
            y = randomInt(0, 12);
            questionText = x + " * " + y;
            answer = x * y;
        }
        else if (op == "/") {
            x = randomInt(1, 12);
            y = randomInt(0, 12);
            questionText = y * x + " / " + x;
            answer = y;
        }
        answer = Math.round(answer);

        $scope.questions.push({text:questionText, correct_answer:answer, user_answer: '', correct: false});
    }
  }



}

angular.module('mathApp', [])
  .directive('mathCheckbox', function() {
      /// class contains "active" if the button is checked
      function isChecked(classAttr) {
        if (!classAttr)
            return false;
        return classAttr.split(" ").indexOf("active") != -1;
      };

      return {
        restrict: "A",
        // scope: {field: '='},
        replace: true,
        link: function(scope, element, attrs) {
            var field = attrs['mathCheckbox'];
            var classAttr = attrs['class'];
            // if (scope[field]) 
            //    element.setAttribute("class")(element.getAttribute("class") + " active");
            //scope[field] = isChecked(classAttr); // check the "class" attribute for the value "active"
            element.bind('click', function() {
                var v = scope[field];
                scope.$apply(function() {scope[field] = !scope[field]});
            })
        }
    };
});
