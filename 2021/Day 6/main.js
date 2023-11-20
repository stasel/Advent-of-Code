import * as utils from '../utils'

const REPRODUCTION_TIME = 6;
const NEW_FISH_REPRODUCTION_TIME = REPRODUCTION_TIME + 2;

function advance(fish) {
    let nextFish = [...fish];

    // Count new fish
    const newFishCount = fish.filter(f => f === 0).length;

    // Reduce counter to existing fish
    nextFish = nextFish.map( f => f - 1 >= 0 ? f - 1 : REPRODUCTION_TIME );

    // Add new fish
    return nextFish.concat(Array(newFishCount).fill(NEW_FISH_REPRODUCTION_TIME))
}

function advanceCounter(fishCounter) {
    let nextCounter = [...fishCounter];

    // Count new fish and shift all to the left
    const newFishCount = nextCounter.shift();

    // Reset the day to all fish that have reproduced
    nextCounter[REPRODUCTION_TIME] += newFishCount;

    // Add new fish
    nextCounter[NEW_FISH_REPRODUCTION_TIME] = newFishCount;

    return nextCounter    
}

async function part1() {
    let fish = await utils.loadIntArray("input");
    for(let i = 0; i <= 80; i++) {
        console.log(`Day ${i}: ${fish.length}`);
        fish = advance(fish);
    }
}

async function part2() {
    // Init counter object with { '1': 0, '2': 0 ,... '8': 0 };
    let fishCounter = Array(NEW_FISH_REPRODUCTION_TIME + 1).fill(0)

    // Load data and fill initial fishCounter
    let fish = await utils.loadIntArray("input");
    fish.forEach(f => {
        fishCounter[f]++;
    });

    // Simulate!
    for(let i = 0; i <= 255; i++) {
        console.log(`Day ${i}: ${fishCounter}`);
        fishCounter = advanceCounter(fishCounter);
    }
    console.log(`Sum = ${utils.sum(fishCounter)}`)
}

await part1();
await part2();