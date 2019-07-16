class Grid {
  constructor(coOrds){
    this.coOrds = coOrds;
    this.initEmptyGrid();
  }

  init(){
    
  }

  initEmptyGrid(){
    let width =  Math.max(...this.coOrds.map(coOrd => coOrd[0]));
    let height = Math.max(...this.coOrds.map(coOrd => coOrd[1]));
    this.grid = [];
    for(let i = 0; i <= height; i++){
      let row = [];
      for(let j = 0; j <= width; j++){
        row.push('.');
      }
      this.grid.push(row);
    }
  }

  this



}

module.exports = Grid;