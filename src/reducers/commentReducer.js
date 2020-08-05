import { GET_COMMENTS, ADD_COMMENT, COMMENTS_LOADING } from '../actions/types'


const initialState = {
    comments: [],
    commentsloading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_COMMENTS:
            console.log(action.payload)
            return {
                ...state,
                comments: action.payload,
                commentsloading: false,
            };
        case ADD_COMMENT:
            console.log(action.payload)
            return {
                ...state,
                comments: [...state.comments, action.payload],
                commentsloading: false,
            };
        case COMMENTS_LOADING:
            return {
                ...state,
                commentsloading: true
            }
        default:
            return state;
    }
}