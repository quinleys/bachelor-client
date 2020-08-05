import { GET_RESERVATION, GET_FUTURE_RESERVATIONS, RESERVATION_CLEAR_DELETE_SUCCES,  DELETE_RESERVATION, GET_PAST_RESERVATIONS, GET_RESERVATIONS,GET_TABLERESERVATIONS, GET_WEEKLYRESERVATIONS, ADD_RESERVATION, RESERVATIONS_LOADING, FAILED_RESERVATIONS} from './types'
import axios from 'axios';
import React from 'react';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { Trans, useTranslation } from 'react-i18next'
export const deleteReservation = (id) => (dispatch) => {
    dispatch(setReservationsLoading());

    axios.delete('http://127.0.0.1:8000/api/reservation/'  + id +  '/delete',{ headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        console.log('delete reservation success' , res )
        dispatch(getFutureReservations());
        dispatch({
            type: DELETE_RESERVATION,
            payload: res.data
        })
        toast.success(<Trans i18nKey="deletesuccess"></Trans>);
    }).catch(err => {
        console.log(err)
        dispatch(returnErrors(err.response, err.response,  'RESERVATION_DELETE_FAIL'))
        dispatch({
            type: FAILED_RESERVATIONS
        })
    })
}

export const getReservations = () => (dispatch) => {

    dispatch(setReservationsLoading());

    axios.get('http://127.0.0.1:8000/api/reservation/user/' + localStorage.getItem('id'), { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        console.log(res.data)
        dispatch({
            type: GET_RESERVATIONS,
            payload: res.data
        })})
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_RESERVATIONS
        })
    })
};
export const getPastReservations = () => (dispatch) => {
    dispatch(setReservationsLoading());

    axios.get('http://127.0.0.1:8000/api/reservation/user/' + localStorage.getItem('id') + '/past', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        dispatch({
            type: GET_PAST_RESERVATIONS,
            payload: res.data
        })})
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_RESERVATIONS
        })
    })

};
export const getFutureReservations = () => (dispatch) => {
    dispatch(setReservationsLoading());

    axios.get('http://127.0.0.1:8000/api/reservation/user/' + localStorage.getItem('id') + '/future', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        dispatch({
            type: GET_FUTURE_RESERVATIONS,
            payload: res.data
        })})
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_RESERVATIONS
        })
    })

};
export const addReservation = item  => (dispatch) => {
    console.log('add reservation', item)

    dispatch(setReservationsLoading());
    
    console.log(item);
    axios.post('http://127.0.0.1:8000/api/reservation/add', item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => 
        dispatch({ 
            type: ADD_RESERVATION, 
            payload: res.data
        })).catch(err => {
            dispatch(returnErrors(err.response, err.response, 'FAILED_RESERVATION'))
            dispatch({
                type: FAILED_RESERVATIONS
            })
        })
};


export const getReservation = id => (dispatch) => {
    console.log(id)
    dispatch(setReservationsLoading());

    axios.get('http://127.0.0.1:8000/api/reservation/' + id)
    .then(res => 
        dispatch({
            type: GET_RESERVATION,
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response, err.response)))
}

export const setReservationsLoading = () => {
    return {
        type: RESERVATIONS_LOADING
    }
}
export const clearDeleteSuccess = () => {
    return {
        type: RESERVATION_CLEAR_DELETE_SUCCES
    }
}
export const getReservationTable = (id,url) => (dispatch) => {
    console.log(url)
    dispatch(setReservationsLoading());
    axios.get('http://127.0.0.1:8000/api/restaurant/' + id + '/reservation' + url)
    .then(res => dispatch ({
        type: GET_TABLERESERVATIONS,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response, err.response)))
}
export const getWeeklyReservations = id => (dispatch) => {
    axios.get('http://127.0.0.1:8000/api/reservation/1/weekly', id)
    .then(res => dispatch ({
        type: GET_WEEKLYRESERVATIONS,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response, err.response)))
}