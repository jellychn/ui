import {
    CLOSE_MODAL,
    OPEN_HEADER_MODAL,
    OPEN_SEARCH_MODAL
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