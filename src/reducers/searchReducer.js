import {
    REQUEST_ITEMS,
    RECIEVE_ITEMS_SUCCESS,
    RECIEVE_ITEMS_FAILURE,
    CHANGE_CATEGORY
} from '../actions/actionTypes';

const inittialState = {
    catergory: 'all',
    catergoryChange: false,
    items: [],
    loading: false,
    error: null,
    search: ''
};

const reducer = (state=inittialState, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                catergory: action.catergory
            }
        case REQUEST_ITEMS:
            return {
                ...state,
                loading: true
            }
        case RECIEVE_ITEMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case RECIEVE_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.data,
                error: null
            }
        default: return state;
    }
}

export default reducer;