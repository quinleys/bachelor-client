import axios from 'axios';
import { returnErrors } from './errorActions';
import { toast } from "react-toastify";
import { GET_ROOMS, ADD_ROOM, GET_ROOM, DELETE_GET_ROOMS, FAILED_ROOMS, ROOMS_LOADING } from "./types";

export const getRooms = (id) => (dispatch) => {
    dispatch(setRoomsLoading())

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/room/' + id)
    .then(res => {
        dispatch({
            type:GET_ROOMS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_ROOMS
        })
    })
}
export const getRoom = (id) => (dispatch) => {
    dispatch(setRoomsLoading())

    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/room/id/' + id)
    .then(res => {
        dispatch({
            type:GET_ROOM,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_ROOMS
        })
    })
}
export const addRoom = item => (dispatch) => {
    axios.post("https://quinten.staging.7.web.codedor.online/api" + '/room/store' , item, { headers: { Authorization: "Bearer " + localStorage.getItem('token') }})
    .then(res => {
        dispatch({
        type: ADD_ROOM,
        payload: res.data
    })
    toast.success("De kamer is succesvol actief gemaakt.");
    }).catch(err => {
        dispatch(returnErrors(err.response, err.response))
        
        toast.error("Er is iets fout gegaan");
    })
   
  
}
export const deleteGetRooms = () => (dispatch) => {
    dispatch(setRoomsLoading())
    return {
        type: DELETE_GET_ROOMS
    }
}
export const setRoomsLoading = () => {
    return {
        type: ROOMS_LOADING
    }
}