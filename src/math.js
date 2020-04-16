const { sin, floor } = Math;

/**
 * Valid mathematical modulo operation
 * @param {Number} value - Value to apply modulo on
 * @param {Number} divisor - Modulo divisor
 * @return {Number}
 */
const modulo = (value, divisor) => {
    const remainder = value % divisor;
    return !value || Math.sign(value) === Math.sign(divisor) ? remainder : remainder + divisor;
};

// TODO: Allow user defined seed and seed export
const seed = 1337;
/**
 * Seeded random
 * @param {Array} range - Limits of the random ([min, max[)
 * @return {Number}
 */
const random = (
    // eslint-disable-next-line no-param-reassign
    s => ([min = 0, max = 1] = []) => modulo(sin(++s), (max - min)) + min
)(seed);

/**
 * Select a random item in an array
 * @param {Array} array - Any array
 * @return {*}
 */
const pick = array => array[floor(random() * array.length)];

/**
 * Select an item in an array while taking drop rate into account
 * @param {Array} array - Any array of items with a "dropRate" property
 * @return {*}
 */
const select = (array) => {
    // Keep only item with dropRate and sort them higher to lower
    const possibilities = array
        .filter(({ dropRate }) => dropRate > 0)
        .sort(({ dropRate: a }, { dropRate: b }) => b - a);
    // Compute sum of drop rates
    const dropRateScale = [];
    const dropRateSum = possibilities.reduce((acc, { dropRate = 0 }) => {
        const sum = acc + dropRate;
        dropRateScale.push(sum);
        return sum;
    }, 0);
    const selected = random([0, dropRateSum]);
    const index = dropRateScale.findIndex(value => selected < value);
    return possibilities[index];
};

/**
 * Select multiple item in an array taking drop rate into account
 * @param {Array} max - Total maximum of item
 * @param {Array} array - Array of items with a "dropRate" property
 */
const selectMultiple = ([min = 0, max = 1], array) => {

};

export {
    modulo,
    random,
    pick,
    select,
    selectMultiple,
};
