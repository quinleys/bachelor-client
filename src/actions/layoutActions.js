import axios from 'axios';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { GET_LAYOUTS, ADD_LAYOUT, GET_LAYOUT, FAILED_LAYOUTS, LAYOUTS_LOADING , FORGET_LAYOUT} from "./types";
import { BrowerRouter } from 'react-router'
export const getLayouts = (id) => (dispatch) => {
    dispatch(setLayoutsLoading())

    axios.get('/api/layout/' + id)
    .then(res => {
        console.log(res.data)
        dispatch({
            type:GET_LAYOUTS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_LAYOUTS
        })
    })
}
export const getLayout = id => (dispatch) => {
    console.log('id',id);
    console.log('inside deze get')
    dispatch(setLayoutsLoading())

    axios.get('/api/layout/id/' + id, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        console.log('res',res.data)
        dispatch({
            type:GET_LAYOUT,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_LAYOUTS
        })
    })
}
export const forgetLayout = () => (dispatch) => {
    dispatch({
        type: FORGET_LAYOUT
    })
}
export const addLayout = item => (dispatch) => {
    axios.post('/api/layout/store' , item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        dispatch({
        type: ADD_LAYOUT,
        payload: res.data
    })
    toast.success('Succesvol de layout gemaakt.');
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        toast.error("Er is iets misgegaan.");
    }
        )
}
export const setLayoutsLoading = () => {
    return {
        type: LAYOUTS_LOADING
    }
}