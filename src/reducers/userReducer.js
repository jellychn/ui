import {
    AUTHENTICATE_PAGE,
    AUTHENTICATE,
    REQUEST_AUTHENTICATED,
    REQUEST_AUTHENTICATED_SUCCESS,
    REQUEST_AUTHENTICATED_FALIURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    AUTHENTICATE_TRIGGERED
} from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    authenticateTriggered: true,
    page: 'login',
    request: false,
    requestUser: false,
    user: null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_PAGE:
            return {
                ...state,
                page: action.page
            }
        case AUTHENTICATE:
            if (action.logout) {
                return {
                    ...state,
                    authenticated: action.authenticate,
                    user: null
                }
            } else {
                return {
                    ...state,
                    authenticated: action.authenticate
                }
            }
        case AUTHENTICATE_TRIGGERED:
            return {
                ...state,
                authenticateTriggered: action.bol
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
                authenticated: false,
                user: null
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                requestUser: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                requestUser: false,
                user: action.user
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                requestUser: false
            }
        default: return state
    }
};

export default reducer;