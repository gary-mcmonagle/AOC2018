const fs = require('fs');

const solve = async () => {
  const input = await fs.readFileSync('day5/input.txt').toString();
  const uniqueChars = Array.from(new Set(input.split('').map((letter) => letter.toUpperCase())));
  const lengths = await Promise.all(uniqueChars.map(async (char) => {
    const re = new RegExp(`${char.toUpperCase()}|${char.toLowerCase()}`, 'g');
    return reducePolymer(input.replace(re, '')).length;
  }));
  return await Math.min(...lengths);
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

const reducePolymer = (polymer) => {
  let clean = false;
  while (!clean) {
    const before = polymer;
    polymer = doReaction(polymer);
    clean = before == polymer;
  }
  return polymer;
};

const isUpperCase = (char) => {
  return char == char.toUpperCase();
};

solve().then((output) => {
  console.log(output);
});
