import { GET_ROOMS, ADD_ROOM ,GET_ROOM, FAILED_ROOMS , ROOMS_LOADING } from '../actions/types'


const initialState = {
    rooms: [],
    room: [],
    loading: false,
    madeNew: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ROOMS:
            console.log('extra',action.payload)
            return {
                ...state,
                rooms: action.payload,
                loading: false,
                madeNew: false,
            };
            case GET_ROOM:
            console.log('extra',action.payload)
            return {
                ...state,
                room: action.payload,
                loading: false,
                madeNew: false,
            };
            case ADD_ROOM:
                return {
                    ...state,
                    madeNew: true,
                    rooms: [action.payload, ...state.rooms],    
                }  
        case ROOMS_LOADING:
            return {
                ...state,
                loading: true,
                madeNew: false,
            }
        case FAILED_ROOMS:
            return{
                ...state,
                loading:false,
                madeNew: false,
            }
        default:
            return state;
    }
}