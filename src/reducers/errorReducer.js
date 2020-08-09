import { GET_ERRORS, CLEAR_ERRORS, REQUESTS } from '../actions/types';

const initialState = {
    message: {},
    status: null,
    id: null,
    errors: [],
    tooMany: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ERRORS:
            if(action.payload.status == 'REGISTER_FAIL'){
                return{
                    message: action.payload.message.data.message,
                    error: action.payload.errors,
                    status: action.payload.status,
                    id: action.payload.id
                };
            }else{
            return{
                message: action.payload.message,
                error: action.payload.errors,
                status: action.payload.status,
                id: action.payload.id
            };
        }
        case CLEAR_ERRORS:
            return {
                message: {},
                error: [],
                status: null,
                id: null,
                tooMany : false

            };
        case REQUESTS:
            if(action.payload == 429){
                return {
                    tooMany: true,
                }
            }
        default:
            return state;

    }
}