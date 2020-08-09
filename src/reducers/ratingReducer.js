import { GET_RATINGS, ADD_RATING } from '../actions/types'


const initialState = {
    ratings: [],
    loading: false,
    user: [],
    id: localStorage.getItem('id'),
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_RATINGS:
            return {
                ...state,
                ratings: action.payload,
                loading: false,
            };
        case ADD_RATING:
            return {
                ...state,
                ratings: [...state.ratings, action.payload],
                loading: false,
            };
        default:
            return state;
    }
}