import { GET_EXTRAS, FAILED_EXTRAS , EXTRAS_LOADING } from '../actions/types'


const initialState = {
    extras: [],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_EXTRAS:
            console.log('extra',action.payload)
            return {
                ...state,
                extras: action.payload,
                loading: false,
            };
        case EXTRAS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case FAILED_EXTRAS:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}