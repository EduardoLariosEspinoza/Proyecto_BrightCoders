// const lcdx1 = require('./digits');

// function zero() {
const zero = `
 _ 
| |
|_|
`;

const one = `
   
  |
  |
`;

const two = `
 _ 
 _|
|_ 
`;

const three = `
 _ 
 _|
 _|
`;

const four = `
   
|_|
  |
`;
const five = `
 _ 
|_ 
 _|
`;
const six = `
 _ 
|_ 
|_|
`;
const seven = `
 _ 
  |
  |
`;
const eight = `
 _ 
|_|
|_|
 `;
const nine = `
 _ 
|_|
 _|
`;

let numbers = {
  0: zero,
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
  7: seven,
  8: eight,
  9: nine
}

class Processor {
  constructor(height, width, numbers_structure) {
    this.height = height;
    this.width = width;
    this.space = ' ';
    this.enter = '\n';
    this.numbers_structure = numbers_structure
  }

  getNumber(int_number) {
    return this.numbers_structure[int_number]
  }

  resizeWidth(number) {
    if (this.width <= 1) {
      return number;
    }
    const numberArray = number.split(this.enter);
    const otherHeigth = numberArray.length - 2;
    let numberReSized = this.enter;

    for (let i = 0; i < otherHeigth; i++) {
      const heightI = i + 1;
      let lines = numberArray[heightI].charAt(0);
      const newLine = numberArray[heightI].charAt(1);

      for (let j = 0; j < this.width; j++) {
        lines += newLine;
      }

      lines += numberArray[heightI].charAt(numberArray[heightI].length - 1);
      numberReSized += `${lines}\n`;
    }

    return numberReSized;
  }

  resizeHeight(number) {
    if (this.height <= 1) {
      return number;
    }
    const numberArray = number.split(this.enter);
    let numberReSized = this.enter;
    const secondLine = numberArray[2];
    const thirdLine = numberArray[3];
    const width = 3; // Number of columns on stored LCD number.

    numberReSized += `${numberArray[1]}\n`
    for (let i = 0; i < this.height - 1; i++) {
      numberReSized += `${secondLine.charAt(0)} ${secondLine.charAt(width-1)}\n`;
    }
    numberReSized += `${secondLine.charAt(0)}${secondLine.charAt(1)}${secondLine.charAt(2)}\n`;

    for (let i = 0; i < this.height - 1; i++) {
      numberReSized += `${thirdLine.charAt(0)} ${thirdLine.charAt(width-1)}\n`;
    }
    numberReSized += `${thirdLine.charAt(0)}${thirdLine.charAt(1)}${thirdLine.charAt(width-1)}\n`;

    return numberReSized;
  }


  run(numbers) {
    const digitLines = []
    let numberIndex = 0

    // fill every digit lines
    for (const number of numbers) {
      const resizedDigit = this.resizeWidth(this.resizeHeight(this.getNumber(number)));
      const digitSplit = resizedDigit.split(this.enter)

      for (let heightIndex = 1; heightIndex < digitSplit.length - 1; heightIndex++) {
        // first digit position y=0 x=0 need \n and to be assigned
        if (numberIndex === 0 && heightIndex === 1 && !digitLines[heightIndex]) {
          digitLines[heightIndex] = this.enter + digitSplit[heightIndex] + this.space

          // other first digit in position y need to be assigned
        } else if (!digitLines[heightIndex]) {
          digitLines[heightIndex] = digitSplit[heightIndex] + this.space

          // if its not the last word, a space to improve lisibility
        } else if (numberIndex + 1 < numbers.length) {
          digitLines[heightIndex] += digitSplit[heightIndex] + this.space

          // last words don't need extra space
        } else {
          digitLines[heightIndex] += digitSplit[heightIndex]
        }
      }
      numberIndex++
    }

    digitLines.reduce((result, line) => {
      result += `${line}\n`
      return result
    }, '');

    digitLines.forEach(element => {
      console.log(element);
    });
  }
}

processor = new Processor(8, 4, numbers);
processor.run([1, 2, 3, 4, 5, 6, 7, 8, 9]);