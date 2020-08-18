import {store} from '../index';
import axios from 'axios';
import {
    CHECK_CART_HAS_ITEMS,
    REQUEST_USER_CART,
    REQUEST_USER_CART_SUCCESS,
    REQUEST_USER_CART_FAILURE,
    CALCULATE_TOTAL
} from '../actions/actionTypes';
import {authenticateTriggered} from './userActions';

const requestUserCart = () => {
    return {type: REQUEST_USER_CART}
};

const requestUserCartSuccess = (cart) => {
    return {
        type: REQUEST_USER_CART_SUCCESS,
        cart: cart
    }
};

const requestUserCartFailure = () => {
    return {type: REQUEST_USER_CART_FAILURE}
};

export const updateCartItemQuantity = (item, quantity) => {
    let cart = store.getState().cart.cart;
    for (let i=0;i<cart.length;i++) {
        if (cart[i]._id === item._id && cart[i].size === item.size && cart[i].color === item.color) {
            cart[i].quantity = quantity;
        }
    }

    return dispatch => {
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/updateCart', {cart:cart}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(() => {});
            dispatch(calculateCartTotal());
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(calculateCartTotal());
        }
    }
};

export const checkCartHasItems = () => {
    let cart = store.getState().cart.cart;
    console.log(cart)
    let hasItems = false;
    if (cart.length > 0) {
        hasItems = true;
    }
    return {
        type: CHECK_CART_HAS_ITEMS,
        hasItems: hasItems
    }
};

export const calculateCartTotal = () => {
    let subtotal = 0;
    const cart = store.getState().cart.cart;
    for (let i=0;i<cart.length;i++) {
        subtotal += parseInt(cart[i].quantity) * parseInt(cart[i].price);
    }
    return {
        type: CALCULATE_TOTAL,
        subtotal: subtotal,
        total: subtotal + store.getState().cart.delivery
    }
};

export const getCart = () => {
    if (localStorage.getItem('cart') === null) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    return dispatch => {
        dispatch(requestUserCart());
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/user', {'token':token}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                if (res.status === 200) {
                    dispatch(requestUserCartSuccess(res.data.cart));
                    dispatch(calculateCartTotal());
                    dispatch(checkCartHasItems());
                } else {
                    dispatch(requestUserCartSuccess(JSON.parse(localStorage.getItem('cart'))));
                    dispatch(calculateCartTotal());
                    dispatch(checkCartHasItems());
                }
            }).catch(err => {
                dispatch(requestUserCartFailure());
                dispatch(calculateCartTotal());
                dispatch(checkCartHasItems());
            });
        } else {
            dispatch(requestUserCartSuccess(JSON.parse(localStorage.getItem('cart'))));
            dispatch(calculateCartTotal());
            dispatch(checkCartHasItems());
        }
    }
};

export const addItemToCart = (newItem) => {
    getCart();
    let cart = store.getState().cart.cart;
    let inCart = false;

    for (let i=0; i<cart.length; i++) {
        if (cart[i]._id === newItem._id && cart[i].size === newItem.size && cart[i].color === newItem.color) {
            cart[i].quantity = cart[i].quantity += newItem.quantity;
            inCart = true;
        }
    }

    if (inCart === false) {
        cart.push(newItem);
    }
    return dispatch => {
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/updateCart', {cart:cart}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(() => {});
            dispatch(checkCartHasItems());
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(checkCartHasItems());
        }
    }
};


export const removeItemFromCart = (item) => {
    let cart = store.getState().cart.cart;
    let index = 0;
    for (let i=0;i<cart.length;i++) {
        if (cart[i]._id === item._id && cart[i].size === item.size && cart[i].color === item.color) {
            break;
        }
        index += 1;
    }
    cart.splice(index, 1);
    return dispatch => {
        dispatch(requestUserCartSuccess(cart));
        if (store.getState().user.authenticated) {
            const token = localStorage.getItem('token');
            axios.post('http://localhost:4001/api/users/updateCart', {cart:cart}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then(() => {});
            dispatch(calculateCartTotal());
            dispatch(checkCartHasItems());
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch(calculateCartTotal());
            dispatch(checkCartHasItems());
        }
    }
};

export const addItemToCartOnLogin = () => {
    let localStorageCart = JSON.parse(window.localStorage.getItem('cart'));
    if (store.getState().user.authenticated) {
        const token = localStorage.getItem('token');
        return dispatch => {
            axios.post('http://localhost:4001/api/users/user', {'token':token}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                let cart = res.data.cart;
                for (let i=0; i<localStorageCart.length; i++) {
                    let inCart = false;
                    for (let n=0;n<cart.length;n++) {
                        if (localStorageCart[i]._id === cart[n]._id && localStorageCart[i].size === cart[n].size && localStorageCart[i].color === cart[n].color && localStorageCart[i].name === cart[n].name) {
                            if (cart[n].quantity < localStorageCart[i].quantity) {
                                console.log('ss')
                                cart[n].quantity = localStorageCart[i].quantity;
                            }
                            inCart = true;
                        }
                    }
                    if (inCart === false) {
                        cart.push(localStorageCart[i]);
                    }
                }

                console.log(cart)

                axios.post('http://localhost:4001/api/users/updateCart', {cart:cart}, {headers: {'Content-Type': 'application/json', 'X-Authorization': token}}).then((res) => {
                    if (res.status === 200) {
                        dispatch(authenticateTriggered(true));
                    }
                });
                window.localStorage.setItem('cart', JSON.stringify([]));
            });
        }
    }
};