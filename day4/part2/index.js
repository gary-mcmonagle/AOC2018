const fs = require('fs');

const solve = async () => {
  let shift = {}
  const input = await fs.readFileSync('day4/input.txt').toString().split('\n')
  .map((row) => {
    return parseInput(row);
  })
  .sort((a,b) => {
    return  a.time - b.time; 
  })
  let shifts = createShifts(input);
  let guards = Array.from(new Set(shifts.map((row) => {
    return row.id
  })))
  .map((guardId) => {
    let totalAsleepMinutes = []
    guard = {id: guardId};
    shifts.map((shift) => {
      if(guardId == shift.id){
        totalAsleepMinutes = totalAsleepMinutes.concat(shift.minutesAsleep);
      }
    })
    guard.totalAsleepMinutes = totalAsleepMinutes
    return guard
  });
  let frequencies = guards.map((value) => {
    let mostCommon = mode(value.totalAsleepMinutes);
    let count = value.totalAsleepMinutes.filter((minute) => {
      return minute == mostCommon
    }).length;
    return {id: value.id, freq:count, min:mostCommon}
  })
  let largest = 0;
  frequencies.forEach((value, i) => {
    if(value.freq > frequencies[largest].freq){
      largest = i;
    }
  });
  return frequencies[largest].min * parseInt(frequencies[largest].id.substring(1));
};


const createShifts = (input) => {
  let shifts = [];
  input.forEach((row, index) => {
    if(row.info.split(' ')[0] == 'Guard'){
      if(index != 0){
        shifts.push(shift);
      }
      shift = {id: row.info.split(' ')[1], minutesAsleep: []};
      state = 'wakes up';
    }
    else{
      if(state = 'falls asleep' && row.info == 'wakes up'){
        for(let i = input[index-1].time.getMinutes(); i< row.time.getMinutes(); i++){
          shift.minutesAsleep.push(i);
        }
      }
      state = row.info;
    }
    if(index == input.length-1){
      shifts.push(shift);
    }
  });
  return shifts;
  
};

const mode = (arr) => {
  return arr.reduce(function(current, item) {
      var val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
      if (val > current.greatestFreq) {
          current.greatestFreq = val;
          current.mode = item;
      }
      return current;
  }, {mode: null, greatestFreq: -Infinity, numMapping: {}}).mode;
};

const parseInput = (inputRow) => {
  let inpSplit = inputRow.split(']')
  let row = {
    info: inpSplit[1].trim(),
    time: new Date(inpSplit[0].substring(1))
  };
  return row
};

solve().then((output) => {
    console.log(output)
});