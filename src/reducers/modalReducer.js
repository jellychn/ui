import {
    CLOSE_MODAL,
    OPEN_HEADER_MODAL,
    OPEN_SEARCH_MODAL
} from '../actions/actionTypes';

const initialState = {
    modal: false,
    headerModal: false,
    searchModal: false
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false,
                headerModal: false,
                searchModal: false
            }
        case OPEN_HEADER_MODAL:
            return {
                ...state,
                modal: true,
                headerModal: true,
                searchModal: false
            }
        case OPEN_SEARCH_MODAL:
            return {
                ...state,
                modal: action.modal,
                searchModal: action.modal,
                headerModal: false
            }
        default: return state;
    }
}

export default reducer;