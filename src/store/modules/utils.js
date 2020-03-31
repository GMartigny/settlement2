const getIndexByName = list => name => list.findIndex(item => item.name === name);

const getByIndex = list => index => list[index];

export {
    getIndexByName,
    getByIndex,
};
