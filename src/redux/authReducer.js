import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: null,
    password: undefined
}

const authReducer = (state
                    ,action) => {
    switch (action.type){
        case ACTIONS.LOGOUT_SUCCESS : {
            return defaultState;
        }
        case ACTIONS.LOGIN_SUCCESS : {
            return {isLoggedIn:true, ...action.payload}
        }
        default: {
            return defaultState;
        }
    }

}

export default authReducer;