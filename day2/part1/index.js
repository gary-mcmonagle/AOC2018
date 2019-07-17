const fs = require('fs');

const solve = async () => {
  const input = await fs.readFileSync('day2/input.txt').toString().split('\n');
  return input.filter((ins) => {
    return hasRepeating(ins, 2);
  }).length *
    input.filter((ins) => {
      return hasRepeating(ins, 3);
    }).length;
};

const hasRepeating = (inputString, timesRepeated) => {
  const charArr = inputString.split('');
  for (let i = 0; i<charArr.length; i++) {
    let appeared = 0;
    for (let j = 0; j<charArr.length; j++) {
      if (charArr[i] === charArr[j]) {
        appeared++;
      }
    }
    if (appeared == timesRepeated) {
      return true;
    }
  }
  return false;
};

solve().then((output) => {
  console.log(output);
});
