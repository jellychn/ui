import {
    LOGIN_REGISTER
} from '../actions/actionTypes';

const initialState = {
    user: {},
    authenticated: false,
    login: true
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_REGISTER:
            return {
                ...state,
                login: action.bol
            }
        default: return state
    }
};

export default reducer;