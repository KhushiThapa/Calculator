let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.querySelector('#display');

function inputNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function inputOperator(op) {
    if (firstOperand === null && !waitingForSecondOperand) {
        firstOperand = parseFloat(displayValue);
        operator = op;
        waitingForSecondOperand = true;
    } else if (operator) {
        const result = calculate(firstOperand, parseFloat(displayValue), operator);
        displayValue = String(result);
        firstOperand = result;
        operator = op;
        waitingForSecondOperand = true;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay();
}

function calculateResult() {
    if (operator && !waitingForSecondOperand) {
        displayValue = String(calculate(firstOperand, parseFloat(displayValue), operator));
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

function updateDisplay() {
    display.textContent = displayValue;
}
