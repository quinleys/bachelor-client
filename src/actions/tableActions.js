import axios from 'axios';
import { returnErrors } from './errorActions';

import { GET_TABLES, FAILED_TABLES, TABLES_LOADING } from "./types";

export const getTables = () => (dispatch) => {
    dispatch(setTablesLoading())

    axios.get('/api/table/all')
    .then(res => {
        dispatch({
            type:GET_TABLES,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_TABLES
        })
    })
}

export const setTablesLoading = () => {
    return {
        type: TABLES_LOADING
    }
}