import axios from 'axios';
import { returnErrors, tooManyRequest } from './errorActions';

import { GET_CATEGORIES, FAILED_CATEGORIES, CATEGORIES_LOADING } from "./types";

export const getCategories = () => (dispatch) => {
    dispatch(setCategoriesLoading())

    axios.get('http://127.0.0.1:8000/api/category/all')
    .then(res => {
        dispatch({
            type:GET_CATEGORIES,
            payload: res.data
        })
    }).catch(err => {
        if(typeof err.response == "object"){
        if(err.response.status == 429 ){
            dispatch(tooManyRequest(err.response.status))
            dispatch({
                type: FAILED_CATEGORIES
            })
        }else{
            dispatch({
                type: FAILED_CATEGORIES
            })
        }
    }else{
        dispatch(returnErrors(err, err,err))
        dispatch({
            type: FAILED_CATEGORIES
        })
    }
    
    
    })
}

export const setCategoriesLoading = () => {
    return {
        type: CATEGORIES_LOADING
    }
}