const { sin, floor } = Math;

const modulo = (value, divisor) => {
    const remainder = value % divisor;
    return !value || Math.sign(value) === Math.sign(divisor) ? remainder : remainder + divisor;
};

let seed = 1337;
const random = (max = 1) => modulo(sin(seed++), max);

const pick = array => array[floor(random() * array.length)];

const select = (array) => {
    array.sort(({ dropRate: a }, { dropRate: b }) => b - a);
    const dropRateScale = [];
    const dropRateSum = array.reduce((acc, { dropRate = 0 }) => {
        dropRateScale.push(acc);
        return acc + dropRate;
    }, 0);
    const selected = random(dropRateSum);
    const index = dropRateScale.findIndex(value => value > selected);
    return array[index];
};

export {
    modulo,
    random,
    pick,
    select,
};
