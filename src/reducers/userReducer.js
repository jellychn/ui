import {
    AUTHENTICATE_PAGE,
    AUTHENTICATE,
    REQUEST_AUTHENTICATED,
    REQUEST_AUTHENTICATED_SUCCESS,
    REQUEST_AUTHENTICATED_FALIURE
} from '../actions/actionTypes';

const initialState = {
    user: {},
    authenticated: false,
    page: 'login',
    request: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_PAGE:
            return {
                ...state,
                page: action.page
            }
        case AUTHENTICATE:
            return {
                ...state,
                authenticated: action.authenticate
            }
        case REQUEST_AUTHENTICATED:
            return {
                ...state,
                request: true
            }
        case REQUEST_AUTHENTICATED_SUCCESS:
            return {
                ...state,
                request: false,
                authenticated: true
            }
        case REQUEST_AUTHENTICATED_FALIURE:
            return {
                ...state,
                request: false,
                authenticated: false
            }
        default: return state
    }
};

export default reducer;