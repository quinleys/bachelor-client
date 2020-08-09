import axios from 'axios';
import { returnErrors, } from './errorActions';
import React from 'react';
/* import { withRouter } from 'react-router-dom'; */
import { withRouter } from 'react-router'
// the hoc
import { Trans } from 'react-i18next'
import { USER_LOADED, USER_LOADING, LOGIN_FAIL, LOGOUT_SUCCESS , LOGIN_SUCCES, LOGIN_TOKEN, NOT_LOGGEDIN, REGISTER_SUCCES, REGISTER_FAIL, SOCIAL_LOGIN } from "./types";
import { toast } from "react-toastify";
// check token & load user
export const loadUser = () => (dispatch) => {

    dispatch({type: USER_LOADING});
    if(localStorage.getItem('id') !== null ){

  
    axios.get("https://quinten.staging.7.web.codedor.online/api"+ '/user/' + localStorage.getItem('id'), { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err, err));
            dispatch({
                type: NOT_LOGGEDIN
            })
        })
    }else {
        dispatch({
            type: NOT_LOGGEDIN
        })
    }
}
export const socialLogin = () => (dispatch) => {
   /*  browserHistory.push('/registrationStep2') */
   /*  dispatch(window.location.href('/api/user/login/google')) */
   /*  browserHistory.push('/pathToRedirect') */
     /* dispatch(push('/api/user/login/google'))  */
    /* axios.get('https://quinten.staging.7.web.codedor.onlinee') */
    /*  .then(res => {
          console.log('res', res); 
        /* this.props.history.push(res); 
    })  */
}
// check token & load user
export const loginSocial = (id, token) => (dispatch) => {
   
    localStorage.setItem('token', token);
    localStorage.setItem('id', id)
    dispatch({type: USER_LOADING});
    axios.get("https://quinten.staging.7.web.codedor.online/api"+ '/user/' + id , { headers: { Authorization: "Bearer " + token } })
        .then(res => dispatch({
            type: SOCIAL_LOGIN,
            payload: res.data
        }))
        .catch(err => {
         
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

    
    axios.post("https://quinten.staging.7.web.codedor.online/api"+ '/user/login', body, config)
    .then(res => {
      
        dispatch({
        type: LOGIN_SUCCES,
        payload: res.data
    })
    toast.success(<Trans i18nKey="loggedin"></Trans>);
    })
    .catch(err => {
 
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
    axios.post("https://quinten.staging.7.web.codedor.online/api"+ '/user/register',body, config)
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