import {
    CLOSE_MODAL,
    OPEN_HEADER_MODAL,
    OPEN_SEARCH_MODAL,
    OPEN_AUTHENTICATE_MODAL,
    TOGGLE_NOFTIFICATION,
    OPEN_UPDATE_PASSWORD_MODAL
} from '../actions/actionTypes';
import {store} from '../index';

export const closeModal = () => {
    return {type: CLOSE_MODAL}
};

export const openHeaderModal = () => {
    return {type: OPEN_HEADER_MODAL}
};

export const openSearchModal = () => {
    return {
        type: OPEN_SEARCH_MODAL,
        modal: !store.getState().modal.searchModal
    }
};

export const openAuthenticateModal = () => {
    return {
        type: OPEN_AUTHENTICATE_MODAL
    }
};

export const toggleNotification = (bol, text) => {
    return {
        type: TOGGLE_NOFTIFICATION,
        bol: bol,
        text: text
    }
};

export const openUpdatePasswordModal = () => {
    return {type: OPEN_UPDATE_PASSWORD_MODAL}
};