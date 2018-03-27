const toDoSorting = () => {
    return (items, criteria) => {
        let {field, order} = criteria;

        switch (field) {
            case null:
                return items;
            case 'index':
                return items.sort((a, b) => {
                    if (a.id > b.id) return order ? 1 : -1;
                    if (a.id < b.id) return order ? -1 : 1;
                    return 0;
                });
            case 'title':
                return items.sort((a, b) => {
                    if (a.title > b.title) return order ? 1 : -1;
                    if (a.title < b.title) return order ? -1 : 1;
                    return 0;
                });
            case 'date.opened':
                return items.sort((a, b) => {
                    if (a.opened.row > b.opened.row) return order ? 1 : -1;
                    if (a.opened.row < b.opened.row) return order ? -1 : 1;
                    return 0;
                });
            case 'date.closed':
                return items.sort((a, b) => {
                    if (a.closed.row > b.closed.row) return order ? 1 : -1;
                    if (a.closed.row < b.closed.row) return order ? -1 : 1;
                    return 0;
                });
        }
    }
};

export default toDoSorting;
