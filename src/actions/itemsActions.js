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
} from './actionTypes';
import axios from 'axios';

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

export const itemAdded = (item, added, color) => {
    item.color = color;
    return {
        type: ITEM_ADDED,
        item: item,
        added: added
    }
};

const requestItem = () => {
    return {type: REQUEST_ITEM}
};

const recieveItemSuccess = (data, favorited, color) => {
    return {
        type: RECIEVE_ITEM_SUCCESS,
        item: data,
        favorited: favorited,
        color: color
    }
};

const recieveItemFailure = (error) => {
    return {
        type: RECIEVE_ITEM_FAILURE,
        error: error
    }
};

const checkFavorited = (color, item) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]))
    }
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    let inFavorites = false;

    for (let i=0;i<favorites.length;i++) {
        if (item._id === favorites[i]._id && favorites[i].color === color) {
            inFavorites = true;
            break;
        }
    }

    return inFavorites;
};

export const favorited = (color, item) => {
    const favorited = checkFavorited(color, item)
    return {
        type: FAVORITED,
        favorited: favorited,
        color: color
    }
};

const requestRelatedItems = () => {
    return {type: REQUEST_RELATED_ITEMS}
};

const recieveRelatedItemsSuccess = (data) => {
    return {
        type: RECIEVE_RELATED_ITEMS_SUCCESS,
        relatedItems: data
    }
};

const recieveRelatedItemsFailure = (error) => {
    return {
        type: RECIEVE_RELATED_ITEMS_FALIURE,
        error: error
    }
};

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array.slice(0, 6);
};

export const getItem = (itemId) => {
    return dispatch => {
        dispatch(requestItem());
        axios.get('http://localhost:4001/api/items/' + itemId).then(res => {
            const keys = Object.keys(res.data.colors);
            const favorited = checkFavorited(keys[0], res.data);
            dispatch(recieveItemSuccess(res.data, favorited, keys[0]));

            dispatch(requestRelatedItems());
            axios.get('http://localhost:4001/api/items/', {params: {gender:res.data.gender, category: res.data.category}}).then(related => {
                const shuffled = shuffle(related.data);
                dispatch(recieveRelatedItemsSuccess(shuffled));
            }).catch(error => {
                dispatch(recieveRelatedItemsFailure(error));
            });
        }).catch = (error) => {
            dispatch(recieveItemFailure(error));
        }
    }
}