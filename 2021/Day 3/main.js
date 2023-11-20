import * as fs from 'fs/promises';

async function loadData() {
    const fileContents = await fs.readFile("input", {'encoding': 'utf8'});
    return fileContents.split("\n").map(line => line.split("") );
}

function getCounter(data) {
    const rowLength = data[0].length;
    // Initiaze counter array
    let counter = [];
    for (let i = 0; i < rowLength; i++) {
        counter.push({count0: 0, count1: 0});
    }

    for (const row of data) {
        for (let i = 0; i < row.length; i++) {
            if(row[i] === '0') {
                counter[i].count0++;
            }
            else if(row[i] === '1') {
                counter[i].count1++;
            }
        }
    }
    return counter;
}

async function part1() {
    const data = await loadData()
    const counter = getCounter(data);

    const gammaRate = counter.map(position =>  position.count0 > position.count1 ? '0' : '1').join('');
    const epsilonRate = counter.map(position =>  position.count0 <= position.count1 ? '0' : '1').join('');
    console.log(`Gamma rate = ${gammaRate} (${parseInt(gammaRate, 2)})`)
    console.log(`Epsilon rate = ${epsilonRate} (${parseInt(epsilonRate, 2)})`)
    console.log(`Total power consumption is ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}\n`)
}

async function part2() {
    const data = await loadData();
    let co2Data = [...data];
    let oxygenData = [...data];
    let position = 0;
    while(co2Data.length > 1) {
        const conterForPosition = getCounter(co2Data)[position];
        const leastCommonBit = conterForPosition.count0 <= conterForPosition.count1 ? '0' : '1';
        const filtered = co2Data.filter(row => row[position] === leastCommonBit);
        if(filtered.length == 0) {
            co2Data = [co2Data.at(-1)];
            break;
        }
        co2Data = filtered;
        position++;
    }

    position = 0;
    while(oxygenData.length > 1) {
        const conterForPosition = getCounter(oxygenData)[position];
        const mostCommonBit = conterForPosition.count0 > conterForPosition.count1 ? '0' : '1';
        const filtered = oxygenData.filter(row => row[position] === mostCommonBit);

        if(filtered.length == 0) {
            oxygenData = [oxygenData.at(-1)];
            break;
        }
        oxygenData = filtered;
        position++;
    }

    const co2Rating = parseInt(co2Data[0].join(''), 2);
    const oxygenRating = parseInt(oxygenData[0].join(''), 2);

    const lifeSupportRating = co2Rating * oxygenRating;
    console.log(`co2 Rating = ${co2Rating}`, `Oxygen Rating = ${oxygenRating}`);
    console.log(`Life support Rating = ${lifeSupportRating}`);
}


await part1();
await part2();
