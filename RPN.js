//Michael Macari, Jon Lafluer, Anthony Rusignuolo
//RPN

var prompt = require("prompt-sync")();

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