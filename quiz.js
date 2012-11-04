function QuizCtrl($scope) {
  $scope.questions = [];

  populate();
 
  function populate(){
    for (var i=0;i<11;i++)
    { 
        var num1 = Math.floor(Math.random()*101)
        var num2 = Math.floor(Math.random()*101)
        var myOperands=["/","x","+","-"];
        var operandIndex = Math.floor(Math.random()*4)
        var operand = myOperands[operandIndex]

        var questionText = num1 + " "+ operand + " "+num2;
        
        operations = [
            {ad: function(x, y) {return x + y}},
            {sub: function(x, y) {return x - y}},
            {div: function(x, y) {return x / y}},
            {mul: function(x, y) {return x * y}}
            ];

        o = operations[0];
        var ans = o.ad(2, 3);

        var answer = 0
        if (operandIndex == 0){
            answer = num1/num2
        }else if(operandIndex == 1){
            answer = num1*num2
        }else if(operandIndex == 2){
            answer = num1+num2
        }else{
            answer = num1-num2
        }

        $scope.questions.push({text:questionText, answer:answer});
    }
  }
}
