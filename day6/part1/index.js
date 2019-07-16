const fs = require('fs');
const solve = () => {
  let input = fs.readFileSync('day6/input.txt').toString().split('\n').map((row) => {
    return row.split(',').map((dig) => {
      return parseInt(dig);
    })
  });
  console.log(input)
}

solve()

