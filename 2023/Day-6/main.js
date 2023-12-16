import * as utils from '../../utils/index.js'

const parseInput = (input) => {
    const [timeData, distanceData] = input.split('\n');
    const times = [...timeData.matchAll(/(\d+)/g)].map(el=>Number.parseInt(el[0]));
    const distances = [...distanceData.matchAll(/(\d+)/g)].map(el=>Number.parseInt(el[0]));
    const races = times.map((time, index) => ({time, distance: distances[index]}));
    return races;
};

const resolveRace = (race) => {
    let options = [];
    for (let i = 0; i <= race.time; i++) {
        const speed = i;
        const distance = (race.time - speed) * speed;
        options.push(distance);
    }
    return options;
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const races = parseInput(file);
    const solution = races
        .map(race => { return { topDistance: race.distance, options: resolveRace(race)} })
        .map(race => race.options.filter(option=>option > race.topDistance).length)
        .product();

    console.log("Part 1 solution: ", solution); 
};

const part2 = async () => {
    console.log("Part 2 solution: ", 0); 
};

await part1();
await part2();