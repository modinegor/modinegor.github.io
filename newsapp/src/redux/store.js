import reducer from "./reducer";


let instance;

export default class createStore {
    constructor() {
        if (instance)
            return instance;

        this.state = reducer();
        this.listeners = [];

        instance = this;
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = reducer(this.state, action);
        this.listeners.forEach(listener => listener());
    };

    subscribe(listener) {
        this.listeners.push(listener);
    };
}
