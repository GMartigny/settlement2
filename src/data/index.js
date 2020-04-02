import specials from "./specials";
import resources from "./resources";
import actions from "./actions";
import buildings from "./buildings";

const buildIndexes = (list) => {
    Object.keys(list).forEach(key => list[key].key = key);
};
buildIndexes(specials);
buildIndexes(resources);
buildIndexes(actions);
buildIndexes(buildings);

export {
    specials,
    resources,
    actions,
    buildings,
};
