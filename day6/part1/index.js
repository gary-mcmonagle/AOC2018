const fs = require('fs');

const solve = async () => {
  let coOrds = [];
  await fs.readFileSync('day6/input1.txt').toString()
  .split('\n')
  .map((coord) => coord.replace(',','').split(' '))
  .map((coord) => [parseInt(coord[0]), parseInt(coord[1])])
  .map((coord) => {
    coOrds.push({
      x:coord[0],
      y:coord[1],
      id:coOrds.length
  });  
})
let grid = createGrid(coOrds)
let ml = getMarkedLocations(grid) 
let edges = getEdges(ml)
  return grid
};

const createGrid = (coOrds) => {
  let grid = createEmptyGrid(coOrds)
  grid = fillGridCoOrds(grid, coOrds)
  grid = setNearestMark(grid)
  return grid
}

const fillGridCoOrds = (grid, coOrds) => {
  coOrds.map(c => {
    grid[c.y][c.x].mark = c.id
  })
  return grid;
}

const createEmptyGrid = (coOrds) => {
  let height = Math.max(...coOrds.map((coOrd) => coOrd.y)) + 1;
  let width = Math.max(...coOrds.map((coOrd) => coOrd.x)) + 1;
  let grid = []
  for(let i = 0; i < height; i++){
    let row = []
    for(let j = 0; j < width; j++){
      row.push({})
    }
    grid.push(row)

  }
  return grid
}

const isValidGrid = (grid) => {
  let valid = true;
  let ml = getMarkedLocations(grid) 
  let edges = getEdges(ml)
  let peremeterWalls = []
  peremeterWalls.push(grid[0])
  peremeterWalls.push(grid[grid.length-1])
  peremeterWalls.push(grid.map(row => row[0]))
  peremeterWalls.push(grid.map(row => row[row.length-1]))

  peremeterWalls.map(row => {
    row.map(gs => {
      gs.distances.shortest.map(shrt => {
        if(!edges.includes(shrt)){
          console.log(gs)
          valid = false
        }
      })
    })
  })


}

const getEdges = (markedLocations) => {
  let xs = markedLocations.map(loc => loc.x)
  let ys = markedLocations.map(loc => loc.y)
  let edgeNumbers = [Math.max(...xs), Math.min(...xs), Math.max(...ys), Math.min(...ys)]
  let edges = []
  markedLocations.map(ml => {
    if(edgeNumbers.includes(ml.x) || edgeNumbers.includes(ml.y)){
      edges.push(ml.id)
    }
  })
  return edges

}


const getShortestDistances = (distances) => {
  let shortest = [];
  let shortestAmount = Math.min(...distances.map(d => d.distance));
  distances.map(d => {
    if(d.distance == shortestAmount){
      shortest.push(d.id)
    }
  })
  return shortest
}
const setNearestMark = (grid) => {
  let marked = getMarkedLocations(grid);
  grid.forEach((row, rowidx) => {
    row.forEach((gs, gsidx) => {
      gs.distances = {}
      gs.distances.all = marked.map(mark => {
        return {
          id: mark.id,
          distance: taxiCabDistance([mark.x, mark.y], [rowidx, gsidx])
        }
      })
      gs.distances.shortest = getShortestDistances(gs.distances.all)

      let shortestDistances = null
      console.log('#########')
      console.log(gsidx)
      console.log(rowidx)
       console.log(gs.distances)
       console.log('#########')

    })
  });
  //console.log(grid)
  return grid

  console.log(marked)


}

const taxiCabDistance = (a, b) => {
  let distance = 0;
  [0,1].map((i) => {
    if(a[i] > b[i]){
      distance += a[i] - b[i]
    }
    else{
      distance += b[i] - a[i]
  }})
  return distance
}

const getMarkedLocations = (grid) => {
  let marked = []
  for(let i = 0; i< grid.length; i++){
    let row = grid[i];
    for(let j = 0; j<row.length; j++){
      let gs = row[j]
      if( gs.mark || gs.mark == 0){
        marked.push({
          y:i,
          x:j,
          id: gs.mark
        })
      }
    }
  }
  return marked
}


solve().then((output) => {
  //output  = Array(4).fill(0)
  console.log(output)
  //setNearestMark(output)
});

