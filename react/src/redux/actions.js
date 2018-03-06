const actions = {
    user: {
        USER_LOGIN:    'USER_LOGIN',
        USER_SIGN_OUT: 'USER_SIGN_OUT'
    },
    posts: {
        POST_ADD_NEW:     'ADD_NEW_POST',
        POST_FILTER_USER: 'FILTER_POSTS_BY_USER'
    }
};

Object.freeze(actions);

export default actions;
