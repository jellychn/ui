import {
    LOGIN_REGISTER
} from './actionTypes';

export const loginRegister = (bol) => {
    return {
        type: LOGIN_REGISTER,
        bol: bol
    }
};