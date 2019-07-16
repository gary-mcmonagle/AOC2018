const fs = require('fs');

const solve = async () => {
    const freqs = await fs.readFileSync('day1/input.txt')
    .toString().split('\n');
    let runningTotal = 0;
    let freqInd = 0; 
    let seenFreqs = [];
    let got = false;
    while(!got){
        let frequencyChange = freqs[freqInd];
        let frequencyChangeNum = parseInt(frequencyChange.substring(1));
        if(frequencyChange[0] == '-'){
            frequencyChangeNum = frequencyChangeNum * -1;
        }
        runningTotal += frequencyChangeNum;
        if(seenFreqs.includes(runningTotal)){
            return runningTotal;
        }
        seenFreqs.push(runningTotal);
        freqInd++; 
        if(freqInd == freqs.length){
            freqInd = 0; 
        }
    }
}
solve().then((output) => {
    console.log(output);
})
