import { GET_LAYOUTS, ADD_LAYOUT, GET_LAYOUT, FAILED_LAYOUTS , LAYOUTS_LOADING, FORGET_LAYOUT } from '../actions/types'


const initialState = {
    layouts: [],
    layout: [],
    madeNew: false,
    loading: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_LAYOUTS:
            return {
                ...state,
                layouts: action.payload,
                loading: false,
            };
        case GET_LAYOUT:
                return {
                    ...state,
                    madeNew: false,
                    layout: action.payload,
                    loading: false,
                };
        case ADD_LAYOUT:
            return {
                ...state,
                madeNew: true,
                layout: action.payload,
                layouts: [action.payload, ...state.layouts],    
            }   
        case LAYOUTS_LOADING:
            return {
                ...state,
                madeNew: false,
                loading: true,
            }
        case FAILED_LAYOUTS:
            return{
                ...state,
                madeNew: false,
                loading:false
            }
        case FORGET_LAYOUT:
            return {
                ...state,
                madeNew: false,
                layout: [],
            }
        default:
            return state;
    }
}