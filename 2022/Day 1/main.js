import * as utils from '../../utils/index.js'

const arrayOfSums = (await utils.loadFile('input'))
    .split(/\n\n/)
    .map(x => x.split('\n').map(x => parseInt(x)))
    .map(x => utils.sum(x))

async function part1() {
    const result = Math.max(...arrayOfSums);
    console.log(result);
}

async function part2() {
    const topThree = arrayOfSums
        .sort((a,b) => a - b)
        .slice(-3);
    console.log(utils.sum(topThree));
}

await part1();
await part2();