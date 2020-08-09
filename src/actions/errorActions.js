import { GET_ERRORS, CLEAR_ERRORS, LOGIN_ERROR, REQUESTS } from './types';

// return errs
export const returnErrors = (message, errors, status, id) => {
    return {
        type: GET_ERRORS,
        payload: {message, errors, status, id}
    }
}
export const loginErrors = (message, errors, status, id) => {
    return {
        type: LOGIN_ERROR,
        payload: {message, errors, status, id}
    }
}
export const tooManyRequest = (status) => {
    return {
        type: REQUESTS,
        payload: status
    }
}
// clear err
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

