import {  ADD_FAVORITE, GET_USER_ALLFAVORITES, GET_USER_FAVORITES, FAILED_FAVORITES, DELETE_FAVORITE } from '../actions/types'


const initialState = {
    favorites: [],
    favorite: [],
    userfavs:[],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case ADD_FAVORITE:
            return {
                ...state,
               /*  favorites: [...state.favorites, action.payload], */
                loading: false,
            };
        case GET_USER_FAVORITES:
            return {
                ...state,
                userfavs: action.payload,
                loading : false,
            }
        case GET_USER_ALLFAVORITES:
            return {
                ...state,
                favorites: action.payload,
                loading: false,
            }
        case DELETE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(favorite => favorite.id !== action.payload)
            }
            case FAILED_FAVORITES:
                return{
                    ...state,
                    loading:false
                }
        default:
            return state;
    }
}