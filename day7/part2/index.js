const fs = require('fs');

const solve = async () => {
  const input = await fs.readFileSync('day7/input.txt').toString()
      .split('\n')
      .map((row) => {
        const spl = row.split(' ');
        return {
          id: spl[7],
          dependentOn: spl[1],
        };
      });
  let allLetters = [];
  input.map((inp) => {
    allLetters.push(inp.id);
    allLetters.push(inp.dependentOn);
  });
  allLetters = Array.from(new Set(allLetters));
  const visited = [];
  let count = 0;
  let workers = createWorkers(5);
  do {
    for (let i = 0; i<workers.length; i++) {
      const wrkr = workers[i];
      if (wrkr.currentlyOn) {
        wrkr.currentlyOn.timeLeft--;
        if (wrkr.currentlyOn.timeLeft == 0) {
          visited.push(wrkr.currentlyOn.id);
          wrkr.currentlyOn = undefined;
        }
      }
    }

    const availableWorkers = workers.filter((wrkr) => !wrkr.currentlyOn);
    for (let i = 0; i<availableWorkers.length; i++) {
      const currentlyBeingWorkedOn = workers.filter((wrkr) => wrkr.currentlyOn).map((wrkr) => wrkr.currentlyOn.id);
      const nextLocation = getNextLocations(visited, currentlyBeingWorkedOn, allLetters, input);
      if (nextLocation.length > 0) {
        workers = assignWorker(workers, nextLocation[0]);
      }
    }
    count++;
  } while (visited.length < allLetters.length);
  return count-1;
};

const getNextLocations = (visited, inProgress, allLetters, input ) => {
  const possibleLocations = [];
  allLetters.map((letter) => {
    if (!visited.includes(letter) && !inProgress.includes(letter)) {
      let canBeVisited = true;
      const letterLocs = input.filter((inp) => inp.id == letter);
      letterLocs.map((loc) => {
        if (!visited.includes(loc.dependentOn)) {
          canBeVisited = false;
        }
      });
      if (canBeVisited) {
        possibleLocations.push(letter);
      }
    }
  });
  return possibleLocations.sort();
};

const assignWorker = (workers, location) => {
  let assigned = false;
  for (let i = 0; i<workers.length; i++) {
    const wrkr = workers[i];
    if (!assigned) {
      if (!wrkr.currentlyOn) {
        assigned = true;
        wrkr.currentlyOn = {
          id: location,
          timeLeft: location.charCodeAt(0)-64 + 60,
        };
      }
    }
  }
  return workers;
};

const createWorkers = (num) => {
  const workers = [];
  for (let i = 0; i<num; i++) {
    workers.push({id: i, currentlyOn: undefined});
  }
  return workers;
};

solve().then((output) => {
  console.log(output);
});
