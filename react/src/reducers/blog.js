import * as actionTypes from '../actions/actionTypes'


const blog = (state = [], action) => {
    switch (action.type) {
        case actionTypes.POST_DATA_INIT:
            return action.data;
        case actionTypes.POST_ADD_NEW:
            return [...state, action.post];
        case actionTypes.POST_REMOVE:
            return state;
        case actionTypes.POST_EDIT:
            return state;
        default:
            return state;
    }
};

export default blog;
