import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: false,
    favorites: false,
    headerModalItem: {'colors':[],'color':'', 'images':[]},
    headerModalAdded: '',
    modal: false
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ITEM_ADDED:
            return {
                ...state,
                headerModalItem: action.item,
                headerModalAdded: action.added
            }
        case actionTypes.CLOSE_MODEL:
            return {
                ...state,
                modal: false
            }
        case actionTypes.OPEN_MODEL:
            return {
                ...state,
                modal: true
            }
        case actionTypes.CHECK_CART_HAS_ITEMS:
            return {
                ...state,
                cart: action.cart
            }
        case actionTypes.CHECK_FAVORITES_HAS_ITEMS:
            return {
                ...state,
                favorites: action.favorites
            }
        default: return state
    }
}

export default reducer;