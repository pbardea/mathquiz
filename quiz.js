function QuizCtrl($scope) {
  $scope.questions = [];
  $scope.questionCount = 10;
  // $scope.question_types = {add: true, sub: true, mul: true, div: true, conv: false};
  $scope.question_types = {add: true, sub: false, mul: false, div: false, conv: false, wordProb: false, findFactor: false};
  $scope.scored = true;

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
          for (k = 0; k < q.correct_answer.length; k++){
            ans = q.correct_answer[k];
            if (q.user_answer == ans && q.user_answer != ''){
                q.correct = true;
            }
          }
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

  function randomProp(obj) {
      var props = [];
      for (var prop in obj)
          props.push(prop);
      return randomChoice(props);
  }

  var conversions = [
      {'mililiters': -3, 'centiliters': -2, 'deciliters': -1, 'liters': 0},
      {'miligrams': -3, 'centigrams': -2, 'decigrams': -1, 'grams': 0, 'kilograms': 3, 'tons': 6},
      {'mm': -3, 'cm': -2, 'decimeters': -1, 'm': 0, 'decameters': 1, 'hectometers': 2, 'km': 3},
      {'thousands': -3, 'hundreads': -2, 'tens': -1, 'ones': 0, 'tens': 1, 'hundreads': 2, 'thousands': 3, 'millions': 6, 'billions': 9},
      {'bytes': 0, 'kilobytes': 3, 'megabytes': 6, 'gigabytes': 9}
  ];


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
    if (qt.conv)
        operations.push("conv");
    if (qt.findFactor)
        operations.push("findFactor");
    if (qt.wordProb) {
        operations.push("wordProbAdd");
        operations.push("wordProbSub");
        operations.push("wordProbMult");
        operations.push("wordProbDiv");
    }

    if (operations.length == 0)
        return;

    for (var i = 0; i < $scope.questionCount; i++) { 
        var questionText = null;
        var answer = null;
        op = randomChoice(operations);
        if (op == "+"){
            var x = randomInt(0, 50);
            var y = randomInt(0, 50);
            questionText = x + " + " + y;
            answer = [Math.round(x + y)];
        } 
        else if (op == "-") {
            var x = randomInt(20, 40);
            var y = randomInt(0, x);
            questionText = x + " - " + y;
            answer = [Math.round(x - y)];
        }
        else if (op == "*") {
            var x = randomInt(0, 12);
            var y = randomInt(1, 12);
            questionText = x + " * " + y;
            answer = [Math.round(x * y)];
        }
        else if (op == "/") {
            var x = randomInt(1, 12);
            var y = randomInt(0, 12);
            questionText = y * x + " / " + x;
            answer = [Math.round(y)];
        }
        else if (op == "conv") {
            var x = randomInt(1, 10000);
            var conversion = randomChoice(conversions);
            var p1 = randomProp(conversion);
            do{
                var p2 = randomProp(conversion);
            }while(p1 == p2);
            var cp1 = conversion[p1];
            var cp2 = conversion[p2];
            var convRate = Math.pow(10, cp1 - cp2);
            questionText = x + " " + p1 + " in " + p2;
            answer = x * convRate;
            // Avoid floating point mishaps. Only keep the right number of decimals.
            if (cp1 < cp2) 
                answer = [answer.toFixed(cp2 - cp1)];
        }
        else if (op == "wordProbAdd") {
            var x = randomInt(0,100);
            var y = randomInt(1,100);
            var nameIndex1 = randomInt(0,10);
            do{
                var nameIndex2 = randomInt(0,10);
            }while (nameIndex2 == nameIndex1)
            var names = ["John","Paul","Michael","Joseph","Manuel","Sandra","Alexander","Mario","Tom","Jack","Jill"];
            questionText = names[nameIndex1] + " has " + x + " apples and " + names[nameIndex2] + " has " + y + " apples. How many do they have together?";
            answer = [x+y];
        }
        else if (op == "wordProbSub") {
            var x = randomInt(0,100);
            var y = randomInt(1,100);
            var nameIndex1 = randomInt(0,10);
            do{
                var nameIndex2 = randomInt(0,10);
            }while (nameIndex2 == nameIndex1)
            var names = ["John","Paul","Michael","Joseph","Manuel","Sandra","Alexander","Mario","Tom","Jack","Jill"];
            if (x > y){
                questionText = names[nameIndex1] + " has " + x + " apples and " + names[nameIndex2] + " has " + y + " apples. How many more apples does " + names[nameIndex1] + " have than " + names[nameIndex2] + "?";
                answer = [x-y];
            }else{
                questionText = names[nameIndex1] + " has " + x + " apples and " + names[nameIndex2] + " has " + y + " apples. How many more apples does " + names[nameIndex2] + " have than " + names[nameIndex1] + "?";
                answer = [y-x];
            }
        }
        else if (op == "wordProbMult"){
            var baskets = randomInt(1,12);
            var apples = randomInt(1,12);
            var nameIndex1 = randomInt(0,10);
            var names = ["John","Paul","Michael","Joseph","Manuel","Sandra","Alexander","Mario","Tom","Jack","Jill"];
            questionText = names[nameIndex1] + " has " + baskets + " baskets of apples. Each baseket has " + apples + " apples inside. How many apples does " + names[nameIndex1] + " have?";
            answer = [baskets*apples];
        }
        else if (op == "wordProbDiv"){
            var nameIndex1 = randomInt(0,10);
            var names = ["John","Paul","Michael","Joseph","Manuel","Sandra","Alexander","Mario","Tom","Jack","Jill"];

            var baskets = randomInt(1,12);
            var applesInEachBasket = randomInt(0,12);
            questionText = applesInEachBasket * baskets + " / " + baskets;
            questionText = names[nameIndex1] + " has " + baskets + " baskets of apples. In total " + names[nameIndex1] + " has " + applesInEachBasket * baskets + " apples. How many apples are there in each basket?";
            answer = [Math.round(applesInEachBasket)];
        }
        else if (op == "findFactor"){
            var factor = randomInt(1,12);
            var lowLim = (factor*randomInt(1,5))+1;
            var upLim = (factor*randomInt(6,12))-1;
            var answer = [];
            for (f = 0; f < (upLim - lowLim); f++){
                if (((f+lowLim)%factor) == 0){
                    answer.push(f+lowLim);
                }
            }
            questionText = "Find a number divisible by "+factor+" and is between "+lowLim+" and "+" "+upLim+".";
        }

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
