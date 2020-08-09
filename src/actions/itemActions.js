import {  ADD_ITEM,  ITEMS_LOADING, FAILED_ITEMS,FAILED_ITEM, GET_ITEMS, GET_RANDOM, GET_ITEM, LOAD_NEXT, FAILED_TEIM} from './types'
import axios from 'axios';
import { returnErrors, tooManyRequest } from './errorActions';

export const getItems = url => (dispatch) => {

    dispatch(setItemsLoading());
    console.log(url)
    axios.get('/api/restaurant/all' + url )
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
    console.log(page)
    dispatch(setItemsLoading());
    axios.get(page)
    .then(res => {
        console.log(res)
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

    axios.get('/api/restaurant/random')
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
    // console.log(item);
    axios.post('https://127.0.0.1:8000/api/restaurant', item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
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
    console.log('get item')
    axios.get('/api/restaurant/' + id , { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        console.log('get Item',res.data)
        dispatch({
            type: GET_ITEM,
            payload: res.data
        })}).catch(err => {
            console.log(err, 'wa is het probleem')
            console.log('error' , err.response)
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