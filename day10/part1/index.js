// eslint-disable-next-line no-useless-catch
const createGrid = () => {
  const size = 300;
  const gridSerialNumber = 6878;
  const grid = [];
  for (let i = 1; i<=size; i++) {
    const row = [];
    for (let j = 1; j<=size; j++) {
      row.push({
        x: j,
        y: i,
        power: setPower(j, i, gridSerialNumber),
      });
    }
    grid.push(row);
  }
  return grid;
};

const createThreeByThreeGrids = (grid) => {
  const threes = [];
  for (let i = 0; i<grid.length-2; i++) {
    for (let j = 0; j<grid.length-2; j++) {
      let total = 0;
      total+= grid[i][j].power;
      total+= grid[i][j+1].power;
      total+= grid[i][j+2].power;
      total+= grid[i+1][j].power;
      total+= grid[i+1][j+1].power;
      total+= grid[i+1][j+2].power;
      total+= grid[i+2][j].power;
      total+= grid[i+2][j+1].power;
      total+= grid[i+2][j+2].power;
      threes.push({
        topLeft: [j+1, i+1],
        count: total,
      });
    }
  }
  return threes;
};

const setPower = (x, y, gridSerialNumber) => {
  const rackId = x + 10;
  let power = rackId * y;
  power += gridSerialNumber;
  power *= rackId;
  if (power < 100) {
    power = 0;
  } else {
    power = Number(power.toString()[power.toString().length-3]);
  }
  return power - 5;
};

const grid = createGrid();
let three = createThreeByThreeGrids(grid);
three = three.sort((a, b) => b.count - a.count);
console.log(three[0]);
