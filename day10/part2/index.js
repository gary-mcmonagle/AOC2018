const createGrid = () => {
  const size = 300;
  let gridSerialNumber = 6878
  let grid = []
  for(let i = 1; i<=size; i++){
    let row = []
    for(let j = 1; j<=size; j++){
      row.push({
        x: j,
        y: i, 
        power: setPower(j, i, gridSerialNumber)
      })
    }
    grid.push(row)
  }
  return grid;
}

const createThreeByThreeGrids = (grid) => {
  let grids = []
  for(let i = 0; i<grid.length-1; i++){
    for(let j = 0; j<grid.length-1; j++){
      console.log(`${i} ${j}`)
      grids.push(createAllGridsForSquare(j, i, grid))
    }
  }
  return grids.sort((a, b) => b.biggest.value - a.biggest.value)[0]
}

const getHighestValueTL = (grids) => {

}

const setPower = (x, y, gridSerialNumber) => {
  let rackId = x + 10
  power = rackId * y
  power += gridSerialNumber
  power *= rackId
  if(power < 100){
    power = 0
  }

  else{
    power = Number(power.toString()[power.toString().length-3])
  }
  return power - 5
}
const getGridTotal = (x, y, size, grid) => {
  let total = 0; 
  for(let i = 0; i<size; i++){
    for(let j = 0; j<size; j++){
      total += grid[x+j][y+i].power; 
    }
  }
  return total; 
}

const createAllGridsForSquare = (x, y, grid) => {
  let size = 0; 
  let sizes = []
  let squareSize = {
    topLeft: {
      x:x,
      y:y
    }
  };
  let valid = true;
  while(valid){
    try{
      sizes.push({
        size: size,
        value: getGridTotal(x, y, size, grid)
      });
    }
    catch(e){
      valid = false; 
    }
    size++;
  }
  squareSize.biggest = sizes.sort((a,b) => b.size - a.size)[0]
  return squareSize;
}
let grid = createGrid()
let three = createThreeByThreeGrids(grid)
//three = three.sort((a, b) => b.count - a.count)
console.log(three)