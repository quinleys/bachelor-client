import { GET_PAYMENTS, FAILED_PAYMENTS , PAYMENTS_LOADING } from '../actions/types'


const initialState = {
    payments: [],
    paymentsloading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PAYMENTS:
            return {
                ...state,
                payments: action.payload,
                paymentsloading: false,
            };
        case PAYMENTS_LOADING:
            return {
                ...state,
                paymentsloading: true,
            }
        case FAILED_PAYMENTS:
            return{
                ...state,
                paymentsloading:false
            }
        default:
            return state;
    }
}