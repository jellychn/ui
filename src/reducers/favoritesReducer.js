import {
    REQUEST_USER_FAVORITES,
    REQUEST_USER_FAVORITES_SUCCESS,
    REQUEST_USER_FAVORITES_FAILURE,
    CHECK_FAVORITES_HAS_ITEMS
} from '../actions/actionTypes';

const initialState = {
    favorites: [],
    favoritesRequested: false,
    hasItems: false,
    favorited: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case REQUEST_USER_FAVORITES:
            return {
                ...state,
                favoritesRequested: false
            }
        case REQUEST_USER_FAVORITES_SUCCESS:
            return {
                ...state,
                favoritesRequested: true,
                favorites: action.favorites
            }
        case REQUEST_USER_FAVORITES_FAILURE:
            return {
                ...state,
                favoritesRequested: true,
                favorites: []
            }
        case CHECK_FAVORITES_HAS_ITEMS:
            return {
                ...state,
                hasItems: action.hasItems
            }
        default: return state;
    }
}

export default reducer;