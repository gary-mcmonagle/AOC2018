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
  return grid
}

const createThreeByThreeGrids = (grid) => {
  let threes = []
  for(let i = 0; i<grid.length-2; i++){
    for(let j = 0; j<grid.length-2; j++){
      let total = 0
      total+= grid[i][j].power
      total+= grid[i][j+1].power
      total+= grid[i][j+2].power
      total+= grid[i+1][j].power
      total+= grid[i+1][j+1].power
      total+= grid[i+1][j+2].power
      total+= grid[i+2][j].power
      total+= grid[i+2][j+1].power
      total+= grid[i+2][j+2].power
      threes.push({
        topLeft: [j+1, i+1],
        count: total
      })
    }

  }
  return threes

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

let grid = createGrid()
let three = createThreeByThreeGrids(grid)
three = three.sort((a, b) => b.count - a.count)
console.log(three[0])