import { GET_TABLES, FAILED_TABLES , TABLES_LOADING } from '../actions/types'


const initialState = {
    tables: [],
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TABLES:
            return {
                ...state,
                tables: action.payload,
                loading: false,
            };
        case TABLES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case FAILED_TABLES:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}