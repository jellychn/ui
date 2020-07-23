import {
    CHECK_CART_HAS_ITEMS,
    CHECK_FAVORITES_HAS_ITEMS,
    ITEM_ADDED
} from '../actions/actionTypes';

const initialState = {
    cart: false,
    favorites: false,
    headerModalItem: {'colors':[],'color':'', 'images':[], name:'', category:''},
    headerModalAdded: ''
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ITEM_ADDED:
            return {
                ...state,
                headerModalItem: action.item,
                headerModalAdded: action.added
            }
        case CHECK_CART_HAS_ITEMS:
            return {
                ...state,
                cart: action.cart
            }
        case CHECK_FAVORITES_HAS_ITEMS:
            return {
                ...state,
                favorites: action.favorites
            }
        default: return state;
    }
};

export default reducer;