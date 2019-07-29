// eslint-disable-next-line no-useless-catch
const fs = require('fs');
const neededDistance = 10000;

const solve = () => {
  const input = fs.readFileSync('day6/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    });
  });
  const dimensions = getDimensions(input);
  const grid = addIsValidDistance(placeCoOrds(createGrid(dimensions.height + 1, dimensions.width + 1), input), input);
  return getRegionSize(grid);
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
  for (let i = 0; i<coOrds.length; i++) {
    const coOrd = coOrds[i];
    grid[coOrd[0]][coOrd[1]].id = i;
  }
  return grid;
};

const addIsValidDistance = (grid, coOrds) => {
  for (let i = 0; i< grid.length; i++) {
    const row = grid[i];
    for (let j=0; j<row.length; j++) {
      grid[i][j].isValidDistance = getTotalDistance(coOrds, j, i) < neededDistance;
    }
  }
  return grid;
};

const getTotalDistance = (coOrds, x, y) =>{
  const distances = [];
  coOrds.map((coOrd) => {
    distances.push(Math.abs(coOrd[0] - x) + Math.abs(coOrd[1] - y));
  });
  return distances.reduce((a, b) => a + b, 0);
};

const getRegionSize = (grid) => {
  let count = 0;
  grid.map((row) => {
    row.map((el) => {
      if (el.isValidDistance) count++;
    });
  });
  return count;
};

console.log(solve());

