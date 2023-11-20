import * as fs from 'fs/promises';

async function loadData() {
    const fileContents = await fs.readFile("input", {'encoding': 'utf8'});
    return fileContents.split("\n").map(s=>parseInt(s));
}

async function part1() {
    const data = await loadData()

    let increases = 0;
    for(let i = 1; i< data.length; i++) {
        if(data[i] > data[i-1]) {
            increases++;
        }
    }
    console.log(`Total of ${increases} increases`);
}

async function part2() {
    const data = await loadData()

    let increases = 0;
    for(let i = 3; i< data.length; i++) {
        let sumA = data[i-1] + data[i-2] + data[i-3];
        let sumB = data[i] + data[i-1] + data[i-2];
        if(sumB > sumA) {
            increases++;
        }
    }
    console.log(`Total of ${increases} increases`);
}

await part1();
await part2();
