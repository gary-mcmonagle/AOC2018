const fs = require('fs');

const solve = async () => {
  let input = await fs.readFileSync('day5/input.txt').toString();
  let clean = false;
  while (!clean) {
    const before = input;
    input = doReaction(input);
    clean = before == input;
  }
  return input.length;
};
const doReaction = (polymer) => {
  for (let i = 0; i<polymer.length-1; i++) {
    if (polymer[i].toUpperCase() == polymer[i+1].toUpperCase()) {
      const firstIsUpper = isUpperCase(polymer[i]);
      const secondIsUpper = isUpperCase(polymer[i+1]);
      if (firstIsUpper != secondIsUpper) {
        const j = i+1;
        return polymer.substr(0, j-1)+polymer.substring(j+1);
      }
    }
  }
  return polymer;
};

const isUpperCase = (char) => {
  return char == char.toUpperCase();
};


solve().then((output) => {
  console.log(output);
});
