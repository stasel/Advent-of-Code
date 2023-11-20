import { assert } from 'console';
import * as fs from 'fs/promises';

async function loadData() {
    const fileContents = await fs.readFile("input", {'encoding': 'utf8'});
    return fileContents
        .split("\n")
        .map(line => {
            return line.split(" -> ")
                        .map(stringCoords => stringCoords.split(","))
        })
        .map(coords => {
            return { 
                x1: parseInt(coords[0][0]), 
                y1: parseInt(coords[0][1]), 
                x2: parseInt(coords[1][0]), 
                y2: parseInt(coords[1][1])
            }
        })
}

function createLine(x1,y1,x2,y2) {
    let line = [];
    const deltaX = Math.abs(x2-x1);
    const deltaY = Math.abs(y2-y1);
    const dirX = deltaX > 0 ? (x2-x1) / deltaX : 0; // 1 if going down, -1 if going up, 0 if it's the same
    const dirY = deltaY > 0 ? (y2-y1) / deltaY : 0; // same

    for(let i = 0; i <= Math.max(deltaX, deltaY); i++) {
        const x = x1 + i * dirX;
        const y = y1 + i * dirY;
        line.push({ x, y})
    }
    return line.sort((p1,p2) => p1.x - p2.x);
}

function calculateDiagram(data) {
    const diagram = data.map(d=> {return createLine(d.x1,d.y1,d.x2,d.y2) }).flat()    // Create lines from all points
        .reduce((res, point) => {  // Group all points and count the number of instances per point
            const key = `${point.x},${point.y}`;
            res[key] = res[key] === undefined ? 1 : res[key] + 1;
            return res;
        },{})

    return Object.entries(diagram).filter(pair => pair[1] > 1).length;
}

async function part1() {
    const data = await loadData();
    const filteredData = data.filter(d=> { return d.x1 === d.x2 || d.y1 === d.y2 })        // only points that are relevant for part1
    let result = calculateDiagram(filteredData);
    console.log(`Overlap points: ${result}`); // 5197
}

async function part2() {
    const data = await loadData();
    let result = calculateDiagram(data);
    console.log(`Overlap points: ${result}`); // 18605
}

await part1();
await part2();