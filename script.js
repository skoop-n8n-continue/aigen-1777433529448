
const display = document.querySelector('.calculator-display');
let currentInput = '';
let operator = null;
let previousInput = '';

document.querySelectorAll('.calculator-keys button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (button.classList.contains('operator')) {
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            display.value = previousInput + ' ' + operator;
        } else if (button.classList.contains('decimal')) {
            if (!currentInput.includes('.')) {
                currentInput += value;
                display.value = currentInput;
            }
        } else if (button.classList.contains('clear')) {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.value = '';
        } else if (button.classList.contains('equal-sign')) {
            calculate();
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error: Div by zero';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = null;
}
