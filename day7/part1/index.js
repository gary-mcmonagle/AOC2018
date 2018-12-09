const fs = require('fs');

const solve = async () => {
  let input = await fs.readFileSync('day7/input.txt').toString()
  .split('\n')
  .map(row => {
    let spl = row.split(' ');
    return {
      id: spl[7],
      dependentOn: spl[1]
    };
  });
  let allLetters = [];
  input.map(inp => {
    allLetters.push(inp.id);
    allLetters.push(inp.dependentOn);
  })
  allLetters = Array.from(new Set(allLetters));
  let visited = [];
  do{
    visited.push(getNextLocations(visited, allLetters, input));
  }while(visited.length < allLetters.length)
  return visited.join('');
};

const getNextLocations = (visited, allLetters, input ) => {
    let possibleLocations = [];
    allLetters.map(letter => {
      if(!visited.includes(letter)){
        let canBeVisited = true; 
        let letterLocs = input.filter(inp => inp.id == letter);
        letterLocs.map(loc => {
          if(!visited.includes(loc.dependentOn)){
            canBeVisited = false;
          }
        })
        if(canBeVisited){
          possibleLocations.push(letter);
        }
      }
    })
    return possibleLocations.sort()[0];
}



solve().then((output) => {
    console.log(output);
});