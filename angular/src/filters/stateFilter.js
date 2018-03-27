const stateFilter = () => {
    return (items, state) => {
        if (state.active) {
            return items.filter(task => !task.completed);
        }
        else if (state.completed) {
            return items.filter(task => task.completed);
        }

        return items;
    }
};

export default stateFilter;
