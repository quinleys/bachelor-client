import { GET_PRICES, FAILED_PRICES, PRICES_LOADING } from '../actions/types'


const initialState = {
    prices: [],
    loading: false,
    user: [],
    id: localStorage.getItem('id'),
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PRICES:
            return {
                ...state,
                prices: action.payload,
                loading: false,
            };
        case FAILED_PRICES:
            return {
                ...state,
                loading: false
            }
        case PRICES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}