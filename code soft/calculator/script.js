let currentInput = '';
let previousInput = '';
let operation = null;
let resetScreen = false;

const display = document.getElementById('result');

function appendToDisplay(value) {
    if (resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    
    if (value === '.' && currentInput.includes('.')) return;
    if (value === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
        return;
    }
    
    currentInput += value;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
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
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    resetScreen = true;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (event.key === '.') {
        appendToDisplay('.');
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperation(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    } else if (event.key === 'Backspace') {
        deleteLastChar();
    } else if (event.key === '%') {
        appendToDisplay('%');
    }
});