import { ADD_COMMENT , GET_COMMENTS, COMMENTS_LOADING } from './types'
import axios from 'axios';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { Trans } from 'react-i18next'
import React from 'react';

export const addComment = item => (dispatch) => {
    dispatch(setCommentsLoading())
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token') }
    }
    
    axios.post("https://quinten.staging.7.web.codedor.online/api" + "/comment/add", item, config)
    .then(res => {
        toast.success(<Trans i18nKey="commentsuccess"></Trans>);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data[0]
        })
        dispatch(getComments(res.data[0].restaurant_id))
    }).catch(err => dispatch(returnErrors(err.response, err.response)))
}

export const getComments = (id) => (dispatch) => {
    dispatch(setCommentsLoading())
    axios.get("https://quinten.staging.7.web.codedor.online/api" + "/comment/" + id) 
    .then(res => 
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response, err.response)))
    
}

export const setCommentsLoading = () => {
    return {
        type: COMMENTS_LOADING
    }
}