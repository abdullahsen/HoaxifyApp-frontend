import {createStore} from "redux";
import authReducer from "./authReducer";


const configureStore = () => {

    const HOAX_AUTH = 'hoax-auth';

    const hoaxAuth = localStorage.getItem(HOAX_AUTH);

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        try {
            stateInLocalStorage = JSON.parse(hoaxAuth);
        } catch (error) {}
    }

    const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.subscribe(() => {
        localStorage.setItem(HOAX_AUTH, JSON.stringify(store.getState()));
    });

    return store;

}

export default configureStore;