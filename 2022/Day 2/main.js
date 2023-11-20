import * as utils from '../../utils/index.js'

const SCORE_DRAW = 3
const SCORE_WIN = 6
const SCORE_LOST = 0

const scoreTable = {
    'A': { 'X': SCORE_DRAW, 'Y': SCORE_WIN, 'Z': SCORE_LOST },
    'B': { 'X': SCORE_LOST, 'Y': SCORE_DRAW, 'Z': SCORE_WIN },
    'C': { 'X': SCORE_WIN, 'Y': SCORE_LOST, 'Z': SCORE_DRAW },
};

const shapeBonus = { 'X': 1, 'Y': 2, 'Z': 3 }

const guide = (await utils.loadFile('input'))
    .split(/\n/)
    .map(x => x.split(' '));

async function part1() {
    console.log(calculateScores(guide));
}

async function part2() {
    const replaceMap = {
        'A': { 
            'X': 'Z', 
            'Y': 'X', 
            'Z': 'Y' 
        },
        'B': { 
            'X': 'X', 
            'Y': 'Y', 
            'Z': 'Z'
         },
        'C': { 
            'X': 'Y',
            'Y': 'Z',
            'Z': 'X'
        },
    };
    const adjustedGuide = guide.map(round => {
        const [opponent, player] = round
        return [opponent, replaceMap[opponent][player]]
    });

    console.log(calculateScores(adjustedGuide));
}

function calculateScores(guide) {
    return guide.map(round => { 
        const [opponent, player] = round
        return scoreTable[opponent][player] + shapeBonus[player]
    }).sum();
}

await part1();
await part2();