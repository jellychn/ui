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
} from './actionTypes';
import axios from 'axios';
import {getCart} from './cartActions';

export const authenticatePage = (page) => {
    return {
        type: AUTHENTICATE_PAGE,
        page: page
    }
};

export const authenticate = (bol, logout) => {
    return {
        type: AUTHENTICATE,
        authenticate: bol,
        logout: logout
    }
};

export const authenticateTriggered = (bol) => {
    return {
        type: AUTHENTICATE_TRIGGERED,
        bol: bol
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
            axios.post('http://localhost:4001/api/users/authenticated', {}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                dispatch(requestAuthenticatedSuccess());
                dispatch(getUser());
                dispatch(getCart());
            }).catch(err => {
                dispatch(requestAuthenticatedFaliure());
                dispatch(getCart());
            });
        } else {
            dispatch(requestAuthenticatedFaliure());
            dispatch(getCart());
        }
    }
};

const getUserRequest = () => {
    return {type: GET_USER_REQUEST}
};

const getUserSuccess = (user) => {
    return {
        type: GET_USER_SUCCESS,
        user: user
    }
};

const getUserFailure = () => {
    return {
        type: GET_USER_FAILURE
    }
};

export const getUser = () => {
    return dispatch => {
        dispatch(getUserRequest);
        const token = window.localStorage.getItem('token');
        if (token !== null || token !== undefined || token !== '') {
            axios.post('http://localhost:4001/api/users/user', {'token':token}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                dispatch(getUserSuccess(res.data));
            }).catch(error => {
                dispatch(getUserFailure())
            });
        } else {
            dispatch(getUserFailure())
        }
    }
};