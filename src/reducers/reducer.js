import {combineReducers} from 'redux';
import itemsReducer from './itemsReducer.';
import searchReducer from './searchReducer';

export default combineReducers({
    'item': itemsReducer,
    'search': searchReducer
});