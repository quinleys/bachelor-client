import { GET_FACILITIES, FAILED_FACILITIES , FACILITIES_LOADING } from '../actions/types'


const initialState = {
    facilities: [],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_FACILITIES:
            return {
                ...state,
                facilities: action.payload,
                loading: false,
            };
        case FACILITIES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case FAILED_FACILITIES:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}