function add(num1: number, num2: number) {
  return num1 + num2;
}

function subtract(num1: number, num2: number) {
  return num1 - num2;
}

function multiply(num1: number, num2: number) {
  return num1 * num2;
}

function divide(num1: number, num2: number) {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }

  return num1 / num2;
}

export { add, subtract, multiply, divide };
