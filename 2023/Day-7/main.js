import * as utils from '../../utils/index.js'

const parseInput = (input) => {
    return input.split('\n')
        .map(line => line.split(' '))
        .map(([hand, bid]) => { return {hand, bid} });
};

const handStrength = (hand) => {
    const analysis = {};
    for(const card of hand.split('')){
        if(!analysis[card]) { 
            analysis[card] = 0; 
        }
        analysis[card]++;
    }
    const values = Object.values(analysis);
    if(values.includes(5)) {
        // Five of a kind
        return 7;
    }
    if(values.includes(4)) {
        // Four of a kind
        return 6;
    }
    if(values.includes(3) && values.includes(2)) {
        // Full house
        return 5;
    }
    if(values.includes(3)) {
        // Three of a kind
        return 4;
    }
    if(values.filter(v => v === 2).length === 2) {
        // Two Pair
        return 3;
    }
    if(values.includes(2)) {
        // Pair
        return 2;
    }
    return 1;
};

const strengthTieBreaker = (hand1, hand2) => {
    const ranks = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
    const hand1Cards = hand1.split('');
    const hand2Cards = hand2.split('');
    for (let i = 0; i < hand1Cards.length; i++) {
        const card1 = hand1Cards[i];
        const card2 = hand2Cards[i];
        if(ranks.indexOf(card1) > ranks.indexOf(card2)) {
            return 1;
        }
        if(ranks.indexOf(card1) < ranks.indexOf(card2)) {
            return -1;
        }
    }
    return 0;
};

const compareHands = (hand1, hand2) => {
    const strength1 = handStrength(hand1);
    const strength2 = handStrength(hand2);
    if(strength1 > strength2) {
        return 1;
    }
    if(strength1 < strength2) {
        return -1;
    }
    return strengthTieBreaker(hand1, hand2);
};

const part1 = async () => {
    const file = await utils.loadFile('./input');
    const hands = parseInput(file);
    const solution = hands
        .toSorted((h1,h2) => compareHands(h1.hand, h2.hand))
        .map((hand,index) => hand.bid * (index + 1))
        .sum();
    console.log("Part 1 solution: ", solution); 
};

const part2 = async () => {
    console.log("Part 2 solution: ", 0); 
};

await part1();
await part2();