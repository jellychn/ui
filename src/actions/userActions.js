import {
    AUTHENTICATE_PAGE,
    AUTHENTICATE,
    REQUEST_AUTHENTICATED,
    REQUEST_AUTHENTICATED_SUCCESS,
    REQUEST_AUTHENTICATED_FALIURE
} from './actionTypes';
import axios from 'axios';

export const authenticatePage = (page) => {
    return {
        type: AUTHENTICATE_PAGE,
        page: page
    }
};

export const authenticate = (bol) => {
    return {
        type: AUTHENTICATE,
        authenticate: bol
    }
};

const requestAuthenticated = () => {
    return {type: REQUEST_AUTHENTICATED}
};

const requestAuthenticatedSuccess = () => {
    return {
        type: REQUEST_AUTHENTICATED_SUCCESS
    }
};

const requestAuthenticatedFaliure = () => {
    return {
        type: REQUEST_AUTHENTICATED_FALIURE
    }
};

export const checkAuthenticated = () => {
    return dispatch => {
        dispatch(requestAuthenticated());
        const token = window.localStorage.getItem('token');
        if (token !== null || token !== undefined || token !== '') {
            axios.post('http://localhost:4001/api/users/authenticated', {}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(() => {
                dispatch(requestAuthenticatedSuccess());
            }).catch(err => {
                dispatch(requestAuthenticatedFaliure());
            });
        } else {
            dispatch(requestAuthenticatedFaliure());
        }
    }
};