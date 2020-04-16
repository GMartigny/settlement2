import specials from "./specials";
import resources from "./resources";
import actions from "./actions";
import buildings from "./buildings";
import locations from "./locations";

const buildIndexes = (list) => {
    Object.keys(list).forEach(key => list[key].key = key);
};
buildIndexes(specials);
buildIndexes(resources);
buildIndexes(actions);
buildIndexes(buildings);
buildIndexes(locations);

export {
    specials,
    resources,
    actions,
    buildings,
    locations,
};
