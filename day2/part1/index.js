const fs = require('fs');

const solve =  async () => {
    const input = await fs.readFileSync("day2/input.txt").toString().split('\n');
    for(let i = 0; i<input.length; i++){
        for(let j = 0; j<input.length; j++){
            let dif =  await differBySingleChar(input[i], input[j])
            if(dif){
                return input[i].slice(0,dif-1) + input[i].slice(dif);
            }
        }
    }
}

const differBySingleChar = async (truth, compare) => {
    let diffrence = 0; 
    let ind = 0
    for(let i = 0; i<truth.length; i++){
        if(truth[i] != compare[i]){
            diffrence++; 
            ind = i
        }
        if(diffrence > 1){
            return false;
        }
    }
    if(diffrence == 0){
        return false
    }
    return ind

}
solve().then((output) => {
    console.log(output);
})