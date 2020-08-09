import { ADD_FAVORITE , DELETE_FAVORITE, GET_USER_ALLFAVORITES, FAVORITES_LOADING, GET_USER_FAVORITES, FAILED_FAVORITES } from './types'
import axios from 'axios';
import { returnErrors } from './errorActions';

export const addFavorite = item => (dispatch) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token') }
    }

    axios.post("https://quinten.staging.7.web.codedor.online/api" + '/favorite/add', item, config)
    .then(res => 
        dispatch({
            type: ADD_FAVORITE,
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response, err.response)))
}
export const getFavorites = id => (dispatch) => {
    dispatch(setFavoritesLoading());
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/favorite/user/' + localStorage.getItem('id'), { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        dispatch({
            type: GET_USER_FAVORITES,
            payload: res.data
        })})
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_FAVORITES
        })
    })
}
export const getAllFavorites = () => (dispatch) => {
    dispatch(setFavoritesLoading());
    axios.get("https://quinten.staging.7.web.codedor.online/api" + '/favorite/user/' + localStorage.getItem('id') + '/all', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
    .then(res => {
        dispatch({
            type: GET_USER_ALLFAVORITES,
            payload: res.data
        })})
    .catch(err => {
        dispatch(returnErrors(err.response, err.response))
        dispatch({
            type: FAILED_FAVORITES
        })
    })
}
export const deleteFavorite = id => (dispatch) => {

    const config = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer " + localStorage.getItem('token') }
    }
    axios.delete("https://quinten.staging.7.web.codedor.online/api" + `/favorite/${id}` , config)
    .then(res => 
        dispatch({
            type: DELETE_FAVORITE,
            payload: id
        })).catch(err => dispatch(returnErrors(err.response, err.response)))

}
export const setFavoritesLoading = () => {
    return {
        type: FAVORITES_LOADING
    }
}