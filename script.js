const display = document.querySelector(".display"); 
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelectorAll(".clear");

let a = null;
let b = null;
let operator = null;

digitButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.textContent;
        if(operator === null){
            if(a === null){
                a = value;
            }else{
                a += value;
            }
            display.textContent = a;
        } else{
            if(b === null){
                b = value;
            } else{
                b += value;
            }
            display.textContent = b;
        }
        
    });
});


function operate(operator, a, b){
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return division(a, b);
        default:
            return "Enter a valid operator";
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function division(a, b){
    if(b === 0) return "You can't divide by zero!";
    return a / b;
}
