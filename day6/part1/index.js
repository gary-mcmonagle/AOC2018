// eslint-disable-next-line no-useless-catch
const fs = require('fs');

const solve = () => {
  const input = fs.readFileSync('day6/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    });
  });
  const dimensions = getDimensions(input);
  const grid = addNearest(placeCoOrds(createGrid(dimensions.height + 1, dimensions.width + 1), input), input);
  const perimeters = getPerimeters(grid);
  const areas = getAreaCounts(grid, input, perimeters);
  getPerimeters(grid);
  return Math.max(...areas);
};

const getDimensions = (coOrds) => {
  return {
    width: Math.max(...coOrds.map((x) => x[0])),
    height: Math.max(...coOrds.map((y) => y[0])),
  };
};

const getPerimeters = (grid) => {
  const topRow = grid[0];
  const bottomRow = grid[grid.length-1];
  const firstColumn = grid.map((row) => row[0]);
  const lastColumn = grid.map((row) => row[row.length-1]);
  const perimeterRows = [topRow, bottomRow, firstColumn, lastColumn];
  const perimeters = [];
  perimeterRows.map((row) => {
    row.map((node) => {
      node.nearestLocation.map((nl) => {
        perimeters.push(nl);
      });
    });
  });
  return perimeters;
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

const addNearest = (grid, coOrds) => {
  for (let i = 0; i< grid.length; i++) {
    const row = grid[i];
    for (let j=0; j<row.length; j++) {
      grid[i][j].nearestLocation = getNearestLocation(coOrds, j, i);
    }
  }
  return grid;
};

const getNearestLocation = (coOrds, x, y) =>{
  const distances = [];
  coOrds.map((coOrd) => {
    distances.push(Math.abs(coOrd[0] - x) + Math.abs(coOrd[1] - y));
  });
  const closest = [];
  distances.map((d, i) => {
    if (d == Math.min(...distances)) closest.push(i);
  });
  return closest;
};

const getAreaCounts = (grid, coOrds, perimeters) => {
  const areas = [];
  coOrds.map((c, i) => {
    if (!perimeters.includes(i)) {
      let count = 0;
      grid.map((row) => {
        row.map((node) => {
          if (node.nearestLocation.length == 1 && node.nearestLocation[0] == i) {
            count++;
          }
        });
      });
      areas.push(count);
    }
  });
  return areas;
};

console.log(solve());

