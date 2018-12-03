const fs = require('fs');

const solve =  async () => {
    const input = await fs.readFileSync('day3/input.txt')
    .toString().split('\n');
    const claims = createClaims(input);
    let fabric = createFabric();
    for(let i =0; i<claims.length; i++){
        fabric = addClaim(fabric, claims[i]);
    }
    for(let i =0; i<claims.length; i++){
        if(isSoleSquare(fabric, claims[i])){
            return claims[i].id;
        }
    }
}

const isSoleSquare = (fabric, claim) =>{
    for(let i = claim.location[1];
         i < claim.location[1] + claim.size[1]; i++){
        for(let j = claim.location[0];
            j < claim.location[0] + claim.size[0]; j++){
            if(fabric[i][j] > 1){
                return false;
            }
        }
    }
    return true;
}

const createClaims = (input) => {
    let claims = [];
    input.map((singleClaim) => {
        let claim = {};
        let idSplit = singleClaim.split('@');
        claim.id = idSplit[0].trim();
        claim.location = idSplit[1].trim()
        .split(':')[0].split(',').map((num) => {
            return parseInt(num)
        });
        claim.size = idSplit[1].trim().split(':')[1]
        .split('x').map((num) => {
            return parseInt(num)
        });
        claims.push(claim);
    });
    return claims; 
}

const addClaim = (fabric, claim) => {
    for(let i = claim.location[1];
        i < claim.location[1] + claim.size[1]; i++){
        for(let j = claim.location[0];
            j < claim.location[0] + claim.size[0]; j++){
            fabric[i][j]++; 
        }
    }
    return fabric
}

const createFabric = () => {
    let fabric = []
    const size = 1000;
    for(let i = 0; i<size; i++){
        let row = [];
        for(let j = 0; j<size; j++){
            row.push(0);
        }
        fabric.push(row);
    }
    return fabric;

}

solve().then((output) => {
    console.log(output);
})