import * as utils from '../../utils/index.js'

const parseNumberData = (numberData) => {
    return new Set(numberData.trim().split(/ +/).map(el => Number.parseInt(el)));
};

const parseScratchCard = (stringLine) => {
    const [header, data] = stringLine.split(':');
    const cardNumber = Number.parseInt(header.replace("Card ",""));
    const [winningNumbers, givenNumbers] = data.split(' | ').map(parseNumberData);
    return { 
        number: cardNumber, 
        winningNumbers, givenNumbers,
        numberOfMatches: winningNumbers.intersect(givenNumbers).size 
    };
};

const calculateTotalCardsWon = (card, allCards, cache) => {
    if(cache[card.number]) {
        return cache[card.number];
    }
    let cardWonCount = 0;
    cardWonCount += card.numberOfMatches;
    const wonCards = allCards.slice(card.number, card.number + card.numberOfMatches);
    for (const newCard of wonCards) {
        cardWonCount += calculateTotalCardsWon(newCard, allCards, cache);
    }
    cache[card.number] = cardWonCount;
    return cardWonCount;
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const scratchCards = file.split('\n').map(parseScratchCard);
    const solution = scratchCards
        .filter(card => card.numberOfMatches > 0)
        .map(card => 2 ** (card.numberOfMatches - 1))
        .sum();
    
    console.log("Part 1 solution: ", solution); 
};

const part2 = async () => {
    const file = await utils.loadFile('./input');
    let cache = {};
    const scratchCards = file.split('\n').map(parseScratchCard)
    const solution = scratchCards
        .map(card => calculateTotalCardsWon(card, scratchCards, cache))
        .sum() + scratchCards.length;

    console.log("Part 2 solution: ", solution);
};

await part1();
await part2();