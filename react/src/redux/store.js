import reducer from "./reducer";


let instance;

export default class Store {
    constructor() {
        if (instance)
            return instance;

        this.state = reducer();
        this.listeners = new Map();

        instance = this;
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        const listeners = this.listeners.get(action.type);

        if (listeners !== undefined) {
            this.state = reducer(this.state, action);
            listeners.forEach(listener => listener());
        }
    };

    subscribe(listener, action) {
        if (action in this.listeners)
            this.listeners.set(action, [...this.listeners.get(action), listener]);
        else
            this.listeners.set(action, [listener]);
    };
}
