const solve = async () => {
  const players = 493;
  const lastMarble = 71863;
  let circle = [ 0 ];
  let currentMarble = 1;
  let currentPlayer = 0
  let lastMarbleIdx = 0;
  let scores = Array.from(Array(players),(x,i)=>i).map(player => {return {player: player, score: 0}})
  for(let i = 0; i<lastMarble; i++){
    if(currentMarble % 10000 == 0){
      console.log(currentMarble)
    }
    if(currentMarble % 23 != 0){
      let nextIndex = getNextInsertIndex(circle, lastMarbleIdx, i==0)
      circle.splice(nextIndex, 0, currentMarble)
      lastMarbleIdx = nextIndex;
    }
    else{
      scores.filter(scr => scr.player == currentPlayer)[0].score += currentMarble
      let popIndex = lastMarbleIdx - 7;
      if(popIndex < 0){
        popIndex += circle.length
      }
      scores.filter(scr => scr.player == currentPlayer)[0].score += circle[popIndex]
      circle.splice(popIndex, 1);
      lastMarbleIdx = popIndex
    }
    currentMarble++;
    currentPlayer++;
    if(currentPlayer == players){
      currentPlayer = 0; 
    }
  }
  return Math.max(...scores.map(scr => scr.score))

};

const getNextInsertIndex = (circle, lastMarbleIdx, isFirstMarble) => {
  if(isFirstMarble){
    return 1;
  }
  else{
    let idx = lastMarbleIdx + 2
    if(idx > circle.length){
      idx = idx- circle.length
    }
    return idx
  }

}



solve().then((output) => {
    console.log(output);
});