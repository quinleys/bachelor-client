import { GET_RESERVATIONS,DELETE_TABLERESERVATIONS, DELETE_RESERVATION,RESERVATION_CLEAR_DELETE_SUCCES, GET_FUTURE_RESERVATIONS, GET_PAST_RESERVATIONS, GET_TABLERESERVATIONS, GET_WEEKLYRESERVATIONS,ADD_RESERVATION, RESERVATIONS_LOADING,GET_RESERVATION,  FAILED_RESERVATIONS, GET_RANDOM } from '../actions/types'

const initialState = {
    reservations: [],
    reservation: [],
    past: [],
    future: [],
    tablereservations: [],
    weeklyReservations: [],
    random: [],
    newReservation: [],
    loadingReservation: false,
    deleteSuccess: false,
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_RESERVATIONS:
            return {
                ...state,
                reservations: action.payload,
                loadingReservation: false,
                deleteSuccess: false,
            };
        case RESERVATION_CLEAR_DELETE_SUCCES:
            return {
                ...state,
                deleteSuccess: false
            }
        case GET_RESERVATION:
            return {
                ...state,
                reservation: action.payload,
                loadingReservation:false,
            }
        case GET_PAST_RESERVATIONS:
            
            return {
                ...state,
                past: action.payload,
                loadingReservation:false,
            }
        case GET_FUTURE_RESERVATIONS:
            return {
                ...state,
                future: action.payload,
                loadingReservation:false,
            }
        case ADD_RESERVATION:
            return {
                ...state,
                reservations: [action.payload, ...state.reservations],
                newReservation: action.payload,
                loadingReservation: false,
            };
        case GET_RANDOM:
            return{
                ...state,
                random : action.payload,
                loadingReservation: false,
            }
        case GET_TABLERESERVATIONS:
            return{
                ...state,
                tablereservations: action.payload,
                loadingReservation: false
            }
        case DELETE_TABLERESERVATIONS:
            return {
                ...state,
                tablereservations: [],
                loadingReservation: false
            }
        case GET_WEEKLYRESERVATIONS:
            return {
                ...state,
                weeklyReservations: action.payload,
                loadingReservation: false,
            }
        case DELETE_RESERVATION:
            return {
                ...state,
                deleteSuccess: true,
                loadingReservation: false
            }
        case RESERVATIONS_LOADING:
            return {
                ...state,
                loadingReservation:true,
            };
        case FAILED_RESERVATIONS:
            return{
                ...state,
                loadingReservation:false
            }
        default:
            return state;
    }
}