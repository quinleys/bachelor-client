import axios from 'axios';
import { returnErrors } from './errorActions';

import { GET_EXTRAS, FAILED_EXTRAS, EXTRAS_LOADING } from "./types";

export const getExtras = () => (dispatch) => {
    dispatch(setExtrasLoading())

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/extra/all')
    .then(res => {
        dispatch({
            type:GET_EXTRAS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_EXTRAS
        })
    })
}

export const setExtrasLoading = () => {
    return {
        type: EXTRAS_LOADING
    }
}