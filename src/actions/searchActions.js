import {
    REQUEST_ITEMS,
    RECIEVE_ITEMS_SUCCESS,
    RECIEVE_ITEMS_FAILURE,
    CHANGE_CATEGORY
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

        axios.get('http://localhost:4001/api/items').then(res => {
            dispatch(recieveItemsSuccess(res.data));
        }).catch(err => {
            dispatch(recieveItemsFailure(err));
        });
    }
};

export const changeCategory = (catergory) => {
    return {
        type: CHANGE_CATEGORY,
        category: catergory
    }
};