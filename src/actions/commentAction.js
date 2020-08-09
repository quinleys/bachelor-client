import { ADD_COMMENT , GET_COMMENTS, COMMENTS_LOADING } from './types'
import axios from 'axios';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { Trans, useTranslation } from 'react-i18next'
import i18n from '../i18n';
import React from 'react';
export const addComment = item => (dispatch) => {
    console.log(item)
    dispatch(setCommentsLoading())
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token') }
    }

    axios.post('/api/comment/add', item, config)
    .then(res => {
        toast.success(<Trans i18nKey="commentsuccess"></Trans>);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data[0]
        })
    }).catch(err => dispatch(returnErrors(err.response, err.response)))
}

export const getComments = (id) => (dispatch) => {
    dispatch(setCommentsLoading())
    console.log(id)
    axios.get('/api/comment/' + id)
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