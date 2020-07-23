import {combineReducers} from 'redux';
import itemsReducer from './itemsReducer.';
import searchReducer from './searchReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    'item': itemsReducer,
    'search': searchReducer,
    'modal': modalReducer
});