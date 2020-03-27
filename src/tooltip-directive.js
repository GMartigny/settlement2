const show = (value, data) => () => {
    value.$store.dispatch("tooltip/show", data);
};
const move = value => ({ clientX: x, clientY: y }) => {
    value.$store.dispatch("tooltip/move", {
        x,
        y,
    });
};
const hide = value => () => {
    value.$store.dispatch("tooltip/hide");
};

export default (() => {
    // Store element => listener relation
    const state = new WeakMap();

    return {
        inserted (element, { value }) {
            // Extract needed data
            const { data } = value;

            // Set listeners
            const listeners = {
                mouseover: show(value, data),
                mousemove: move(value),
                mouseleave: hide(value),
            };
            element.addEventListener("mouseover", listeners.mouseover);
            element.addEventListener("mousemove", listeners.mousemove);
            element.addEventListener("mouseleave", listeners.mouseleave);

            // Register listeners
            state.set(element, listeners);
        },

        unbind (element) {
            // Clean listeners
            const { mouseover, mousemove, mouseleave } = state.get(element);
            element.removeEventListener("mouseover", mouseover);
            element.removeEventListener("mousemove", mousemove);
            element.removeEventListener("mouseleave", mouseleave);

            // Remove relation
            state.delete(element);
        },
    };
})();
