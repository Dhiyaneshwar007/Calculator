// script.js
let display = document.getElementById('display');
let buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    let value = button.textContent;

    if (value === 'C') {
      // Clear the display and reset variables
      currentInput = '';
      operator = '';
      firstOperand = '';
      secondOperand = '';
      display.value = '';
    } else if (value === '=') {
        // Perform calculation
        if (firstOperand && operator && currentInput) {
          secondOperand = currentInput;
          let result = calculate(firstOperand, secondOperand, operator);
          
          // Display result
          display.value = result;
      
          // Add history entry
          let historyList = document.getElementById('history-list');
          let listItem = document.createElement('li');
          listItem.textContent = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
          historyList.prepend(listItem); // Adds new history entry at the top
      
          // Reset for next input
          currentInput = result;
          operator = '';
          firstOperand = '';
          secondOperand = '';
        }
      }
       else if (['+', '-', '*', '/'].includes(value)) {
        // Handle operator input
        if (currentInput) {
          firstOperand = currentInput;
          operator = value;
          currentInput = ''; 
          display.value = firstOperand + ' ' + operator; // Show operator on display
        }
      }
     else {
        // Handle number and decimal input
        currentInput += value;
        
        if (operator) {
          display.value = firstOperand + ' ' + operator + ' ' + currentInput; // Show full expression
        } else {
          display.value = currentInput;
        }
      }
      
  });
});

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return 0;
  }
}