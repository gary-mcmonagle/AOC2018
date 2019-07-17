/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fs = require('fs');

const solve = async () => {
  const input = await fs.readFileSync('day4/input.txt').toString().split('\n')
      .map((row) => {
        return parseInput(row);
      })
      .sort((a, b) => {
        return a.time - b.time;
      });
  const shifts = createShifts(input);
  const guards = Array.from(new Set(shifts.map((row) => {
    return row.id;
  })))
      .map((guardId) => {
        let totalAsleepMinutes = [];
        const guard = {id: guardId};
        shifts.map((shift) => {
          if (guardId == shift.id) {
            totalAsleepMinutes = totalAsleepMinutes.concat(shift.minutesAsleep);
          }
        });
        guard.totalAsleepMinutes = totalAsleepMinutes;
        return guard;
      });
  let largest = 0;
  guards.forEach((value, i) => {
    if (value.totalAsleepMinutes.length > guards[largest].totalAsleepMinutes.length) {
      largest = i;
    }
  });
  return mode(guards[largest].totalAsleepMinutes) * parseInt(guards[largest].id.substring(1));
};


const createShifts = (input) => {
  const shifts = [];
  input.forEach((row, index) => {
    if (row.info.split(' ')[0] == 'Guard') {
      let shift = {};
      if (index != 0) {
        shifts.push({});
      }
      shift = {id: row.info.split(' ')[1], minutesAsleep: []};
      const state = 'wakes up';
    } else {
      if (state == 'falls asleep' && row.info == 'wakes up') {
        for (let i = input[index-1].time.getMinutes(); i< row.time.getMinutes(); i++) {
          shift.minutesAsleep.push(i);
        }
      }
      state = row.info;
    }
    if (index == input.length-1) {
      shifts.push(shift);
    }
  });
  return shifts;
};

const mode = (arr) => {
  return arr.reduce(function(current, item) {
    const val = current.numMapping[item] = (current.numMapping[item] || 0) + 1;
    if (val > current.greatestFreq) {
      current.greatestFreq = val;
      current.mode = item;
    }
    return current;
  }, {mode: null, greatestFreq: -Infinity, numMapping: {}}).mode;
};

const parseInput = (inputRow) => {
  const inpSplit = inputRow.split(']');
  const row = {
    info: inpSplit[1].trim(),
    time: new Date(inpSplit[0].substring(1)),
  };
  return row;
};

solve().then((output) => {
  console.log(output);
});
