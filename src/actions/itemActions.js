import {  ADD_ITEM,  ITEMS_LOADING, FAILED_ITEMS, GET_ITEMS, GET_RANDOM, GET_ITEM, LOAD_NEXT} from './types'
import axios from 'axios';
import { returnErrors, tooManyRequest } from './errorActions';



export const getItems = url => (dispatch) => {
    
    dispatch(setItemsLoading());
    axios.get( "https://quinten.staging.7.web.codedor.online/api"+ '/restaurant/all' + url )
    .then(res => {
        console.log(res)
            dispatch({ 
                type: GET_ITEMS, 
                payload: res.data
            }) })
    .catch(err => {
  
        if(typeof err.response == "object"){
        if(err.response.status && err.response.status == 429){
            dispatch(tooManyRequest(err.response.status))
            dispatch({
                type: FAILED_ITEMS
            })
        }else{
                dispatch({
                    type: FAILED_ITEMS
                })
            }
        }else{
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_ITEMS
        })
        
    }
    })
};
export const loadNext = page => (dispatch) => {
    dispatch(setItemsLoading());
    axios.get(page)
    .then(res => {
            dispatch({ 
                type: LOAD_NEXT, 
                payload: res.data
            }) })
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_ITEMS
        })
        
    })
}
export const getRandom = () => (dispatch) => {
    dispatch(setItemsLoading());

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/restaurant/random')
    .then(
        res => {
            dispatch({
                type: GET_RANDOM,
                payload: res.data
            })
        }
    ).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_ITEMS
        })
        
    })
}
export const addItem = item  => (dispatch) => {
    axios.post("https://quinten.staging.7.web.codedor.online/api" + '/restaurant', item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => 
        dispatch({ 
            type: ADD_ITEM, 
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response, err.response)))
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const getItem = id => (dispatch) => {
    
    dispatch(setItemsLoading());
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/restaurant/' + id , { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        dispatch({
            type: GET_ITEM,
            payload: res.data
        })}).catch(err => {
            if(typeof err.response == "object"){
             if(err && err.response && err.response.status && err.response.status == 429){
                dispatch(tooManyRequest(err.response.status))
            }else{ 
            dispatch(returnErrors(err, err, err))}
           
        } }) 
            /* dispatch({
                type: FAILED_ITEMS
            }) */
        
}