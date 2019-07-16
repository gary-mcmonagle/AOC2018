const fs = require('fs');
const Grid = require('./Grid')

const solve = () => {
  let input = fs.readFileSync('day6/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    })
  });
  new Grid(input);
  
}



solve();

