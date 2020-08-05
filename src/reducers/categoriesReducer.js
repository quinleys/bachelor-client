import { GET_CATEGORIES, FAILED_CATEGORIES , CATEGORIES_LOADING } from '../actions/types'


const initialState = {
    categories: [],
    categoriesloading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case CATEGORIES_LOADING:
            return {
                ...state,
                loading: true,
            }
        case FAILED_CATEGORIES:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}