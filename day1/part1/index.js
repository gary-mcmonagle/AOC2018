const fs = require('fs');
const solve = async () => {
    const input = await fs.readFileSync("day1/input.txt").toString().split('\n');
    let runningTotal = 0;
    await Promise.all(input.map(async (frequencyChange)  => {
        let frequencyChangeNum = parseInt(frequencyChange.substring(1));
        if(frequencyChange[0] == '-'){
            frequencyChangeNum = frequencyChangeNum * -1;
        }
        runningTotal += frequencyChangeNum;
    }));
    return runningTotal;
}
solve().then((output) => {
    console.log(output);
})
