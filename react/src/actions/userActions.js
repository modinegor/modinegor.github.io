import * as actionTypes from './actionTypes'


export const userSingIn = user => {
    return {
        type: actionTypes.USER_SING_IN,
        user
    }
};

export const userLogOut = () => {
    return {
        type: actionTypes.USER_LOG_OUT
    }
};
