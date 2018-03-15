import * as actionTypes from '../actions/actionTypes'


const user = (state = null, action) => {
    switch (action.type) {
        case actionTypes.USER_SING_IN:
            return action.user;
        case actionTypes.USER_LOG_OUT:
            return null;
        default:
            return state;
    }
};

export default user;