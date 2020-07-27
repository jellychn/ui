import {store} from '../index';
import {
    REQUEST_ITEMS,
    RECIEVE_ITEMS_SUCCESS,
    RECIEVE_ITEMS_FAILURE,
    UPDATE_SEARCH_QUERY,
    CHANGE_CATEGORY,
    UPDATE_GENDER,
    CHANGE_SORT_BY,
    SET_ITEM_ARRAY_CHANGED_FALSE,
    REQUEST_SEARCH_ITEMS,
    RECIEVE_SEARCH_ITEMS_SUCCESS,
    RECIEVE_SEARCH_ITEMS_FAILURE,
    SET_TIMER,
    SET_QUERY_CHANGED,
    SET_SEARCH_ITEMS_LOADED
} from './actionTypes';
import axios from 'axios';

const requestItems = () => {
    return {type:REQUEST_ITEMS}
};

const recieveItemsSuccess = (data) => {
    return {
        type: RECIEVE_ITEMS_SUCCESS,
        data: data
    }
};

const recieveItemsFailure = error => {
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

        let params = {};
        if (store.getState().search.gender !== null) {
            params.gender = store.getState().search.gender;
        }

        if (store.getState().search.category !== 'all') {
            params.category = store.getState().search.category;
        }

        axios.get(url, {params}).then(res => {
            dispatch(recieveItemsSuccess(res.data));
            window.scrollTo(0,0);
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

const requestSearchItems = () => {
    return {
        type: REQUEST_SEARCH_ITEMS
    }
};

const recieveSearchItemsSuccess = data => {
    return {
        type: RECIEVE_SEARCH_ITEMS_SUCCESS,
        data: data
    }
};

const recieveSearchItemsFaliure = error => {
    return {
        type: RECIEVE_SEARCH_ITEMS_FAILURE,
        error: error
    }
};

export const getSearchItems = (reset) => {
    return dispatch => {
        if (reset) {
            dispatch(recieveSearchItemsSuccess([]));
        } else {
            dispatch(requestSearchItems());
            axios.get('http://localhost:4001/api/items?q=' + store.getState().search.q).then(res => {
                console.log(res.data)
                dispatch(recieveSearchItemsSuccess(res.data));
            }).catch(err => {
                dispatch(recieveSearchItemsFaliure(err));
            });
        }
    };
};

export const setTimer = (time) => {
    return {
        type: SET_TIMER,
        time: time
    }
};

export const setSearchItemLoaded = (bol) => {
    return {
        type: SET_SEARCH_ITEMS_LOADED,
        bol:bol
    }
};

export const setQueryChanged = (bol) => {
    return {
        type: SET_QUERY_CHANGED,
        bol:bol
    }
};