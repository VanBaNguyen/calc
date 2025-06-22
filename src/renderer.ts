window.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result') as HTMLInputElement;
  const buttons = document.querySelectorAll('.button');

  let expression = '';

  // Operators and allowed input
  const validInputs = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/','(',')'];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = (button as HTMLButtonElement).value;

      if (value === 'C') {
        expression = '';
        result.value = '';
      } else if (value === '=') {
        try {
          // Use Function constructor for basic safe eval
          // Replace division and multiplication symbols for eval
          const sanitized = expression.replace(/÷/g, '/').replace(/×/g, '*');
          // Evaluate the expression
          // eslint-disable-next-line no-new-func
          const evaluated = Function('"use strict";return (' + sanitized + ')')();
          result.value = evaluated.toString();
          expression = evaluated.toString();
        } catch {
          result.value = 'Error';
          expression = '';
        }
      } else if (validInputs.includes(value)) {
        expression += value;
        result.value = expression;
      }
    });
  });
});
  