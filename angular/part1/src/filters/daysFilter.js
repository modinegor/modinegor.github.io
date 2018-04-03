const daysFilter = () => {
    let today = Date.now();

    return (items, daysCount) => {
        if (daysCount === 0)
            return items;

        let diff = daysCount * 1000 * 60 * 60 * 24;

        return items.filter(item => {
            return today - item.opened.row <= diff;
        })
    }
};

export default daysFilter;
