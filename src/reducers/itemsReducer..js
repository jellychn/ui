import {
    CHECK_CART_HAS_ITEMS,
    CHECK_FAVORITES_HAS_ITEMS,
    ITEM_ADDED,
    REQUEST_ITEM,
    RECIEVE_ITEM_SUCCESS,
    RECIEVE_ITEM_FAILURE,
    FAVORITED,
    REQUEST_RELATED_ITEMS,
    RECIEVE_RELATED_ITEMS_SUCCESS,
    RECIEVE_RELATED_ITEMS_FALIURE
} from '../actions/actionTypes';

const initialState = {
    cart: false,
    favorites: false,
    headerModalItem: {'colors':[],'color':'', 'images':[], name:'', category:''},
    headerModalAdded: '',
    item: {},
    relatedItems: [],
    favorited: false,
    color: '',
    itemLoaded: false,
    relatedItemsLoaded: false
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
        case REQUEST_ITEM:
            return {
                ...state,
                itemLoaded: false
            }
        case RECIEVE_ITEM_SUCCESS:
            return {
                ...state,
                item: action.item,
                favorited: action.favorited,
                color: action.color,
                itemLoaded: true
            }
        case RECIEVE_ITEM_FAILURE:
            return {
                ...state,
                itemLoaded: false
            }
        case FAVORITED:
            return {
                ...state,
                favorited: action.favorited,
                color: action.color
            }
        case REQUEST_RELATED_ITEMS:
            return {
                ...state,
                relatedItemsLoaded: false
            }
        case RECIEVE_RELATED_ITEMS_SUCCESS:
            return {
                ...state,
                relatedItemsLoaded: true,
                relatedItems: action.relatedItems
            }
        case RECIEVE_RELATED_ITEMS_FALIURE:
            return {
                ...state,
                relatedItemsLoaded: false
            }
        default: return state;
    }
};

export default reducer;