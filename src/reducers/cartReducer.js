import {
    CHECK_CART_HAS_ITEMS,
    REQUEST_USER_CART,
    REQUEST_USER_CART_SUCCESS,
    REQUEST_USER_CART_FAILURE,
    CALCULATE_TOTAL
} from '../actions/actionTypes';

const initialState = {
    cart: [],
    subtotal: 0,
    total: 0,
    delivery: 10,
    cartRequested: false,
    hasItems: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case REQUEST_USER_CART:
            return {
                ...state,
                cartRequested: false
            }
        case REQUEST_USER_CART_SUCCESS:
            return {
                ...state,
                cart: action.cart,
                cartRequested: true
            }
        case REQUEST_USER_CART_FAILURE:
            return {
                ...state,
                cartRequested: true,
                cart: []
            }
        case CALCULATE_TOTAL:
            return {
                ...state,
                subtotal: action.subtotal,
                total: action.total
            }
        case CHECK_CART_HAS_ITEMS:
            return {
                ...state,
                hasItems: action.hasItems
            }
        default: return state;
    }
};

export default reducer;