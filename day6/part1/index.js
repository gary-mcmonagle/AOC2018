// eslint-disable-next-line no-useless-catch
const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync('day6/part1/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    });
  });
  const dimensions = getDimensions(input);
  const grid = placeCoOrds(createGrid(dimensions.height + 1, dimensions.width + 1), input);
  console.log(grid);
};

const getDimensions = (coOrds) => {
  return {
    width: Math.max(...coOrds.map((x) => x[0])),
    height: Math.max(...coOrds.map((y) => y[0])),
  };
};

const createGrid = (height, width) => {
  const grid = [];
  for (let y = 0; y <= height; y++) {
    const row = [];
    for (let x = 0; x<= width; x++) {
      row.push({x, y});
    }
    grid.push(row);
  }
  return grid;
};

const placeCoOrds = (grid, coOrds) => {
  console.log(coOrds);
  for (let i = 0; i<coOrds.length; i++) {
    const coOrd = coOrds[i];
    grid[coOrd[0]][coOrd[1]].id = i;
  }
  return grid;
};

solve();

