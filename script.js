const display = document.querySelector(".display"); 
let digitButtons = document.querySelectorAll(".digit");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const backspace = document.querySelector(".backspace");

let a = null;
let b = null;
let operator = null;
let isResultDisplayed = false;

digitButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.textContent;

        if(isResultDisplayed){      
            a = value;
            display.textContent = a;
            isResultDisplayed = false;
            return;
        }

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

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.textContent;

        if(value !== "="){
            if(a !== null && b !== null && operator !== null){
                a = parseFloat(a);
                b = parseFloat(b);
                let result = operate(operator, a, b);
                if(result ===  "You can't divide by zero!"){
                    display.textContent = result;
                    a = null;
                    b = null; 
                    operator = null;
                    return;
                } else{
                    result = Math.round(result * 10000) / 10000
                    display.textContent = result;
                    a = result;
                    b = null; 
                    operator = null;
                }
            }
            operator = value;
            isResultDisplayed = false;
        } else{
            if(a === null || b === null || operator === null){
                return;
            }

            a = parseFloat(a);
            b = parseFloat(b);
            let result = operate(operator, a, b);
            if(result ===  "You can't divide by zero!"){
                display.textContent = result;
                a = null;
                b = null; 
                operator = null;
            } else{
                result = Math.round(result * 10000) / 10000
                display.textContent = result;
                a = result;
                b = null; 
                operator = null;
                isResultDisplayed = true;
            }
        }
    });
});

clearButton.addEventListener("click", () => {
    a = null;
    b = null;
    operator = null;
    display.textContent = "0";
})

decimal.addEventListener("click", () =>{
    if(isResultDisplayed){
        a = "0.";
        display.textContent = a;
        isResultDisplayed = false;
        return;
    }

    if(operator === null){
        if(a === null){
            a = "0.";
        } else if(a.includes(".")){
            return;
        } else{
            a += ".";
        }
        display.textContent = a;
    } else{
        if(b === null){
            b = "0.";
        } else if(b.includes(".")){
            return;
        } else{
            b += ".";
        }
        display.textContent = b;
    }
})

backspace.addEventListener("click", () => {
    if(isResultDisplayed) return;

    if(operator === null){
        if(a !== null){
            a = a.slice(0, -1);

            if(a === ""){
                a = null;
                display.textContent = "0";
            } else{
                display.textContent = a;
            }
        }
    } else{
        if(b !== null){
            b = b.slice(0, -1);

            if(b === ""){
                b = null;
                display.textContent = "0";
            } else{
                display.textContent = b;
            }
        }
    }
})


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
    if(b === 0) {
        return "You can't divide by zero!";
    }
    return a / b;
}
