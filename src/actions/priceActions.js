import axios from 'axios';
import { returnErrors, tooManyRequest } from './errorActions';

import { GET_PRICES, FAILED_PRICES, PRICES_LOADING } from "./types";

export const getPrices = () => (dispatch) => {

    dispatch(setPricesLooading())

    axios.get('/api/price/all')
    .then(res => {
        dispatch({
            type:GET_PRICES,
            payload: res.data
        })
    }).catch(err => {
        if(typeof err.response == "object"){
        if(err.response.status == 429 ){
            dispatch(tooManyRequest(err.response.status))
            dispatch({
                type: FAILED_PRICES
            })
        }else{
            dispatch({
                type: FAILED_PRICES
            })
        }
    }else{
        dispatch(returnErrors(err, err, err))
        dispatch({
            type: FAILED_PRICES
        })
    }
    })
}

export const setPricesLooading = () => {
    return {
        type: PRICES_LOADING
    }
}