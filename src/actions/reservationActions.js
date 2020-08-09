import { GET_RESERVATION, DELETE_TABLERESERVATIONS, GET_FUTURE_RESERVATIONS, RESERVATION_CLEAR_DELETE_SUCCES,  DELETE_RESERVATION, GET_PAST_RESERVATIONS, GET_RESERVATIONS,GET_TABLERESERVATIONS, GET_WEEKLYRESERVATIONS, ADD_RESERVATION, RESERVATIONS_LOADING, FAILED_RESERVATIONS} from './types'
import axios from 'axios';
import React from 'react';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { Trans } from 'react-i18next'
export const deleteReservation = (id) => (dispatch) => {
    dispatch(setReservationsLoading());

    axios.delete("https://quinten.staging.7.web.codedor.online/api" + '/reservation/'  + id +  '/delete',{ headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        dispatch(getFutureReservations());
        dispatch(getReservations());
        dispatch({
            type: DELETE_RESERVATION,
            payload: res.data
        })
        toast.success(<Trans i18nKey="deletesuccess"></Trans>);
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response,  'RESERVATION_DELETE_FAIL'))
        dispatch({
            type: FAILED_RESERVATIONS
        })
    })
}

export const getReservations = () => (dispatch) => {

    dispatch(setReservationsLoading());

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/reservation/user/' + localStorage.getItem('id'), { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
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

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/reservation/user/' + localStorage.getItem('id') + '/past', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
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

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/reservation/user/' + localStorage.getItem('id') + '/future', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
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

    dispatch(setReservationsLoading());
   
    axios.post("https://quinten.staging.7.web.codedor.online/api" + '/reservation/add', item, { headers: { Authorization: "Bearer " + localStorage.getItem('token')} })
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
    dispatch(setReservationsLoading());

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/reservation/' + id)
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
export const deleteReservationTable = () => (dispatch) => {
    dispatch(setReservationsLoading());
    return {
        type: DELETE_TABLERESERVATIONS
    }
}
export const getReservationTable = (id,url) => (dispatch) => {
    dispatch(setReservationsLoading());
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/restaurant/' + id + '/reservation' + url)
    .then(res => dispatch ({
        type: GET_TABLERESERVATIONS,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response, err.response)))
}
export const getWeeklyReservations = id => (dispatch) => {
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/reservation/1/weekly', id)
    .then(res => dispatch ({
        type: GET_WEEKLYRESERVATIONS,
        payload: res.data
    })).catch(err => dispatch(returnErrors(err.response, err.response)))
}