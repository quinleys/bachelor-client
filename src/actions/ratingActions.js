import {  ADD_RATING, GET_RATINGS } from './types'
import axios from 'axios';
import { returnErrors , tooManyRequest} from './errorActions';
import React from 'react';
import { toast } from "react-toastify";
import { Trans, useTranslation } from 'react-i18next'
export const addRating = item => (dispatch) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token') }
    }
    axios.post("https://quinten.staging.7.web.codedor.online/api" + '/rating/add' , item , config)
    .then(res => {
        dispatch({
            type: ADD_RATING,
            payload: res.data
        }) 
        toast.success(<Trans i18nKey="loggedin"></Trans>) })
        .catch(err => dispatch(returnErrors(err.response, err.response)))
} 

export const getRatings = id => (dispatch) => {
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/rating/' + id)
    .then(res => 
        dispatch({
            type: GET_RATINGS,
            payload: res.data
        })).catch(err => {
            if(typeof err.response == "object"){
            if(err.response.status == 429 ){
                dispatch(tooManyRequest(err.response.status))
            }  
            }else{
            dispatch(returnErrors(err,err,err))
            }
        }
            )
}