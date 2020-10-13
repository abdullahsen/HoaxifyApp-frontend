import * as ACTIONS from './Constants';

export const logoutSuccess = () =>{
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
};

export const loginSuccess = (payload) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload
    };
};