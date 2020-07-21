import {
    REQUEST_ITEMS,
    RECIEVE_ITEMS_SUCCESS,
    RECIEVE_ITEMS_FAILURE,
    UPDATE_SEARCH_QUERY,
    CHANGE_CATEGORY,
    UPDATE_GENDER,
    CHANGE_SORT_BY,
    SET_ITEM_ARRAY_CHANGED_FALSE
} from '../actions/actionTypes';

const inittialState = {
    category: 'all',
    items: [],
    loading: false,
    loaded: false,
    error: null,
    q: '',
    gender: 'women',
    sortBy: 'low price',
    itemArrayChanged: false
};

const reducer = (state=inittialState, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case REQUEST_ITEMS:
            return {
                ...state,
                loading: true,
                loaded: false
            }
        case RECIEVE_ITEMS_FAILURE:
            return {
                ...state,
                loaded: true,
                loading: false,
                error: action.error
            }
        case RECIEVE_ITEMS_SUCCESS:
            return {
                ...state,
                loaded: true,
                loading: false,
                items: action.data,
                error: null,
                itemArrayChanged: true
            }
        case UPDATE_SEARCH_QUERY:
            return {
                ...state,
                q: action.q
            }
        case UPDATE_GENDER:
            return {
                ...state,
                gender: action.gender
            }
        case CHANGE_SORT_BY:
            return {
                ...state,
                sortBy: action.sortBy,
                itemArrayChanged: true
            }
        case SET_ITEM_ARRAY_CHANGED_FALSE:
            return {
                ...state,
                itemArrayChanged: false
            }
        default: return state;
    }
}

export default reducer;