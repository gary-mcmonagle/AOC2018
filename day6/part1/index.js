// eslint-disable-next-line no-useless-catch
const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync('day6/part1/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    });
  });
  console.log(input);
  // const grid = createGrid(input)
  // console.log(grid)
};

// const createGrid = (coOrds) => {
//   // let grid = [];
//   // let width = Math.max(coOrds.map(coOrd => parseInt(coOrd[0])));
//   // let height = Math.max(coOrds.map(coOrd => parseInt(coOrd[1])));
//   // console.log(width)
// }


solve();

