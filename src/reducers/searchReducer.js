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
} from '../actions/actionTypes';

const inittialState = {
    category: 'all',
    items: [],
    loading: false,
    loaded: false,
    error: null,
    q: '',
    gender: null,
    sortBy: 'low price',
    itemArrayChanged: false,
    searchItems: [],
    timer: 0,
    searchItemsloaded: true,
    queryChanged: false
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
        case REQUEST_SEARCH_ITEMS:
                return {
                    ...state,
                    searchItemsloaded: false
                }
        case RECIEVE_SEARCH_ITEMS_SUCCESS:
            return {
                ...state,
                searchItems: action.data,
                searchItemsloaded: true
            }
        case RECIEVE_SEARCH_ITEMS_FAILURE:
            return {
                ...state,
                searchItemsloaded: false
            }
        case SET_TIMER:
            return {
                ...state,
                timer: action.time
            }
        case SET_QUERY_CHANGED:
            return {
                ...state,
                queryChanged: action.bol
            }
        case SET_SEARCH_ITEMS_LOADED:
            return {
                ...state,
                searchItemsloaded: action.bol
            }
        default: return state;
    }
}

export default reducer;