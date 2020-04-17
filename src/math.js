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
const seed = "Settlement";
/**
 * Seeded random
 * @param {Array} range - Limits of the random ([min, max[)
 * @return {Number}
 */
const random = ((str) => {
    const { MAX_SAFE_INTEGER } = Number;
    let s = [...btoa(`s${str}`)].reduce(
        (acc, char, i) => (acc + (char.charCodeAt(0) * (10 ** i))) % MAX_SAFE_INTEGER,
        0,
    );
    return ([min = 0, max = 1] = []) => {
        s = (s + 1) % MAX_SAFE_INTEGER;
        return (modulo(sin(s) * 1e5, 1) * (max - min)) + min;
    };
})(seed);

/**
 * Select a random item in an array
 * @param {Array} array - Any array
 * @return {*}
 */
const pick = array => array[floor(random() * array.length)];

/**
 * @typedef {Object} Resource
 * @prop {String} key
 * @prop {Number} dropRate
 */
/**
 * Select an item in an array while taking drop rate into account
 * @param {Array<Resource>} array - Any array of items with a "dropRate" property
 * @return {Resource}
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
 * @param {Array<Number>} span - Total maximum of item
 * @param {Array<Resource>} array - Array of items with a "dropRate" property
 * @return {Array<[Number, String]>}
 */
const selectMultiple = (span, array) => {
    const total = Math.round(random(span));
    const result = {};
    for (let i = 0; i < total; ++i) {
        const { key } = select(array);
        if (result[key]) {
            result[key]++;
        }
        else {
            result[key] = 1;
        }
    }

    return Object.keys(result).map(key => [result[key], key]);
};

export {
    modulo,
    random,
    pick,
    select,
    selectMultiple,
};
