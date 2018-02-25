//Michael Macari, Jon Lafleur, Anthony Rusignuolo
//RPN

var prompt = require("prompt-sync")();

var not_In_Bomdas = /[^-\d.()*/%+POW]+/g; //This regex is used to replace all non-bomdas characters in a string to ""
var in_Bomdas = /\d+(\.\d+)?|[-+()*/%]|POW/g; //This regex is used to match all bomdas characters and put them in an array

var infixExpression = prompt("Enter a simple math expression to be calculated: ");
var queue = infixExpression.toString().replace(not_In_Bomdas, "").match(in_Bomdas);     //Creates array queue with our math

while ((queue === null || !checkValidParentheses(queue)) && infixExpression != 'quit') {
    infixExpression = prompt('Try Again Enter a simple math expression to be calculated: ');
    queue = infixExpression.toString().replace(not_In_Bomdas, "").match(in_Bomdas);
}


console.log(queue);


function checkValidParentheses(queue){
    var countLeft = 0;
    var countRight = 0;
    for(i = 0; i < queue.length; i++){
        if(queue[i] == '('){
            countLeft++;
        }
        if(queue[i] == ')'){
            countRight++;
        }
    }

    if(countLeft != countRight){
        console.log("Mismatching Parentheses. ");
        return(false);
    }
    else{
        return(true);
    }
}

function isOperand(char){
    var letters = /^[A-Za-z]+$/;
    var nums = /^[0-9]+$/;
    if(char.match(letters) || char.match(nums)){
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
            return(true);
        default:
            return(false);
    }
}

function precedence(op){
    if(op == '+' || op == '-'){
        return(1);
    }
    if(op == '*' || op == '/'){
        return(2);
    }
    if(op == '^'){
        return(3);
    }
    else{
        return(-1);
    }
}


function infixToPostFix(queue){
    var output = [];
    var stack = [];

    for(i = 0; i < queue.length; i++){
        if(isOperand(queue[i])) {                      //If value is an operand push to the output
            output.push(queue[i]);
        }
        else if(queue[i] === '('){                       //If next value is a open parentheses push it to the stack
            stack.push(queue[i]);
        }
        else if(queue[i] === ')'){
            while(stack.length > 0 && stack[stack.length-1] != '('){    //If its a closing parentheses, and the stack is not empty and it does not have an opening one on top
                output.push(stack.pop());                               //Push the popped value from stack to the output
            }
            if(stack.length > 0 && stack[stack.length-1] != '('){       //if there is a parentheses at the top of stack still, it must be an invalid expression
                return("Invalid Expression");
            }
            else{                                                       //Pop value from stack
                stack.pop();
            }
        }
        else{
            while(stack.length > 0 && (precedence(queue[i]) <= precedence(stack[stack.length-1]))){     //push value from stack to output so long as it has precidence
                output.push(stack.pop());
            }
            stack.push(queue[i]);                   //All else just push to the stack the queue
        }

    }
    while(stack.length > 0){                        //While the stack is still greater than 0, push to the output
        output.push(stack.pop());
    }
    return(output);

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

