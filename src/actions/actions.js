import {CHECK_CART_HAS_ITEMS, CHECK_FAVORITES_HAS_ITEMS, ITEM_ADDED} from './actionTypes';

export const checkCartHasItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let cartHasItems = false;
    if (cart.length > 0) {
        cartHasItems = true;
    } else {
        cartHasItems = false;
    }

    return {
        type: CHECK_CART_HAS_ITEMS,
        cart: cartHasItems
    }
};

export const checkFavoritesHasItems = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    let favoritesHasItems = false;
    if (favorites.length > 0) {
        favoritesHasItems = true;
    } else {
        favoritesHasItems = false;
    }

    return {
        type: CHECK_FAVORITES_HAS_ITEMS,
        favorites: favoritesHasItems
    }
};

export const itemAdded = (item, added) => {
    return {
        type: ITEM_ADDED,
        item: item,
        added: added
    }
};