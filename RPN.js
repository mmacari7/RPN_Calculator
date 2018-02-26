//Michael Macari, Jon Lafleur, Anthony Rusignuolo
//RPN

var prompt = require("prompt-sync")();

function getInput() {
    var in_Bomdas = /\d+(\.\d+)?|[-+()*/^%]|POW/g; //This regex is used to match all bomdas characters and put them in an array

    var infixExpression = prompt("Enter a simple math expression to be calculated or quit to quit: ");
    var queue = infixExpression.toString().replace(/\s/g, "").match(in_Bomdas);     //Creates array queue with our math

    if (infixExpression === 'quit' || infixExpression === 'q')
        return 'quit';

    while ((queue === null || !checkValidParentheses(queue)) && (infixExpression !== 'quit' || infixExpression !== 'q')) {
        infixExpression = prompt('\nTry Again!\n Enter a simple math expression to be calculated: ');
        queue = infixExpression.toString().replace(/\s/g, "").match(in_Bomdas);
    }

    if (infixExpression === 'quit' || infixExpression === 'q')
        return 'quit';

    return queue;
};

//console.log(getInput());


function checkValidParentheses(queue){
    var parenthesesCount = 0;
    for(i = 0; i < queue.length; i++){
        if(queue[i] == '('){
            parenthesesCount++;
        }
        else if(queue[i] == ')'){
            parenthesesCount--;
        }
    }

    if(parenthesesCount != 0){
        console.log("Mismatching Parentheses.\n");
        return(false);
    }
    else{
        return(true);
    }
}

function isOperand(char){
    //var letters = /^[A-Za-z]+$/;  //Do we want there to be letters in the infix expression?
    var nums = /^[0-9]+$/;
    if(/*char.match(letters) ||*/ char.match(nums)){
        return(true);
    }
    else{
        return(false);
    }
}

function isOperator(op){
    switch(op){
        case '+':
        case '*':
        case '-':
        case '/':
        case '^':
        case '%':
            return(true);
        default:
            return(false);
    }
}

function precedence(op){
    if(op === '+' || op === '-'){
        return(1);
    }
    if(op === '*' || op === '/' || op === '%'){
        return(2);
    }
    if(op === '^'){
        return(3);
    }
    else{
        return(-1);
    }
}


function infixToPostFix(infixQ){
    var postfixQ = [];
    var stack = [];

    for(var i = 0; i < infixQ.length; i++){
        if(isOperand(infixQ[i])) {                      //If value is an operand push to the output
            postfixQ.push(infixQ[i]);
        }
        else if(stack.length === 0) {
            stack.push(infixQ[i]);
        }
        else if(infixQ[i] === '('){                       //If next value is a open parentheses push it to the stack
            stack.push(infixQ[i]);
        }
        else if(infixQ[i] === ')'){
            while(stack.length > 0 && stack[stack.length-1] != '('){    //If its a closing parentheses, and the stack is not empty and it does not have an opening one on top
                postfixQ.push(stack.pop());                               //Push the popped value from stack to the output
            }
            if(stack.length > 0 && stack[stack.length-1] != '('){       //if there is a parentheses at the top of stack still, it must be an invalid expression
                return("Invalid Expression");
            }
            else{                                                       //Pop value from stack
                stack.pop();
            }
        }
        else{
            while(stack.length > 0 && (precedence(infixQ[i]) <= precedence(stack[stack.length-1]))){     //push value from stack to output so long as it has precidence
                postfixQ.push(stack.pop());
            }
            stack.push(infixQ[i]);                   //All else just push to the stack the queue
        }

    }
    while(stack.length > 0){                        //While the stack is still greater than 0, push to the output
        postfixQ.push(stack.pop());
    }
    return(postfixQ);

}

// var postfixSolve = function(postQ)
//     {
//     while (postQ != [])
//         {
//         t = postQ[0];
//         postQ = postQ[1:];
//         if (t is a number token)
//         }
//     }
//
// infixToPostfix(postQ,function() {
//     console.log('solution to inToPost')
// });
//

function outputPostfix(postfixQ) {
    console.log(postfixQ.join(' '));
}

function main() {
    while(true) {
        var infixQ = getInput();
        if (infixQ === 'quit')
            return; // This exits the program
        else
            var postfixQ = infixToPostFix(infixQ);
        outputPostfix(postfixQ);
        //postfixSolve(postfixQ);
    }
}

main();