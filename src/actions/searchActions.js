import {store} from '../index';
import {
    REQUEST_ITEMS,
    RECIEVE_ITEMS_SUCCESS,
    RECIEVE_ITEMS_FAILURE,
    UPDATE_SEARCH_QUERY,
    CHANGE_CATEGORY,
    UPDATE_GENDER,
    CHANGE_SORT_BY,
    SET_ITEM_ARRAY_CHANGED_FALSE
} from './actionTypes';
import axios from 'axios';

export const requestItems = () => {
    return {type:REQUEST_ITEMS}
};

export const recieveItemsSuccess = (data) => {
    return {
        type: RECIEVE_ITEMS_SUCCESS,
        data: data
    }
};

export const recieveItemsFailure = error => {
    return {
        type: RECIEVE_ITEMS_FAILURE,
        error: error
    }
};

export const getItems = () => {
   return (dispatch) => {
        dispatch(requestItems());
        let url ='';
        if (store.getState().search.q === undefined || store.getState().search.q === null || store.getState().search.q === '') {
            url = 'http://localhost:4001/api/items';
        } else {
            url = 'http://localhost:4001/api/items?q=' + store.getState().search.q;
        }
        axios.get(url, {params: {gender:store.getState().search.gender, catergory: store.getState().search.catergory}}).then(res => {
            dispatch(recieveItemsSuccess(res.data));
        }).catch(err => {
            dispatch(recieveItemsFailure(err));
        });
    }
};

export const updateSearchQuery = (q) => {
    return {
        type: UPDATE_SEARCH_QUERY,
        q: q
    }
};

export const changeCategory = (category) => {
    return {
        type: CHANGE_CATEGORY,
        category: category
    }
};

export const updateGender = (gender) => {
    return {
        type: UPDATE_GENDER,
        gender: gender
    }
};

export const changeSortBy = (sortBy) => {
    return {
        type: CHANGE_SORT_BY,
        sortBy: sortBy
    }
};

export const setItemArrayChangedFalse = () => {
    return {
        type: SET_ITEM_ARRAY_CHANGED_FALSE
    }
};