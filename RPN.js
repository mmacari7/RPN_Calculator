//Michael Macari, Jon Lafleur, Anthony Rusignuolo
//RPN

var prompt = require("prompt-sync")();

var not_In_Bomdas = /[^-\d.()*/%+POW]+/g; //This regex is used to replace all non-bomdas characters in a string to ""
var in_Bomdas = /\d+(\.\d+)?|[-+()*/%]|POW/g; //This regex is used to match all bomdas characters and put them in an array

var infixExpression = prompt("Enter a simple math expression to be calculated: ");
var queue = infixExpression.toString().replace(not_In_Bomdas, "").match(in_Bomdas);

while (queue === null) {
    infixExpression = prompt('\nTry Again\nEnter a simple math expression to be calculated: ');
    queue = infixExpression.toString().replace(not_In_Bomdas, "").match(in_Bomdas);
}
console.log(queue);


var operators = [];
var operands = [];
var topNum, nextNum, answer, t;

var infixToPostfix = function(postQ,callback)
    {

    callback();
    }

var postfixSolve = function(postQ)
    {
    while (postQ != [])
        {
        t = postQ[0];
        postQ = postQ[1:];
        if (t is a number token)
        }
    }

infixToPostfix(postQ,function() {
    console.log('solution to inToPost')
});