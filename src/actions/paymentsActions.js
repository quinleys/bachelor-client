import axios from 'axios';
import { returnErrors, tooManyRequest } from './errorActions';

import { GET_PAYMENTS, FAILED_PAYMENTS, PAYMENTS_LOADING } from "./types";

export const getPayments = () => (dispatch) => {
    
    dispatch(setPaymentLoading())

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/payment/all')
    .then(res => {
        dispatch({
            type:GET_PAYMENTS,
            payload: res.data
        })
    }).catch(err => {
        if(typeof err.response == "object"){
        if(err.response.status == 429 ){
            dispatch(tooManyRequest(err.response.status))
            dispatch({
                type: FAILED_PAYMENTS
            })
        }else{
            dispatch({
                type: FAILED_PAYMENTS
            })
        }
    }else{

      
        dispatch(returnErrors(err, err, err))
        dispatch({
            type: FAILED_PAYMENTS
        })
    }
    })
}

export const setPaymentLoading = () => {
    return {
        type: PAYMENTS_LOADING
    }
}