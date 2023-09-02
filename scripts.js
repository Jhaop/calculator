const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
const h2 = document.getElementById('display');
const reset = document.getElementById('reset');
const signChanger = document.getElementById('sign-changer');
const dot = document.getElementById('dot');
const backspace = document.getElementById('backspace');

let firstOperand;
let secondOperand;
let oldOperator;
let newOperator;
let result;
let lastInput;

window.addEventListener('keydown', (e) => {
    if(!(e.key).search(/[+\-*/]/)) { // Operator
        newOperator = e.key;
        if (lastInput === 'number') {
            if( !emptyOperand(firstOperand) ) { 
                secondOperand = parseFloat(h2.textContent);
                result = operate(firstOperand, secondOperand, oldOperator);
                h2.textContent = result;
                firstOperand = undefined;
                secondOperand = undefined;
            } else if ( !emptyOperand(result) ) {  
                firstOperand = result;
                secondOperand = parseFloat(h2.textContent);
                result = operate(firstOperand, secondOperand, oldOperator);
                h2.textContent = result;
                firstOperand = undefined;
                secondOperand = undefined;
            } else { 
                firstOperand = parseFloat(h2.textContent);
            } 
        } else if ( lastInput === 'equal') {
            firstOperand = result;
        }   

        oldOperator = newOperator;
        lastInput = 'operator';
    } else if(!(e.key).search(/[0-9]/)) { // Number
        if(lastInput === undefined || lastInput === 'number') 
            h2.textContent += e.key;
        else {          
            if(lastInput === 'equal') {
                firstOperand = undefined;
                secondOperand = undefined;
                oldOperator = undefined;
                newOperator = undefined;
                result = undefined;
                lastInput = undefined;
                              
            }
            h2.textContent = e.key; 
        }
        lastInput = 'number';
    } else if(e.key === '.') {
        let display = h2.textContent;
        if( lastInput === 'number' ) {
            if(!display.includes('.')) {
                h2.textContent += '.';
            }
        }
    } else if(e.key === 'Enter') {
        if ( emptyOperand( firstOperand ) ) {
            firstOperand = result;
            secondOperand = parseFloat(h2.textContent);
            result = operate(firstOperand, secondOperand, oldOperator);
            firstOperand = undefined;
            secondOperand = undefined;
            h2.textContent = result;
        }
        else if( emptyOperand( secondOperand ) ) {
            secondOperand = parseFloat(h2.textContent);
            result = operate(firstOperand, secondOperand, oldOperator);
            firstOperand = undefined;
            secondOperand = undefined;
            h2.textContent = result;
        }  
        lastInput = 'equal';
    } else if(e.key === 'Backspace') {
        if(lastInput === 'number') {
            h2.textContent = h2.textContent.slice(0, h2.textContent.length-1);
        }
    }
});

signChanger.addEventListener('click', () => {
    let displayValue = h2.textContent;
    if(!emptyOperand(displayValue)) {
        if (parseInt(displayValue) > 0) {
            displayValue = '-' + displayValue;
            h2.textContent = displayValue;
        }
        else {
            displayValue = displayValue.slice(1);
            h2.textContent = displayValue;
        }
            
    } 
});

reset.addEventListener('click', () => {
    firstOperand = undefined;
    secondOperand = undefined;
    oldOperator = undefined;
    newOperator = undefined;
    result = undefined;
    lastInput = undefined;
    h2.textContent = undefined;
});

backspace.addEventListener('click', () => {
    if(lastInput === 'number') {
        h2.textContent = h2.textContent.slice(0, h2.textContent.length-1);
    }
});

dot.addEventListener('click', () => {
    let display = h2.textContent;
    if( lastInput === 'number' ) {
        if(!display.includes('.')) {
            h2.textContent += '.';
        }
    }
});

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(lastInput === undefined || lastInput === 'number') 
            h2.textContent += number.textContent;
        else {          
            if(lastInput === 'equal') {
                firstOperand = undefined;
                secondOperand = undefined;
                oldOperator = undefined;
                newOperator = undefined;
                result = undefined;
                lastInput = undefined;
                              
            }
            h2.textContent = number.textContent; 
        }
        lastInput = 'number';
    });
});



operators.forEach(oper => {
    oper.addEventListener('click', () =>{
        newOperator = oper.textContent;
        if (lastInput === 'number') {
            if( !emptyOperand(firstOperand) ) { 
                secondOperand = parseFloat(h2.textContent);
                result = operate(firstOperand, secondOperand, oldOperator);
                h2.textContent = result;
                firstOperand = undefined;
                secondOperand = undefined;
            } else if ( !emptyOperand(result) ) {  
                firstOperand = result;
                secondOperand = parseFloat(h2.textContent);
                result = operate(firstOperand, secondOperand, oldOperator);
                h2.textContent = result;
                firstOperand = undefined;
                secondOperand = undefined;
            } else { 
                firstOperand = parseFloat(h2.textContent);
            } 
        } else if ( lastInput === 'equal') {
            firstOperand = result;
        }   

        oldOperator = newOperator;
        lastInput = 'operator';
    });    
});

function initialSetup() {
    firstOperand = undefined;
    secondOperand = undefined;
}

function emptyOperand (operand) {
    if(operand === undefined)
        return true;
    return false;
}

equal.addEventListener('click', () => {

    if ( emptyOperand( firstOperand ) ) {
        firstOperand = result;
        secondOperand = parseFloat(h2.textContent);
        result = operate(firstOperand, secondOperand, oldOperator);
        firstOperand = undefined;
        secondOperand = undefined;
        h2.textContent = result;
    }
    else if( emptyOperand( secondOperand ) ) {
        secondOperand = parseFloat(h2.textContent);
        result = operate(firstOperand, secondOperand, oldOperator);
        firstOperand = undefined;
        secondOperand = undefined;
        h2.textContent = result;
    }  
    lastInput = 'equal';
});

function operate(operand1, operand2, operation) {
    switch(operation) {
        case '*': return multiply(operand1, operand2);
        case '/': return divide(operand1, operand2);
        case '+': return add(operand1, operand2);
        case '-': return substract(operand1, operand2);
    }
}

function divide (number1, number2) {
    return (number1 / number2);
}

function multiply (number1, number2) {
    return (number1 * number2);
}

function substract (number1, number2) {
    return (number1 - number2);
}

function add (number1, number2) {
    return (number1 + number2);
}