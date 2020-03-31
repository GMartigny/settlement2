const now = () => performance.now();

const { add, remove, get, all } = (() => {
    const timers = new Map();
    return {
        add: (id, item) => timers.set(id, item),
        remove: id => timers.delete(id),
        get: id => timers.get(id),
        all: callback => [...timers.keys()].forEach(callback),
    };
})();

const wait = (callback, time = 0) => {
    const wrapper = () => {
        // necessary evil
        // eslint-disable-next-line no-use-before-define
        remove(id);
        callback();
    };
    const id = setTimeout(wrapper, time);
    add(id, {
        id,
        wrapper,
        time,
        start: now(),
        remains: time,
    });
    return id;
};

const cancel = (id) => {
    if (id) {
        const timer = get(id);
        clearTimeout(timer.id);
        remove(id);
    }
};

const pause = (id) => {
    const timer = get(id);
    clearTimeout(timer.id);
    timer.remains = timer.time - (now() - timer.start);
};

const restart = (id) => {
    const timer = get(id);
    timer.id = setTimeout(timer.wrapper, timer.remains);
    timer.time = timer.remains;
    timer.start = now();
};

const pauseAll = () => {
    all(id => pause(id));
};

const restartAll = () => {
    all(id => restart(id));
};

export {
    wait,
    cancel,
    pause,
    restart,
    pauseAll,
    restartAll,
};
