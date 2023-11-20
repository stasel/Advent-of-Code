import * as utils from '../../utils/index.js'

async function part1() {
    const result = (await utils.loadFile("input"))
        .split("\n")
        .map(splitStringIntoHalfs)
        .map(halfs => {
            const h1 = new Set(halfs[0]);
            const h2 = new Set(halfs[1]);
            return h1.intersect(h2).values().next().value;
        })
        .map(getLetterPriority)
        .sum();

    console.log(result)
}

async function part2() {
    const result = (await utils.loadFile("input"))
        .split("\n")
        // Split into groups of three:
        .reduce((accArray, str, index, all) => {
            if (index % 3 === 0) {
                accArray.push([all[index], all[index + 1], all[index + 2]])
            }
            return accArray;
        }, [])
        .map(group => [new Set(group[0]), new Set(group[1]), new Set(group[2])])
        .map(group => group[0].intersect(group[1]).intersect(group[2]).values().next().value)
        .map(getLetterPriority)
        .sum()
    console.log(result)
}

function splitStringIntoHalfs(string) {
    const part1 = string.substring(0, string.length/2);
    const part2 = string.substring(string.length/2)
    return [part1, part2]
}

// Returns object that for each letter specifies which part(s) of the string it can be found
function buildLetterIndex(str1, str2) {
    let index = {};
    for(let char of str1) {
        index[char] = { left: true }
    }
    for(let char of str2) {
        index[char] = index[char] || {}
        index[char].right = true;
    }
    return index;
}

function getLetterPriority(char) {
    const isLowerCase = char === char.toLowerCase();
    const charCode = char.charCodeAt(0);
    const diff = isLowerCase ? 96 : 38
    return charCode - diff;
}

await part1();
await part2();
