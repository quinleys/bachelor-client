import axios from 'axios';
import { returnErrors,loginErrors } from './errorActions';
import React from 'react';
import { Translation } from 'react-i18next';
import i18n from '../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import { USER_LOADED, USER_LOADING, LOGIN_FAIL, LOGOUT_SUCCESS , LOGIN_SUCCES, LOGIN_TOKEN, NOT_LOGGEDIN, REGISTER_SUCCES, REGISTER_FAIL, SOCIAL_LOGIN } from "./types";
import { toast } from "react-toastify";
// check token & load user
export const loadUser = () => (dispatch) => {
    // User Loading
    console.log('loaduser')
    console.log('id', localStorage.getItem('id'))
    dispatch({type: USER_LOADING});
    axios.get('http://127.0.0.1:8000/api/user/' + localStorage.getItem('id'), { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: NOT_LOGGEDIN
            })
        })
}
// check token & load user
export const loginSocial = (id, token) => (dispatch) => {
    // User Loading

    console.log('loginsocial' , id, token)
    localStorage.setItem('token', token);
    localStorage.setItem('id', id)
    dispatch({type: USER_LOADING});
    axios.get('http://127.0.0.1:8000/api/user/' + id , { headers: { Authorization: "Bearer " + token } })
        .then(res => dispatch({
            type: SOCIAL_LOGIN,
            payload: res.data
        }))
        .catch(err => {
            console.log('Login social error', err )
            dispatch(returnErrors(err.response, err.response));
            dispatch({
                type: NOT_LOGGEDIN
            })
        })
}
// user login
export const login = ({email, password}) => (dispatch) => {
    
    // header
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({email, password});

    
    axios.post('http://127.0.0.1:8000/api/user/login', body, config)
    .then(res => {
        dispatch({
        type: LOGIN_SUCCES,
        payload: res.data
    })
    toast.success(<Trans i18nKey="loggedin"></Trans>);
    })
    .catch(err => {
        console.log('log in failed')
        dispatch(returnErrors(err, err.response, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })
    
}

export const register = ({email, password, name, password_confirmation}) => dispatch => {
    // header
    dispatch({type: USER_LOADING});
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({email, password, name, password_confirmation});
    axios.post('http://127.0.0.1:8000/api/user/register',body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCES,
            payload: res.data
        })
        toast.success(<Trans i18nKey="loggedin"></Trans>);
    })
    .catch(err => {
        dispatch(returnErrors(err.response, err.response, 'REGISTER_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}
//logout user 

export const logout = () => {
    toast.success(<Trans i18nKey="loggedout"></Trans>);
    return {
        type: LOGOUT_SUCCESS
    }
}

// Setup config headers and token
export const tokenConfig = () => (/* getState */) => {
    
    // get token from localstorage
    /* const token = getState().auth.token; */
    const token = localStorage.getItem('token')
    // Headers
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }
    //if token, add to headers
    if(token){
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
} 