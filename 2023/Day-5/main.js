import * as utils from '../../utils/index.js'

const resolveMap = (map, src) => {
    for (const range of map.ranges) {
        if (src >= range.srcStart && src < range.srcStart + range.length) {
            return range.destStart + (src - range.srcStart);
        }
    }
    return src;
};

const resolveMaps = (maps, src) => {
    let dest = src;
    for (const map of maps) {
        dest = resolveMap(map, dest);
    }
    return dest;
};

const parseSeedInput = (input, useRanges = false) => {
    const parts = input.replace("seeds: ", "").split(' ');
    if(!useRanges) {
        return parts.map((seed) => Number.parseInt(seed));
    }

    let seedRanges = [];
    for (let seed = 0; seed < parts.length; seed+=2) {
        seedRanges.push({
            start: Number.parseInt(parts[seed]), 
            length: Number.parseInt(parts[seed+1])
        });
    }
    return seedRanges;
}
const parseMapInput = (input) => {
    const lines = input.split('\n');
    const name = lines[0].replace(":","");
    const ranges = lines.slice(1)
        .map((line) => line.split(' ').map((range) => Number.parseInt(range)))
        .map(([destStart, srcStart, length]) => ({destStart, srcStart, length}));
    return {name, ranges};
};

const parseInput = (input, useSeedRanges = false) => {
    const sections = input.split('\n\n');
    const seeds = parseSeedInput(sections[0], useSeedRanges);
    const maps = sections.slice(1).map(parseMapInput, useSeedRanges);
    return {seeds, maps}
};
const part1 = async () => {
    const file = await utils.loadFile('./input');
    const almanac = parseInput(file, false);
    const solution = almanac.seeds.map((seed) => resolveMaps(almanac.maps, seed)).min();
    console.log("Part 1 solution: ", solution); 
};

const part2 = async () => {
    const file = await utils.loadFile('./input');
    const almanac = parseInput(file, true);

    let min = Number.MAX_SAFE_INTEGER;
    // This solution takes about 5 minutes to execute. There must be a more efficianet way to solve this.
    for (const seedRange of almanac.seeds) {
        for (let seed = seedRange.start; seed < seedRange.start + seedRange.length; seed++) {
            min = Math.min(min, resolveMaps(almanac.maps, seed));
        }
    }
    console.log("Part 2 solution: ", min); 
};

await part1();
await part2();