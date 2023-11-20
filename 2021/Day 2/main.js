import * as fs from 'fs/promises';

async function loadData() {
    const fileContents = await fs.readFile("input", {'encoding': 'utf8'});
    return fileContents.split("\n").map(line => {
        const [direction, units] = line.split(" ");
        return { direction, units: parseInt(units)}
    });
}

async function part1() {
    const data = await loadData()
    let depth = 0;
    let horizontalPosition = 0;
    for (const command of data) {
        if (command.direction === 'forward') {
            horizontalPosition += command.units;
        }
        else if (command.direction === 'up') {
            depth -= command.units;
        }
        else if (command.direction === 'down') {
            depth += command.units;
        }
    }

    console.log(`Final Depth = ${depth}, Final Horizontal Position: ${horizontalPosition}. Result = ${depth * horizontalPosition}`)
}

async function part2() {
    const data = await loadData()
    let aim = 0;
    let depth = 0;
    let horizontalPosition = 0;
    for (const command of data) {
        if (command.direction === 'forward') {
            horizontalPosition += command.units;
            depth += aim * command.units;
        }
        else if (command.direction === 'up') {
            aim -= command.units;
        }
        else if (command.direction === 'down') {
            aim += command.units;
        }
    }

    console.log(`Final Depth = ${depth}, Final Horizontal Position: ${horizontalPosition}. Result = ${depth * horizontalPosition}`)
}

await part1();
await part2();