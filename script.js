document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.MyCalculator-display');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    const buttons = document.querySelectorAll('.number-btn, .operator-btn');

    let displayInput = '';
    let operator = '';
    let firstOperand = null;
    let shouldResetDisplay = false;

    display.textContent = '0';

    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.textContent));
    });

    clearButton.addEventListener('click', clearDisplay);
    equalsButton.addEventListener('click', calculateResult);

    function handleButtonClick(value) {
        if (value === 'Clear') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else if (isOperator(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    }

    function handleOperator(value) {
        if (operator) {
           
            if (displayInput) {
                calculateIntermediateResult();
            }
        }
        // Set new operator and store the current display input
        operator = value;
        firstOperand = displayInput;
        shouldResetDisplay = true;
    }

    function handleNumber(value) {
        if (shouldResetDisplay) {
            displayInput = value;
            shouldResetDisplay = false;
        } else {
            displayInput += value;
        }
        updateDisplay();
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === 'x' || value === '/';
    }

    function clearDisplay() {
        displayInput = '';
        operator = '';
        firstOperand = null;
        display.textContent = '0';
    }

    function calculateResult() {
        if (operator && displayInput && firstOperand !== null) {
            const result = operate(parseFloat(firstOperand), parseFloat(displayInput), operator);
            displayInput = result.toString();
            operator = '';
            firstOperand = null;
            shouldResetDisplay = true;
            updateDisplay();
        }
    }

    function calculateIntermediateResult() {
        if (operator && displayInput && firstOperand !== null) {
            const result = operate(parseFloat(firstOperand), parseFloat(displayInput), operator);
            displayInput = result.toString();
            firstOperand = displayInput;
            operator = ''; 
            shouldResetDisplay = true;
            updateDisplay();
        }
    }

    function operate(a, b, op) {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 'Error'; 
            default:
                return b;
        }
    }

    function updateDisplay() {
        display.textContent = displayInput || '0';
    }
});
