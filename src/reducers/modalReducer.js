import {
    CLOSE_MODAL,
    OPEN_HEADER_MODAL,
    OPEN_SEARCH_MODAL,
    OPEN_AUTHENTICATE_MODAL,
    TOGGLE_NOFTIFICATION,
    OPEN_UPDATE_PASSWORD_MODAL
} from '../actions/actionTypes';

const initialState = {
    modal: false,
    headerModal: false,
    searchModal: false,
    authenticateModal: false,
    notificationModal: false,
    notificationText: '',
    passwordModal: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false,
                headerModal: false,
                searchModal: false,
                passwordModal: false,
                authenticateModal: false
            }
        case OPEN_HEADER_MODAL:
            return {
                ...state,
                modal: true,
                headerModal: true,
                searchModal: false,
                passwordModal: false,
                authenticateModal: false
            }
        case OPEN_SEARCH_MODAL:
            return {
                ...state,
                modal: action.modal,
                searchModal: action.modal,
                headerModal: false,
                passwordModal: false,
                authenticateModal: false
            }
        case OPEN_AUTHENTICATE_MODAL:
            return {
                ...state,
                modal: true,
                searchModal: false,
                headerModal: false,
                passwordModal: false,
                authenticateModal: true
            }
        case TOGGLE_NOFTIFICATION:
            return {
                ...state,
                notificationModal: action.bol,
                notificationText: action.text
            }
        case OPEN_UPDATE_PASSWORD_MODAL:
            return {
                ...state,
                modal: true,
                passwordModal: true,
                searchModal: false,
                headerModal: false,
                authenticateModal: false
            }
        default: return state;
    }
}

export default reducer;