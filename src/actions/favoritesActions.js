import {store} from '../index';
import axios from 'axios';
import {
    CHECK_FAVORITES_HAS_ITEMS,
    REQUEST_USER_FAVORITES,
    REQUEST_USER_FAVORITES_SUCCESS,
    REQUEST_USER_FAVORITES_FAILURE,
    FAVORITED
} from './actionTypes';


export const checkFavoritesHasItems = () => {
    let favorites = store.getState().favorites.favorites;
    let hasItems = false;
    if (favorites.length > 0) {
        hasItems = true;
    }
    return {
        type: CHECK_FAVORITES_HAS_ITEMS,
        hasItems: hasItems
    }
};

const requestFavorites = () => {
    return {type: REQUEST_USER_FAVORITES}
};

const requestFavoritesSuccess = (favorites) => {
    return {
        type: REQUEST_USER_FAVORITES_SUCCESS,
        favorites: favorites
    }
};

const requestFavoritesFailure = () => {
    return {
        type: REQUEST_USER_FAVORITES_FAILURE
    }
};

export const getFavorites = () => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }
    return dispatch => {
        dispatch(requestFavorites());
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/user', {'token':token}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                if (res.status === 200) {
                    dispatch(requestFavoritesSuccess(res.data.favorites));
                    dispatch(checkFavoritesHasItems());
                } else {
                    dispatch(requestFavoritesSuccess(JSON.parse(localStorage.getItem('favorites'))));
                    dispatch(checkFavoritesHasItems());
                }
            }).catch(err => {
                dispatch(requestFavoritesFailure());
                dispatch(checkFavoritesHasItems());
            });
        } else {
            dispatch(requestFavoritesSuccess(JSON.parse(localStorage.getItem('favorites'))));
            dispatch(checkFavoritesHasItems());
        }
    }
};

export const updateFavorites = (favorites) => {
    return dispatch => {
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/updateFavorites', {favorites:favorites}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(() => {});
            dispatch(checkFavoritesHasItems());
        } else {
            localStorage.setItem('favorites', JSON.stringify(favorites));
            dispatch(checkFavoritesHasItems());
        }
    }
};

export const checkFavorited = (color, item) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]))
    }
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    let inFavorites = false;

    for (let i=0;i<favorites.length;i++) {
        if (item._id === favorites[i]._id && favorites[i].color === color) {
            inFavorites = true;
            break;
        }
    }

    return inFavorites;
};

export const favorited = (color, item) => {
    const favorited = checkFavorited(color, item)
    return {
        type: FAVORITED,
        favorited: favorited,
        color: color
    }
};

