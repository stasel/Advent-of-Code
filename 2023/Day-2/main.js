import * as utils from '../../utils/index.js'

const parseGameRound = (string) => {
    return string
        .split(', ')
        .map(pair => {
            const [number, color] = pair.split(' ');
            return { color, value: Number.parseInt(number) };
        });
};

const parseGame = (string) => {
    return string
        .split('; ')
        .map(parseGameRound);
};

const isValidGame = (gameInput, maxRed, maxGreen, maxBlue) => {
    return gameInput.every(round => {
        return round.every(pair => {
            if (pair.color === 'blue' && pair.value > maxBlue) {
                return false;
            }
            if (pair.color === 'red' && pair.value > maxRed) {
                return false;
            }
            if (pair.color === 'green' && pair.value > maxGreen) {
                return false;
            }
            return true;
        });
    });
}

const calcMinCubesForGame = (game) => {
    console.log(game);
    
    const reds = game.map(round => round.find(pair => pair.color === 'red')?.value ?? 0);
    const greens = game.map(round => round.find(pair => pair.color === 'green')?.value ?? 0);
    const blues = game.map(round => round.find(pair => pair.color === 'blue')?.value ?? 0);

    return {
        red: reds.max(),
        green: greens.max(),
        blue: blues.max()
    };
};

const parseGameFile = async () => { 
    const file = await utils.loadFile('./input');
    return  file.split("\n")
    .map(line => {
        const [gameHeader, gameData] = line.split(":");
        return { 
            id: Number.parseInt(gameHeader.replace(/Game (\d+)/,"$1")), 
            data: parseGame(gameData.trim())
        };
    });
};

const part1 = async () => {
    const [MAX_RED, MAX_GREEN, MAX_BLUE] = [12, 13, 14]
    const gameData = await parseGameFile();
    const validGames = gameData.filter(game => isValidGame(game.data, MAX_RED, MAX_GREEN, MAX_BLUE));
    const solution = validGames.map(game => game.id).sum();
        
    console.log("Part 1 solution: ", solution);
};

const part2 = async () => {
    const gameData = await parseGameFile();
    const solution = gameData
        .map(game => calcMinCubesForGame(game.data))
        .map(minCubes => minCubes.red * minCubes.green * minCubes.blue)
        .sum();

    console.log("Part 2 solution: ", solution);
};

await part1();
await part2();