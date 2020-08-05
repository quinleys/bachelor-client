import axios from 'axios';
import { returnErrors } from './errorActions';

import { GET_PERSONS, FAILED_PERSONS, PERSONS_LOADING } from "./types";

export const getPersons = () => (dispatch) => {
    dispatch(setCategoriesLoading())

    axios.get('http://127.0.0.1:8000/api/persons/all')
    .then(res => {
        dispatch({
            type:GET_PERSONS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_PERSONS
        })
    })
}

export const setCategoriesLoading = () => {
    return {
        type: PERSONS_LOADING
    }
}