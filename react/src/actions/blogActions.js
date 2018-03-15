import * as actionsTypes from './actionTypes'


export const addNewPost = post => {
    return {
        type: actionsTypes.POST_ADD_NEW,
        post
    }
};

export const editPost = post => {
    return {
        type: actionsTypes.POST_EDIT,
        _id: post._id,
        post
    }
};

export const removePost = post => {
    return {
        type: actionsTypes.POST_REMOVE,
        _id: post._id
    }
};

export const initData = data => {
    return {
        type: actionsTypes.POST_DATA_INIT,
        data
    }
};
