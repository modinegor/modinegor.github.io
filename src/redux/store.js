import reducer from "./reducer";


const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

const store = createStore(reducer);

export default store;
