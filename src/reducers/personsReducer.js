import { GET_PERSONS, FAILED_PERSONS , PERSONS_LOADING } from '../actions/types'


const initialState = {
    persons: [],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_PERSONS:
            return {
                ...state,
                persons: action.payload,
                loading: false,
            };
        case PERSONS_LOADING:
            return {
                ...state,
                loading: true,
            }
        case FAILED_PERSONS:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}