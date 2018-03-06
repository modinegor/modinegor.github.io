import actions from "./actions";

const defaultState = {
    posts: [],
    user: null,
    filtered: false
};

let id = 0;

const reducer = (state = defaultState, action) => {
    let new_state = {
        user: state.user,
        filtered: state.filtered,
        posts: []
    };

    for (let post of state.posts)
        new_state.posts.push({...post})

    if (!action)
        return new_state;

    switch (action.type) {
        case actions.user.USER_LOGIN:
            new_state.user = action.user;
            break;
        case actions.user.USER_SIGN_OUT:
            new_state.user = null;
            break;
        case actions.posts.POST_ADD_NEW:
            new_state.posts.push({
                text: action.post,
                user: new_state.user,
                id: id,
                date: action.date
            });
            id += 1;
            break;
        case actions.posts.POST_FILTER_USER:
            if (!state.filtered)
                new_state.filtered = action.user;
            else
                new_state.filtered = false;
            break;
    }

    return new_state;
};

export default reducer;